export default ({ dispatch }) => (next) => (action) => {
  // Check to see if the action has a promise on its payload property.
  if (!action.payload || !action.payload.then) {
    // If it doesn't, send the action to the next middleware
    return next(action)
  }
  // If it does, wait for it to resolve. Then create a new action with the data and dispatch it.
  action.payload.then((response) => {
    // Get all properties from the origin action and overwrite the payload
    const newAction = { ...action, payload: response }
    dispatch(newAction)
  })
}
