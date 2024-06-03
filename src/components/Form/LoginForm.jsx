import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase.js";
import {
  loginUser,
  signinWithGoogle,
  setUser,
  clearUser,
} from "../../slice/UserSlice";
import { Link } from "react-router-dom";
import "./Form.css";
import Loader from "../Loader/Loader2";

function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleGoogleSignin = () => {
    dispatch(signinWithGoogle());
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <div className="flex-column">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <img src="/svg/@.svg" alt="" />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Enter your Password"
          required
        />
        <img src="/svg/eye.svg" alt="" />
      </div>
      <div className="flex-row">
        <span className="span">Forgot password?</span>
      </div>
      <button type="submit" className="button-submit">
        {status === "loading" && (
          <div className="loader-container">
            <Loader /> Loading...
          </div>
        )}
        {status !== "loading" && "Sign In"}
      </button>
      <p className="p">
        Don't have an account?
        <Link to="/register">
          <span className="span">Sign Up</span>
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

export default LoginForm;
