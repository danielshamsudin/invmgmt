import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Table } from "react-bootstrap";

const Home = () => {

  let items = [];

  for (let i = 1; i < 11; i++) {
    items[i] = {
      id: i,
      name: "Item " + i,
      serial: 123456789,
      qty: i,
      remarks: "Old"
    }
  }
  return (
    <>
      <Navigation />
      <br />
      <br />
      <br />
      <Container>
        <h1>Items</h1>
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Item Name</th>
              <th>Serial No.</th>
              <th>Quantity</th>
              <th>Remarks</th>
            </tr>
            {items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.serial}</td>
                  <td>{item.qty}</td>
                  <td>{item.remarks}</td>
                </tr>
              )
            })}
          </thead>
        </Table>
      </Container>
    </>
  );
};

export default Home;
