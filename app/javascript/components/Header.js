import React from 'react'
import logo from '../images/logo.png'
import { Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" fixed="top">
        <Navbar.Brand href="/">
          <img width="50" height="50" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            <Nav.Link href="/projectinfo">+ New Project</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div> 
  )
}

export default Header
