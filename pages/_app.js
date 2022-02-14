import '../styles/globals.css';
import { useRouter } from 'next/router';
import { UserContext } from '../components/UserContext';
import { useState, useEffect } from 'react';
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../components/firebase';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		if (pageProps.protected && !user) {
			router.push('/login');
			return;
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, login, logout, signup }}>
			{loading ? (
				<Loader />
			) : (
				<div className="App">
					<Component {...pageProps} />
				</div>
			)}
		</UserContext.Provider>
	);
}

export default MyApp;
