import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login, user } = useUser();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login(email, password);
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);
	return (
		<form onSubmit={handleSubmit}>
			<img src="./logo512.png" alt="logo" className="logo" />
			<div className="container">
				<h2 className="alert">{error}</h2>
				<label htmlFor="uname">
					<b>User Email</b>
				</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Enter Email"
					name="uname"
					required
				/>

				<label htmlFor="psw">
					<b>Password</b>
				</label>
				<input
					type="password"
					placeholder="Enter Password"
					name="psw"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<button className="loginbtn" type="submit">
					Login
				</button>
			</div>
		</form>
	);
}

export default Login;
