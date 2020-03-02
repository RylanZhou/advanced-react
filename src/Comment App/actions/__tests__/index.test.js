import { saveComment } from '../index'
import { SAVE_COMMENT } from '../types'

describe('saveComment', () => {
  it('has the correct type', () => {
    // Directly call the action to see the return value
    const action = saveComment()
    expect(action.type).toEqual(SAVE_COMMENT)
  })

  it('has the correct payload', () => {
    const action = saveComment('new comment')
    expect(action.payload).toEqual('new comment')
  })
})
