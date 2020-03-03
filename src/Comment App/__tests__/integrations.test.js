import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import Root from '../Root'
import CommentApp from '../index'

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    // Fake a response
    status: 200,
    response: [{ name: 'Fetch #1' }, { name: 'Fetch #2' }]
  })
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch a list of comments and display them', (done) => {
  // Attempt to render the entire app.
  const wrapped = mount(
    <Root>
      <CommentApp />
    </Root>
  )
  // Find the 'fetch comments' button and click it.
  wrapped.find('.fetch-comments').simulate('click')

  moxios.wait(() => {
    wrapped.update()
    // Expect to find a list of comments.
    expect(wrapped.find('li').length).toEqual(2)
    done()
    wrapped.unmount()
  }, 100)
})
