import React, { useState, useEffect } from 'react'
import { Container, Card, Row } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import { db } from '../../firebase';

const Dispense = () => {

	const [data, setData] = useState([]);

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
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Withdraw Items</h1>
				<br />
				<Container fluid>
					<Row>
						{data.map(item => {
							return (
								<>
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
											</Card.Text>
											{/* <Card.Link href={`/dispense/${item.docId}`}>Withdraw</Card.Link> */}
										</Card.Body>
									</Card>
									&nbsp;
									&nbsp;
								</>
							)
						})}
					</Row>
				</Container>
			</Container>
		</>
	)
}

export default Dispense;