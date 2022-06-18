import React, { useState, useEffect } from 'react'
import Navigation from "../Navigation/Navigation";
import { Container, Table, Spinner } from "react-bootstrap";
import { db } from '../../firebase';

// Fetch data from summary table
// Cols: Item name, Serial Number, Quantity, Remarks
// Remarks data is entered from the form when item is dispatched
const Summary = () => {

	const [summary, setSummary] = useState([]);
	const [loading, setLoading] = useState(true);
	let newDate = new Date();
	let fDate = newDate.toDateString();

	const fetchData = async () => {
		const items = await db.collection('transaction').get();
		const itemsData = items.docs.map(doc => doc.data());
		console.log(itemsData);
		for (let i = 0; i < itemsData.length; i++) {
			if (itemsData[i].date === fDate) {
				setSummary(prevData => [...prevData, {
					id: i + 1,
					itemName: itemsData[i].itemName,
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


	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Summary of {fDate}</h1>
				<br />
				{loading ? <Spinner animation="border" size="lg" variant="primary"></Spinner> : <Table>
					<thead>
						<tr>
							<th>No.</th>
							<th>Item Name</th>
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