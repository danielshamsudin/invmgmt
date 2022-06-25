import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const nav = () => {
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
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/summary">Summary</Nav.Link>
              <Nav.Link href="/add">Add Item</Nav.Link>
              <Nav.Link href="/dispense">Withdraw Item</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default nav;
