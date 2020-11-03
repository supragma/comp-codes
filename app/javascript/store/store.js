import { createStore, combineReducers } from 'redux'
import { useDispatch } from 'react-redux'

import countReducer from '../reducers/counter'
import loginReducer from '../reducers/login'

const rootReducer = combineReducers({
  count: countReducer,
  isLogged: loginReducer
})

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch(err) {
    console.log(err)
  }
};

const persistedStore = loadState()

const store = createStore(
  rootReducer,
  persistedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
