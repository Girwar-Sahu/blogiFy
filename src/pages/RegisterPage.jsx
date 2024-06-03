import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import "./HomePage.css";
import RegisterForm from "../components/Form/RegisterForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { setUser, clearUser, resetStatus , resetError} from "../slice/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom"

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (status === "succeeded" && currentUser) {
      toast.success("Register successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/profile/${currentUser.uid}`)
      dispatch(resetStatus());
    }
  }, [status,currentUser,navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar />
      </div>
      <div className="container container-body">
        <RegisterForm />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
