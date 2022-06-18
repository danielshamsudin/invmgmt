import React, { useState, useEffect } from 'react'
import Navigation from "../Navigation/Navigation";
import { Container, Table } from "react-bootstrap";
import { db } from '../../firebase';

// Fetch data from summary table
// Cols: Item name, Serial Number, Quantity, Remarks
// Remarks data is entered from the form when item is dispatched
const Summary = () => {

	const [summary, setSummary] = useState([]);
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
	}


	useEffect(() => {
		// for (let i = 0; i < 11; i++) {
		// 	setSummary(s => [...s, {
		// 		id: i,
		// 		name: "item " + i,
		// 		serial: 123 + i,
		// 		qty: i,
		// 		date: "2020-01-01",
		// 		by: "admin",
		// 		remarks: "taken from stock",
		// 	}])
		// }
		fetchData();
	}, []);

	return (
		<>
			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Summary of {fDate}</h1>
				<br />
				<Table>
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

				</Table>
			</Container>

		</>
	)
}

export default Summary