import React from 'react'
import { shallow } from 'enzyme'
import CommentApp from '../index'
import CommentBox from '../Components/CommentBox'
import CommentList from '../Components/CommentList'

// it(a statement, function to prove this statement)
it('shows a comment box', () => {
  // The component we want to extract. The name "wrapped" is used in most of the documents but its just the component itself.
  const wrapped = shallow(<CommentApp />)

  // Test whether there is only one CommentBox inside App
  expect(wrapped.find(CommentBox).length).toEqual(1)
})

it('shows a comment list', () => {
  const wrapped = shallow(<CommentApp />)

  expect(wrapped.find(CommentList).length).toEqual(1)
})
