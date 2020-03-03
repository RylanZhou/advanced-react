import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import * as actions from '../actions'

class CommentBox extends Component {
  static propTypes = {
    saveComment: PropTypes.func,
    fetchComments: PropTypes.func
  }

  state = {
    comment: ''
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveComment(this.state.comment)
    this.setState({ comment: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a Comment</h4>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <div>
            <button>Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>
          Fetch Comments
        </button>
      </div>
    )
  }
}

// No need to convert any global state to props, so leave it to null
// We will take all dispatch functions for props, so pass actions
export default connect(null, actions)(CommentBox)
