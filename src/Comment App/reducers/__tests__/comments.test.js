import commentsReducer from '../comments'
import { SAVE_COMMENT } from '../../actions/types'

it('handles actions of the type SAVE_COMMENT', () => {
  const action = {
    type: SAVE_COMMENT,
    payload: 'new comment'
  }

  const newState = commentsReducer([], action)

  // The return value should be an array with one comment
  expect(newState).toEqual(['new comment'])
})

it('handles action with unknown type', () => {
  const newState = commentsReducer([], { type: 'ANOTHER_RANDOM_TYPE' })
  expect(newState).toEqual([])
})
