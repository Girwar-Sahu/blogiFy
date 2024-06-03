import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import BlogPostForm from "../components/Form/BlogPostForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchBlog, resetError, resetStatus } from "../slice/BlogSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { setUser, clearUser } from "../slice/UserSlice";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const param = useParams();
  const { blog, status, error } = useSelector((state) => state.blogs);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlog(param.id));
  }, [dispatch, param.id]);

  useEffect(() => {
    if (status === "succeeded") {
      // toast.success("blog update successful", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      dispatch(resetStatus());
      // navigate(`/profile/${user.uid}`)
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
        <BlogPostForm
          id={blog.id}
          title={blog.title}
          description={blog.description}
          content={blog.content}
          category={blog.category}
          coverImg={blog.coverImg}
        />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

export default UpdateBlog;
