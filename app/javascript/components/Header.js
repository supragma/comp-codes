import React from 'react'
import logo from '../images/logo.png'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Header = () => {
  const loggedIn = useSelector(state => state.isLogged)

  const dispatch = useDispatch()
  const history = useHistory()

  const onDeleteReturn = (resp) => {
    if(resp.data.success == false) {
      alert(resp.data.error)
      return
    }
    dispatch({type: 'LOGOUT'})
    history.push('/signin')
  }

  const signOut = (e) => {
    e.preventDefault()
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.post['X-CSRF-TOKEN'] = token
    axios.delete('/api/v1/sign_out')
    .then(resp => onDeleteReturn(resp))
    .catch(data => console.log('error', data))
  } 

  return (
    <div>
      { loggedIn ?
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" fixed="top">
          <Navbar.Brand href="/">
            <img width="50" height="50" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => history.push('/')}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => history.push('/messages')}>Messages</Nav.Link>
              <Nav.Link onClick={() => history.push('/siteinfo')}>New Site</Nav.Link> 
              <Nav.Link onClick={() => history.push('/projectinfo')}>New Project</Nav.Link> 
              <Button onClick={signOut}>Sign Out</Button> 
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        :
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" fixed="top">
          <Navbar.Brand href="/">
            <img width="50" height="50" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button href="/signup">Sign Up</Button> 
              <Nav.Link href="/signin">Sign In</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }
    </div> 
  )
}

export default Header
