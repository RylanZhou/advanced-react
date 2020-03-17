import axios from 'axios'
import { AUTH_USER, AUTH_ERROR } from './types'

// By using redux-thunk, we can return either the data or a function from the action creators. If we return a function, the function will be automatically called and passed the "dispatch" parameter. In this way, we can return as many dispatches as possible. Normally, we could only return one dispatch action per action creator.
export const signup = (formProps, cb) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/signup',
      formProps
    )
    dispatch({ type: AUTH_USER, payload: response.data.token })
    localStorage.setItem('token', response.data.token)
    cb()
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.error })
  }
}

export const signout = () => {
  localStorage.removeItem('token')
  return {
    type: AUTH_USER,
    payload: ''
  }
}

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
