import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.string
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="header">
        <Link to="/">Home</Link>
        {this.renderLinks()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(Header)
