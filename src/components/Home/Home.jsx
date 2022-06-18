import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Table, Button } from "react-bootstrap";
import { db } from '../../firebase';

// Fetch Data from items database
// Cols: Item name, Serial Number, Quantity
const Home = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const items = await db.collection('items').get();
    const docId = items.docs.map(doc => doc.id);
    console.log(docId);
    console.log(items);
    const itemsData = items.docs.map(doc => doc.data());
    console.log(itemsData);
    for (let i = 0; i < itemsData.length; i++) {
      setData(prevData => [...prevData, {
        id: i + 1,
        itemName: itemsData[i].itemName,
        serialNumber: itemsData[i].serialNumber,
        quantity: itemsData[i].quantity,
        date: itemsData[i].date,
        by: itemsData[i].by,
        remarks: itemsData[i].remarks,
        docId: docId[i]
      }]);
    }
  }

  useEffect(() => {
    fetchData();
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
              <th>Added By</th>
              <th>Bulk Remarks</th>
              <th>Date</th>
            </tr>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.quantity}</td>
                  <td>{item.by}</td>
                  <td>{item.remarks}</td>
                  <td>{item.date}</td>
                  <td>{item.docId}</td>
                  <td><Button variant="danger" onClick={() => {
                    db.collection('items').doc(item.docId).delete();
                    window.location.reload();
                  }
                  }>Delete</Button></td>
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
