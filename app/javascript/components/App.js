import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Signup from './Signup'
const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/signup" component={Signup}/>
    </Switch>
  )
}

export default App
