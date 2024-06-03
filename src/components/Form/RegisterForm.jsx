import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  signinWithGoogle,
  setUser,
  clearUser,
} from "../../slice/UserSlice";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../Loader/Loader2";

function RegisterForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password, displayName }));
  };

  const handleGoogleSignin = () => {
    dispatch(signinWithGoogle());
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch(clearUser());
  };

  return (
    <form onSubmit={handleSignup} className="form">
      <div className="flex-column">
        <label>Full Name </label>
      </div>
      <div className="inputForm">
        {/* <img src="/svg/@.svg" alt="" /> */}
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          className="input"
          placeholder="Enter your Name"
          required
        />
      </div>
      <div className="flex-column">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <img src="/svg/@.svg" alt="" />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="Enter your Email"
          required
        />
      </div>
      <div className="flex-column">
        <label>Password </label>
      </div>
      <div className="inputForm">
        <img src="/svg/lock.svg" alt="" />
        <input
          type="password"
          className="input"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <img src="/svg/eye.svg" alt="" /> */}
      </div>
      <button type="submit" className="button-submit">
        {status === "loading" && (
          <div className="loader-container">
            <Loader /> Loading...
          </div>
        )}
        {status !== "loading" && "Sign Up"}
      </button>
      <p className="p">
        Already have an account?
        <Link to="/login">
          <span className="span">Log In</span>
        </Link>
      </p>
      <p className="p line">Or With</p>
      <div className="flex-row">
        <button onClick={handleGoogleSignin} className="btn google">
          <img src="/svg/google.svg" alt="" />
          Google
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
