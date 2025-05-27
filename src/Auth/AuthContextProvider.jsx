import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

// auth context
export const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gettingUserLoading, setGettingUserLoading] = useState(true);
  const [loginLoader, setLoginLoader] = useState(true);

  // Google login
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Create user with email & password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email & password
  const loginUser = (email, password) => {
    setLoginLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Logout
  const userLogout = () => {
    return signOut(auth);
  };

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setGettingUserLoading(false);
      setLoginLoader(false);
    });
    return () => unSubscribe();
  }, []);

  //   authInfo
  const authInfo = {
    user,
    setUser,
    signInWithGoogle,
    createUser,
    loginUser,
    userLogout,
    updateUser,
    setGettingUserLoading,
    gettingUserLoading,
    loginLoader,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
