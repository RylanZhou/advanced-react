## 5. Client Auth

Two more dependencies are needed: `redux-form`, `redux-thunk`.

`redux-thunk` is a middleware that allows us to action creators like:

```javascript
export const signup = ({ email, password }) => (dispatch) => {
  // ... Total control of dispatch. We can dispatch actions multiple times
}
```

Instead of:

```javascript
export const signup = ({ email, password }) => {
  // ... axios
  return { payload: data }
}
```

### 5.1 `redux-form` & `redux-thunk` Set Up

#### 5.1.1 Use `redux-form`

We are going to build a sign up form using redux-form.

First, to use redux-form, we have to combine the reducer provided by redux-form with others.

`reducers/index.js`

```javascript
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'

export default combineReducers({
  auth: authReducer,
  form: formReducer // ! Must name as form
})
```

Then, use the `<Field>` component to build input fields.

`Components/Signup.jsx`

```jsx
import { reduxForm, Field } from 'redux-form'

class Signup extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  onSubmit = (formProps) => {
    console.log(formProps)
  }

  render() {
    const { handleSubmit } = this.props // Provided by redux-form

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Username</label>
          <Field
            name="username"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <button>Sign Up!</button>
      </form>
    )
  }
}

export default reduxForm({ form: 'signup' })(Signup)
```

#### 5.1.2 Use `redux-thunk`

Just like using other middlewares, simply put it into the middleware parameter when calling `createStore`.

`index.jsx`

```javascript
import reduxThunk from 'redux-thunk'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
```

#### 5.1.3 Make Requests

Using the server created previously, we will send request to the backend. Modify the `signup` action.

`actions/signup.js`

```javascript
export const signup = (formProps) => (dispatch) => {
  axios.post('http://localhost:5000/auth/signup', formProps)
}
```

#### 5.1.4 Wire the Action to the Component

Notice that we've already wire up the `reduxForm` in `Signup.jsx`. Now we have to wire the action together using `connect`.

Using the `compose` function from `redux` allows us to wire up multiple HOC in a better syntax instead of chain everything together.

`Components/Signup.jsx`

```jsx
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signup } from '../actions'

class Signup extends Component {
  // ...

  onSubmit = (formProps) => {
    this.props.signup(formProps)
  }

  // ...
}

export default compose(
  connect(null, { signup }),
  reduxForm({ form: 'signup' })
)(Signup)
```

### 5.2 CORS

When we try to create a new user, we encounter the CORS problem.

Any `Sub Domain`, any `Domain`, any `Port` differences will trigger CORS error.

To fix CORS issues, we have to install `cors` package. Then:

```javascript
app.use(cors()) // Allows request from anywhere
```

Try to sign up again. This time we would see the token.

### 5.3 Display Errors

First, Wrap the api calling with `try-catch` and dispatch error if any errors are caught.

```javascript
export const signup = (formProps) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/signup',
      formProps
    )
    dispatch({ type: AUTH_USER, payload: response.data.token })
  } catch (error) {
    dispatch({ type: AUTH_TYPE, payload: error.response.data.error })
  }
}
```

Then, use `mapStateToProps` to get access to `errorMsg` in global state. And display it.

`Components/Signup.jsx`

```javascript
const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg
})
```

### 5.4 Redirect

After a user has successfully logged in or signed up, we want to redirect the user to the feature page. To do this, we can add a callback function when we are calling `signup` action.

`Components/Signup.jsx`

```javascript
onSubmit = (formProps) => {
  this.props.signup(formProps, () => {
    this.props.history.push('/feature')
  })
}
```

And add a callback parameter to the action, and call it at the end of the request.

`actions/index.js`

```javascript
export const signup = (formProps, cb) => async (dispatch) => {
  // ...
  cb()
}
```

### 5.5 Auth HOC

We have made an HOC in the previous sections. We can use that right away,

`Components/requireAuth.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    static propTypes = {
      auth: PropTypes.string,
      history: PropTypes.any
    }

    componentDidMount() {
      this.shouldNavigateAway()
    }
    componentDidUpdate() {
      this.shouldNavigateAway()
    }
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }
    render() {
      return <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth.authenticated
  })

  return connect(mapStateToProps)(ComposedComponent)
}
```

Then wrap `Feature` Component up with this HOC.

`Components/Feature.jsx`

```jsx
import React, { Component } from 'react'
import requireAuth from './requireAuth'

class Feature extends Component {
  render() {
    return <div>Feature</div>
  }
}

export default requireAuth(Feature)
```

### 5.6 Persisting Login State

Even if we have stored the authentication string in redux, when we refresh the page, we still get kicked out. So we have to store this token in `localStorage`.

`actions/index.js`

```javascript
dispatch({ type: AUTH_USER, payload: response.data.token })
localStorage.setItem('token', response.data.token)
cb()
```

We also have to check `localStorage` to see whether there is a token and put it into redux. We can do this when creating the store.

`index.jsx`

```javascript
const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token') } },
  applyMiddleware(reduxThunk)
)
```

### 5.7 Log Out

There are two step when a user is logging out.

1. Clear localStorage.
2. Set `authenticated` in the store to either `false` or `''`.

So create a new action creator:

`actions/index.js`

```javascript
export const signout = () => {
  localStorage.removeItem('token')
  return {
    type: AUTH_USER,
    payload: ''
  }
}
```

Put it into the `Signout` Component.

`Components/Signout.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { signout } from '../actions'

class Signout extends Component {
  static propTypes = {
    signout: PropTypes.func
  }

  componentDidMount() {
    this.props.signout()
  }

  render() {
    return <div>Sorry to see you go.</div>
  }
}

export default connect(null, { signout })(Signout)
```

### 5.8 Sign In

It's quite similar to the process of sign up. So we now only focus on the code of the action creator.

`actions/index.js`

```javascript
export const signin = (formProps, cb) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/signin',
      formProps
    )
    dispatch({ type: AUTH_USER, payload: response.data.token })
    localStorage.setItem('token', response.data.token)
    cb()
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.error })
  }
}
```

If everything works fine, we will be redirected to the `Feature` page as soon as we log in successfully.
