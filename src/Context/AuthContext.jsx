import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../Config/firebase";
import checkMobile from "../Components/CheckMobile";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // login in a popuup window if you are on a larger screen else redirect, new firebase update f thisup
      await signInWithPopup(auth, provider)
  };

  const logOut = () => {
    signOut(auth);
  };


  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
