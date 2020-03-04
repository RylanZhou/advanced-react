import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Route, BrowserRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import CommentBox from './Components/CommentBox'
import CommentList from './Components/CommentList'

class CommentApp extends Component {
  static propTypes = {
    auth: PropTypes.bool,
    changeAuth: PropTypes.func
  }

  renderButton() {
    if (this.props.auth) {
      return (
        <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
      )
    }
    return <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
  }

  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post A Comment</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    )
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderHeader()}
        <Route path="/" exact component={CommentList} />
        <Route path="/post" exact component={CommentBox} />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  // Get the user's logged in status
  auth: state.auth
})

export default connect(mapStateToProps, actions)(CommentApp)
