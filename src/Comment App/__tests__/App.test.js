import React from 'react'
import ReactDOM from 'react-dom'

import CommentApp from '../index'

// it(a statement, function to prove this statement)
it('shows a comment box', () => {
  const div = document.createElement('div')

  ReactDOM.render(<CommentApp />, div)

  // Look inside the virtual div and see whether CommentBox exists
  expect(div.innerHTML).toContain('Comment Box')

  // Destroy memories no longer in use
  ReactDOM.unmountComponentAtNode(div)
})
