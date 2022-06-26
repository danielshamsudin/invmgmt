import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Modal, Spinner, Button, Form } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import { db } from '../../firebase';

const Dispense = () => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [prompt, setPrompt] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemQty, setItemQty] = useState(0);
	const [formVal, setFormVal] = useState(0);
	const [itemID, setItemID] = useState("");
	const [sNum, setSNum] = useState("");
	const [remarks, setRemarks] = useState("");
	const [by, setBy] = useState("");

	const handleClosePrompt = () => setPrompt(false);
	const handleShowPrompt = () => setPrompt(true);

	const handleClose = () => {
		setShowModal(false);
		window.location.reload();
	}

	const handleShow = () => setShowModal(true);

	const fetchData = async () => {
		const items = await db.collection('items').get();
		const docId = items.docs.map(doc => doc.id);
		const itemsData = items.docs.map(doc => doc.data());
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

	const handleWithdraw = async (formValue, itemQty, itemName) => {
		if (formValue > itemQty) {
			window.alert("You cannot withdraw more than the available quantity, " + itemName + " has " + itemQty + " available");
		}
		if (itemQty - formValue === 0) {
			await db.collection('items').doc(itemID).delete();
			await db.collection('transaction').add({
				itemName: itemName,
				serialNumber: sNum,
				quantity: `${formValue}`,
				date: new Date().toDateString(),
				by: by,
				type: "withdraw",
				remarks: remarks,
			})
			handleShow();
		}
		if (itemQty - formValue > 0) {
			await db.collection('items').doc(itemID).update({
				quantity: `${itemQty - formValue}`
			});
			await db.collection('transaction').add({
				itemName: itemName,
				serialNumber: sNum,
				quantity: `${formValue}`,
				date: new Date().toDateString(),
				by: by,
				type: "withdraw",
				remarks: remarks,
			})
			handleShow();
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
			<Modal show={prompt} onHide={handleClosePrompt}>
				<Modal.Header closeButton>
					<Modal.Title>Withdraw {itemName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label>Enter Item Quantity: </Form.Label>
					<Form.Control type="number" placeholder="Enter Item Quantity" onChange={(e) => {
						setFormVal(e.target.value.replace(/\D/g, ""));
					}} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClosePrompt}>
						Close
					</Button>
					<Button variant="primary" onClick={() => handleWithdraw(formVal, itemQty, itemName)}>
						Withdraw
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Success</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Item has been withdrawn.
				</Modal.Body>
				<Modal.Footer>
					<button variant="secondary" onClick={handleClose}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Withdraw Items</h1>
				<br />
				{loading ? <Spinner animation="border" size="lg" variant="primary"></Spinner> : <Container fluid>
					<Row>
						{data.map(item => {
							return (
								<Col key={item.id}>
									<Card key={item.id} style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Title>{item.itemName}</Card.Title>
											<Card.Text>
												Serial Number: {item.serialNumber}
												<br />
												Quantity: {item.quantity}
												<br />
												Date: {item.date}
												<br />
												By: {item.by}
												<br />
												Remarks: {item.remarks}
												<br />
												<Button variant="primary" onClick={() => {
													setItemName(item.itemName);
													setItemQty(item.quantity);
													setItemID(item.docId);
													setSNum(item.serialNumber);
													setRemarks(item.remarks);
													setBy(item.by);
													handleShowPrompt();
												}}>Withdraw</Button>
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							)
						})}
					</Row>
				</Container>
				}
			</Container>
		</>
	)
}
export default Dispense;