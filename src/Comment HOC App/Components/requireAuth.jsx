import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function requireAuth(ChildComponent) {
  class ComposedComponent extends Component {
    static propTypes = {
      auth: PropTypes.bool,
      history: PropTypes.object
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
      // Take any props straight down
      return <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(ComposedComponent)
}
