import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import reducers from './reducers'

export default function Root({ initialState = {}, children }) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxPromise)
  )
  return (
    // For global state just initialize it to an empty object
    <Provider store={store}>{children}</Provider>
  )
}

Root.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object
}
