import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signin } from '../actions'

class Signin extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    signin: PropTypes.func,
    errorMsg: PropTypes.string,
    history: PropTypes.any
  }

  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature')
    })
  }

  render() {
    const { handleSubmit } = this.props // Provided by redux-form

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
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
        <button>Sign In</button>
        <div>{this.props.errorMsg}</div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg
})

export default compose(
  connect(mapStateToProps, { signin }),
  reduxForm({ form: 'signin' })
)(Signin)
