import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Root from './Root'
import CommentBox from './Components/CommentBox'
import CommentList from './Components/CommentList'

export default function CommentApp() {
  return (
    <BrowserRouter>
      <Root>
        <Route path="/" exact component={CommentList} />
        <Route path="/post" exact component={CommentBox} />
      </Root>
    </BrowserRouter>
  )
}
