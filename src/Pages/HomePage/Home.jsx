import React from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import "./Home.css";

export default function Home() {
  const { logOut, user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  //sign out
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  //sign in
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        id="SignOut"
        onClick={() => {
          {
            user ? handleSignOut() : handleSignIn();
          }
        }}
      >
        {user ? "Sign Out" : "sign In"}
      </button>
      <div id="welcomeAdd">
        <h1 id="welcomeMessege">Welcome <span onClick={() => {
          navigate('/Profile')
        }} className="profile">{user?.displayName}</span></h1>
        <button
          id="addJourney"
          className="button"
          onClick={() => {
            navigate("/AddJourney");
          }}
        >
          Add Journey
        </button>
      </div>
      <ExplorePage></ExplorePage>
    </>
  );
}
