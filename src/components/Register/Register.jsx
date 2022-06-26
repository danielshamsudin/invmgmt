import React, { useState } from 'react'
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import Navigation from "../Navigation/Navigation";

const Register = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [showModal, setShowModal] = useState(false);

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);

	const handleRegister = async (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password).then(res => {
			res.user.updateProfile({
				displayName: name
			})
			handleOpen();
		}).catch(err => {
			console.log(err);
		})
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Success</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>User has been registered successfully!</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => { navigate('/login') }}>
						Login Now!
					</Button>
				</Modal.Footer>
			</Modal>

			<Navigation />
			<br /><br /><br />
			<Container>
				<h1>Register</h1>
				<Form>
					<Form.Group controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						<Form.Text className="text-muted">
							Password must be at least 6 characters long.
						</Form.Text>
					</Form.Group>
					<br />
					<Button variant="primary" type="submit" onClick={(e) => handleRegister(e)}>
						Create a new account
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default Register