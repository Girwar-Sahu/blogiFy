import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import BlogPostForm from "../components/Form/BlogPostForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetError, resetStatus } from "../slice/BlogSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { setUser, clearUser } from "../slice/UserSlice";

function AddBlogPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("New blog post successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

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
        <BlogPostForm />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

export default AddBlogPage;
