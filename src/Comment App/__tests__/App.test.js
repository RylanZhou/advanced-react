import React from 'react'
import { shallow } from 'enzyme'
import CommentApp from '../index'
import CommentBox from '../Components/CommentBox'
import CommentList from '../Components/CommentList'

let wrapped = null

beforeEach(() => {
  // The component we want to extract. The name "wrapped" is used in most of the documents but its just the component itself.
  wrapped = shallow(<CommentApp />)
})

// it(a statement, function to prove this statement)
it('shows a comment box', () => {
  // Test whether there is only one CommentBox inside App
  expect(wrapped.find(CommentBox).length).toEqual(1)
})

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1)
})
