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
