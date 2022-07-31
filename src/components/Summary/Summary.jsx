import React, { useState, useEffect } from 'react'
import Navigation from "../Navigation/Navigation";
import { Container, Table, Spinner } from "react-bootstrap";
import { db } from '../../firebase';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Summary = () => {

	let newDate = new Date();
	let fDate = newDate.toDateString();
	const [summary, setSummary] = useState([]);
	const [loading, setLoading] = useState(true);
	const [date, setDate] = useState(new Date());
	const [dateChoosen, setDateChoosen] = useState(fDate);

	const fetchData = async () => {
		const items = await db.collection('transaction').get();
		const itemsData = items.docs.map(doc => doc.data());
		console.log(itemsData);
		for (let i = 0; i < itemsData.length; i++) {
			if (itemsData[i].date === dateChoosen) {
				setSummary(prevData => [...prevData, {
					id: i + 1,
					itemName: itemsData[i].itemName,
					machineName: itemsData[i].machineName,
					serialNumber: itemsData[i].serialNumber,
					quantity: itemsData[i].quantity,
					remarks: itemsData[i].remarks,
					by: itemsData[i].by,
					trx: itemsData[i].type
				}]);
			}
		}
		setLoading(false);
	}

	const handleDate = (date) => {
		setDate(date);
		setDateChoosen(date.toDateString());
	}

	useEffect(() => {
		fetchData();
		setSummary([]);
	}, [dateChoosen]);

	return (
		<>
			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Summary of {dateChoosen}</h1>
				<h3>Choose a date:</h3>
				<DatePicker selected={date} dateFormat="dd/M/yyyy" onChange={date => handleDate(date)} />
				<br />
				{loading ? <Spinner animation="border" size="lg" variant="primary"></Spinner> : <Table>
					<thead>
						<tr>
							<th>No.</th>
							<th>Item Name</th>
							<th>Machine Name</th>
							<th>Serial No.</th>
							<th>Quantity</th>
							<th>By</th>
							<th>Transaction</th>
							<th>Remarks</th>
						</tr>
						{summary.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.itemName}</td>
									<td>{item.machineName}</td>
									<td>{item.serialNumber}</td>
									<td>{item.quantity}</td>
									<td>{item.by}</td>
									<td>{item.trx}</td>
									<td>{item.remarks}</td>
								</tr>
							)
						})}
					</thead>
				</Table>}
			</Container>
		</>
	)
}

export default Summary