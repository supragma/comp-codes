import React from 'react'

const siteIDReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_SITE_ID":
      return action.payload
    default:
      return state
  }
}

export default siteIDReducer
