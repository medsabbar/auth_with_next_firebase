import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'next/router';

function Login() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();
	const { login, user } = useUser();

	function signupPage(e) {
		e.preventDefault();
		router.replace('/signup');
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login(email, password);
			router.replace('/');
		} catch (err) {
			setError(err.message);
		}
	};
	useEffect(() => {
		if (user) {
			router.replace('/');
		}
	}, [user, router]);
	return (
		<form onSubmit={handleSubmit}>
			<img src="./vercel.svg" alt="logo" className="logo" />
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

				<button className="primbtn" type="submit">
					Login
				</button>
				<p className="scondtxt">dont have an account</p>
				<button className="scondbtn" onClick={signupPage}>
					Signup
				</button>
			</div>
		</form>
	);
}

export default Login;
