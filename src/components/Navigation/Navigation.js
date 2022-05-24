import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const nav = () => {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
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
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/summary">Summary</Nav.Link>
            <Nav.Link href="/add">Add Item</Nav.Link>
            <Nav.Link href="/dispense">Withdraw Item</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default nav;
