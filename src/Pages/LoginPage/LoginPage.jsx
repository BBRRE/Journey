import React, { useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };
  //if you are loged in go straight to homePage
  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="LoginPage">
        <h1 className="title">Journey</h1>
        <button onClick={handleGoogleSignIn} className="signInWithGoogleButton">
          Sign in with Google
        </button>
      </div>
    </>
  );
}
