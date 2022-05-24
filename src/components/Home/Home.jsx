import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Table } from "react-bootstrap";


// Fetch Data from items database
// Cols: Item name, Serial Number, Quantity
const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 11; i++) {
      setData(d => [...d, {
        id: i,
        name: "item " + i,
        serial: 123 + i,
        qty: i,
      }])
    }
  }, [])
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
            </tr>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.serial}</td>
                  <td>{item.qty}</td>
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
