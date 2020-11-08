import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import Dashboard from './Dashboard'
import SignUp from './SignUp'
import SignIn from './SignIn'
import SiteInfo from './SiteInfo'
import ProjectInfo from './ProjectInfo'
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/siteinfo" component={SiteInfo}/>
        <Route exact path="/projectinfo" component={ProjectInfo}/>
      </Switch>
    </div>
  )
}

export default App
