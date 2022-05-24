import React, { useState, useEffect } from 'react'
import Navigation from "../Navigation/Navigation";
import { Container, Table } from "react-bootstrap";

// Fetch data from summary table
// Cols: Item name, Serial Number, Quantity, Remarks
// Remarks data is entered from the form when item is dispatched
const Summary = () => {

	const [summary, setSummary] = useState([]);
	let newDate = new Date();
	let fDate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
	useEffect(() => {
		for (let i = 0; i < 11; i++) {
			setSummary(s => [...s, {
				id: i,
				name: "item " + i,
				serial: 123 + i,
				qty: i,
				date: "2020-01-01",
				by: "admin",
				remarks: "taken from stock",
			}])
		}
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
							<th>Date</th>
							<th>By</th>
							<th>Remarks</th>
						</tr>
						{summary.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.serial}</td>
									<td>{item.qty}</td>
									<td>{item.date}</td>
									<td>{item.by}</td>
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