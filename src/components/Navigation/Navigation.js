import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Navi = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={require("../../asset/logo.png")}
              width="150"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {currentUser ? (
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/summary">Summary</Nav.Link>
                <Nav.Link href="/add">Add Item</Nav.Link>
                <Nav.Link href="/dispense">Withdraw Item</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navi;
