import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signup } from '../actions'

class Signup extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    signup: PropTypes.func,
    errorMsg: PropTypes.string,
    history: PropTypes.any
  }

  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature')
    })
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
        <div>{this.props.errorMsg}</div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg
})

export default compose(
  connect(mapStateToProps, { signup }),
  reduxForm({ form: 'signup' })
)(Signup)
