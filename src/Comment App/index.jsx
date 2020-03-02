import React from 'react'

import Root from './Root'
import CommentBox from './Components/CommentBox'
import CommentList from './Components/CommentList'

export default function CommentApp() {
  return (
    <Root>
      <CommentBox />
      <CommentList />
    </Root>
  )
}
