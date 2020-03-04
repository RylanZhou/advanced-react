import { CHANGE_AUTH } from '../actions/types'

// The state (true/false) indicates whether the user is signed in.
export default (state = false, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload
    default:
      return state
  }
}
