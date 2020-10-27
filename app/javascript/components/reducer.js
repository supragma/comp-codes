import React from 'react'

const reducer = (state = [], action) => {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}

export default reducer
