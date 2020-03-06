import tv4 from 'tv4'
import stateSchema from './stateSchema'

export default ({ dispatch, getState }) => (next) => (action) => {
  // Send the action to the next middleware first.
  next(action)

  // After the action has gone through all reducers, validate state
  if (!tv4.validate(getState(), stateSchema)) {
    console.warn('Invalid state schema detected.')
  }
}
