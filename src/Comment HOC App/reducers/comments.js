import { SAVE_COMMENT, FETCH_COMMENTS } from '../actions/types'

// Default comments state is an empty array
export default (state = [], action) => {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload]
    case FETCH_COMMENTS: {
      const comments = action.payload.data.map((each) => each.name).slice(0, 10)
      return [...state, ...comments]
    }
    default:
      return state
  }
}
