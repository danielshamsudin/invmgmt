import React from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

const Logout = () => {
	const navigate = useNavigate();
	return (
		<>
			<Modal show={true}>
				<Modal.Header>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to logout?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => {
						auth.signOut().then(() => {
							navigate('/')
						}
						).catch(err => {
							console.log(err)
						}
						)
					}
					}>
						Logout
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Logout