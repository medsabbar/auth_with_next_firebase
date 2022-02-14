import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from './UserContext';

function Home() {
	const { user, logout } = useUser();
	const router = useRouter();
	const handleLogout = async () => {
		try {
			await logout();
			router.replace('/login');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h2>Wellcome</h2>
			{user && user.email}
			<br />
			<button onClick={handleLogout} className="logoutbtn">
				Logout
			</button>
		</div>
	);
}

export default Home;
