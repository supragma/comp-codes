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
import { useSelector } from 'react-redux'

const App = () => {
  const loggedIn = useSelector(state => state.isLogged)

  const PrivateRoute = ({ component, ...options }) => {
    const finalComponent = loggedIn ? component : SignIn
    return <Route {...options} component={finalComponent} />
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <PrivateRoute exact path="/siteinfo" component={SiteInfo}/>
        <PrivateRoute exact path="/projectinfo" component={ProjectInfo}/>
      </Switch>
    </div>
  )
}

export default App
