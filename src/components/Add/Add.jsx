import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation';
import { Button, Container, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase";


const Add = () => {
	const [itemName, setItemName] = useState("");
	const [serial, setSerial] = useState("");
	const [machineName, setMachineName] = useState("");
	const [qty, setQty] = useState(0);
	const [startDate, setStartDate] = useState(new Date());
	const [by, setBy] = useState("");
	const [remarks, setRemarks] = useState("");
	const [showModal, setShowModal] = useState(false);

	const handleQty = event => {
		const res = event.replace(/\D/g, "");
		setQty(res);
	}

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSubmit = async event => {
		event.preventDefault();
		const res = await db.collection("items").add({
			itemName: itemName,
			machineName: machineName,
			serialNumber: serial,
			quantity: qty,
			date: startDate.toDateString(),
			by: by,
			remarks: remarks
		});
		const trx = await db.collection("transaction").add({
			itemName: itemName,
			machineName: machineName,
			serialNumber: serial,
			quantity: qty,
			date: startDate.toDateString(),
			by: by,
			type: "add",
			remarks: remarks
		});

		if (res && trx) handleShow();

	}
	// Item name, serial number, quantity, by, date, remarks
	return (
		<>
			<Navigation />
			<br /><br /><br />
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Success</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Item has been added successfully!</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Container>
				<h1>Add Item</h1>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Item Name</Form.Label>
						<Form.Control type="name" placeholder="Enter Item Name" onChange={(e) => { setItemName(e.target.value) }} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Serial Number</Form.Label>
						<Form.Control type="name" placeholder="Enter Item Serial Number" onChange={(e) => { setSerial(e.target.value) }} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Machine Name</Form.Label>
						<Form.Control type="name" placeholder="Enter Machine Name" onChange={(e) => { setMachineName(e.target.value.toLowerCase()) }} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Quantity</Form.Label>
						<Form.Control type="name" placeholder="Enter Item Quantity" onChange={(e) => { handleQty(e.target.value) }} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Date</Form.Label>
						<DatePicker selected={startDate} dateFormat="dd/M/yyyy" onChange={(date) => { setStartDate(date) }} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Added By</Form.Label>
						<Form.Select onChange={(e) => { setBy(e.target[e.target.value].innerHTML) }}>
							<option>Select</option>
							<option value="1">Admin</option>
							<option value="2">Worker</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Remarks</Form.Label>
						<Form.Control type="name" placeholder="Enter Item Remarks" onChange={(e) => { setRemarks(e.target.value) }} />
					</Form.Group>
					<Button variant="primary" type="submit" onClick={handleSubmit}> Submit </Button>
				</Form>
			</Container>
		</>
	)
}

export default Add