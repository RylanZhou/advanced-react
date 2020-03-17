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
