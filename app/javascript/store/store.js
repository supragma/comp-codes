import { createStore } from 'redux'
import reducer from '../reducers/reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const unsub = store.subscribe(() => {
  console.log(store.getState())
})

unsub()

store.dispatch({
  type: 'INCREMENT'
})

export default store
