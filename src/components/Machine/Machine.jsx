import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Container, Row, Col } from 'react-bootstrap';
import { db } from '../../firebase'
import { Navigation } from '../../r';

const Machine = () => {
	const [data, setData] = useState([]);
	const [macName, setMacName] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		const items = await db.collection('items').get();
		const docId = items.docs.map(doc => doc.id);
		const itemsData = items.docs.map(doc => doc.data());

		for (let i = 0; i < itemsData.length; i++) {
			setData(prevData => [...prevData, {
				id: i + 1,
				itemName: itemsData[i].itemName,
				machineName: itemsData[i].machineName,
				serialNumber: itemsData[i].serialNumber,
				quantity: itemsData[i].quantity,
				date: itemsData[i].date,
				by: itemsData[i].by,
				remarks: itemsData[i].remarks,
				docId: docId[i]
			}]);
		}

		const macname = itemsData.map(item => item.machineName);
		setMacName([...new Set(macname)]);
		setLoading(false);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Navigation />
			<br /><br /><br />
			{loading ?
				<Container>
					<Spinner animation="border" size="lg" variant="primary" />
				</Container> :
				<Container>
					<Row xs={1} md={2} lg={4} className="g-4" style={{ margin: 'auto' }}>
						{macName.map(mac => (
							<Col>
								<Card key={mac} style={{ width: "20rem", height: "100%" }}>
									<Card.Header>{mac}</Card.Header>
									<Card.Body>
										<Card.Text>
											<Table>
												<thead>
													<tr>
														<th>Item Name</th>
														<th>Quantity</th>
													</tr>
												</thead>
												{data.map(item => (
													item.machineName === mac ?
														<tbody key={item.id}>
															<tr>
																<td>{item.itemName}</td>
																<td>{item.quantity}</td>
															</tr>
														</tbody>
														: null
												))}
											</Table>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			}
		</>
	)
}

export default Machine