import axios from "axios";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "./../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const googleProvider = new GoogleAuthProvider();

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (name) => {
		setLoading(true);
		return updateProfile(auth.currentUser, {
			displayName: name,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log("current user", currentUser);

			if (currentUser) {
				axios
					.post("https://react-restaurent-server.onrender.com/jwt", {
						email: currentUser.email,
					})
					.then((data) => {
						// console.log(data.data.token);
						localStorage.setItem("access-token", data.data.token);
						setLoading(false);
					});
			} else {
				// TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
				localStorage.removeItem("access-token");
			}

			// setLoading(false);
		});
		return () => {
			return unsubscribe();
		};
	}, []);
	const authInfo = {
		user,
		loading,
		createUser,
		signIn,
		googleSignIn,
		logOut,
		updateUserProfile,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
