import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import Dashboard from './Dashboard'
import Signup from './Signup'
import SiteInfo from './SiteInfo'
import ProjectInfo from './ProjectInfo'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/siteinfo" component={SiteInfo}/>
      <Route exact path="/projectinfo" component={ProjectInfo}/>
    </Switch>
  )
}

export default App
