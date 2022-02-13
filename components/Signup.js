import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'next/router';

function Signup() {
	const [password, setPassword] = useState('');
	const [cPassword, setcPassword] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();
	const { signup } = useUser();

	function handswitch(e) {
		e.preventDefault();
		router.push('/login');
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (password !== cPassword) {
			setError('Passwords dont match');
			return;
		}
		try {
			await signup(email, password);
			router.replace('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<img src="./vercel.svg" alt="logo" className="logo" />
			<div className="container">
				<h2 className="alert">{error}</h2>
				<label htmlFor="uname">
					<p>User Email</p>
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
					<p>Password</p>
				</label>
				<input
					type="password"
					placeholder="Enter Password"
					name="psw"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<label htmlFor="cpsw">
					<p>Password</p>
				</label>
				<input
					type="password"
					placeholder="Confirm Password"
					name="cpsw"
					value={cPassword}
					onChange={(e) => setcPassword(e.target.value)}
					required
				/>

				<button className="primbtn" type="submit">
					Signup
				</button>
				<p className="scondtxt">alrealy have an account?</p>
				<button className="scondbtn" onClick={handswitch}>
					Signin
				</button>
			</div>
		</form>
	);
}

export default Signup;
