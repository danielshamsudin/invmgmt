import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Modal, Spinner } from "react-bootstrap";
import { db, auth } from '../../firebase';

// Fetch Data from items database
// Cols: Item name, Serial Number, Quantity
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  })
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  }
  const handleShow = () => setShowModal(true);

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
    setLoading(false);
  }

  const handleDelete = async (docId, itemName, serialNumber, quantity, by, date, remarks) => {
    await db.collection('items').doc(docId).delete();
    await db.collection('transaction').add({
      itemName: itemName,
      serialNumber: serialNumber,
      quantity: quantity,
      date: new Date().toDateString(),
      by: by,
      type: "delete",
      remarks: remarks,
    })
    handleShow();
  }

  useEffect(() => {
    fetchData();
  }, [])
  if (currentUser) {
    return (
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Item has been deleted
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Navigation />
        <br />
        <br />
        <br />
        <Container>
          <h1>Items</h1>
          {loading ? <Spinner animation="border" size="lg" variant="primary"></Spinner> : <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Item Name</th>
                <th>Serial No.</th>
                <th>Quantity</th>
                <th>Added By</th>
                <th>Bulk Remarks</th>
                <th>Date</th>
                <th></th>
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
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item.docId, item.itemName, item.serialNumber, item.quantity, item.by, item.date, item.remarks)}>{item.quantity === 1 ? "Delete" : "Delete All"}</Button>&nbsp;&nbsp;
                    </td>
                  </tr>
                )
              })}
            </thead>
          </Table>}
        </Container>
      </>
    );
  }
  else {
    return (
      <>
        <Navigation />
        <br /><br /><br />
        <Container>
          <h3>Please log in / register to continue.</h3>
        </Container>
      </>
    )
  }
};

export default Home;
