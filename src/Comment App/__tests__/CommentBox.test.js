import React from 'react'
import { mount } from 'enzyme'

import Root from '../Root'
import CommentBox from '../Components/CommentBox'

let wrapped = null

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  )
})

afterEach(() => {
  wrapped.unmount()
})

it('has a text area and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1)
  expect(wrapped.find('button').length).toEqual(1)
})

describe('the text area', () => {
  beforeEach(() => {
    const event = {
      target: { value: 'New Comment' }
    }
    wrapped.find('textarea').simulate('change', event)
    wrapped.update()
  })

  it('has a textarea that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('New Comment')
  })

  it('clears the textarea when form is submitted', () => {
    wrapped.find('form').simulate('submit')
    wrapped.update()

    expect(wrapped.find('textarea').prop('value')).toEqual('')
  })
})
