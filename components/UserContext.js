import { createContext, useContext, useEffect, useState } from 'react';
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import Loader from './Loader';

const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);

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
	}, []);
	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{loading ? <Loader /> : children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
