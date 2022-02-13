import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Home() {
	const { user, logout } = useUser();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/login');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h2>Wellcome</h2>
			{user && user.email}
			<br />
			<button onClick={handleLogout}>logout</button>
		</div>
	);
}

export default Home;
