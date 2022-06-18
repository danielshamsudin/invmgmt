import React, { useState, useEffect } from 'react'
import Navigation from '../Navigation/Navigation';
import { Button, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase";


const Add = () => {
	const [itemName, setItemName] = useState("");
	const [serial, setSerial] = useState("");
	const [qty, setQty] = useState(0);
	const [startDate, setStartDate] = useState(new Date());
	const [by, setBy] = useState("");
	const [remarks, setRemarks] = useState("");

	const handleQty = event => {
		const res = event.replace(/\D/g, "");
		setQty(res);
	}


	const handleSubmit = async event => {
		event.preventDefault();
		const res = await db.collection("items").add({
			itemName: itemName,
			serialNumber: serial,
			quantity: qty,
			date: startDate.toDateString(),
			by: by,
			remarks: remarks
		});
		const trx = await db.collection("transaction").add({
			itemName: itemName,
			serialNumber: serial,
			quantity: qty,
			date: startDate.toDateString(),
			by: by,
			type: "add",
			remarks: remarks
		});
		console.log(res.id, " added succ");
		console.log(trx.id, " added trx succ");
		// display open modal on success
	}
	// Item name, serial number, quantity, by, date, remarks
	return (
		<>
			<Navigation />
			<br /><br /><br />
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
			{/* <h1>Name: {itemName}</h1>
			<br />
			<h1>Serial Number: {serial}</h1>
			<br />
			<h1>Quantity: {qty}</h1>
			<br />
			<h1>Date: {startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()}</h1>
			<br />
			<h1>By: {by}</h1>
			<br />
			<h1>Remarks: {remarks}</h1> */}

		</>
	)
}

export default Add