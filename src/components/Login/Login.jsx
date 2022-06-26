import React, { useState } from 'react'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Modal } from "react-bootstrap";
import LoglessNav from '../LoglessNav/LoglessNav';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [user, setUser] = useState(null);

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password).then(res => {
			auth.onAuthStateChanged(u => {
				if (u) {
					setUser(u.displayName);
					handleOpen();
				}
			});
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
					<p>Welcome, {user}!</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => {
						handleClose();
						navigate('/');
					}}>
						Continue
					</Button>
				</Modal.Footer>
			</Modal>
			<LoglessNav />
			<br /><br /><br />
			<Container>
				<h1>Login</h1>
				<Form>
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
					<Button variant="primary" type="submit" onClick={(e) => { handleLogin(e) }}>
						Login
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default Login