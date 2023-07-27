

import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth'; 
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

function Header() {
  const isAuthenticated = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Row className="w-100">
          <Col className="pr-0">
            <Navbar.Brand as={Link} to="/">Warehouse Management</Navbar.Brand>
          </Col>
          <Col className="px-0">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              {isAuthenticated && 
              <Nav className="justify-content-center">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/staffmanagement">Staff Management</Nav.Link>
              </Nav>}
              <Nav>
                {!isAuthenticated &&
                <>
                  <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>}
                {isAuthenticated &&
                  <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                }
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
