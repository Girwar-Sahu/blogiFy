import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Nav";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBlogsByAuthorId,
  resetError,
  resetStatus,
} from "../slice/BlogSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom"

function UserProfile() {
  const navigate = useNavigate()
  const param = useParams();
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.user);

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

  // useEffect(() => {
  //   // console.log("Fetching blogs for user:", param.id); // Add logging
  //   dispatch(fetchBlogsByAuthorId(param.id));
  // }, [dispatch, param.id]);

  // useEffect(() => {
  //   // console.log("Blogs state:", blogs); // Add logging
  // }, [blogs]);

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <div className="app-heading-container">
          <h1 className="app-heading">My Blogs</h1>
          <i className="fa-sharp fa-solid fa-list fa-lg"></i>
        </div>
      </div>
      <div className="container">
        <button className="create-blog-btn" onClick={()=> navigate(`/addblog`)}>Create New Blog</button>
      </div>
      <div className="container">
        <div id="blogs" className="app-cards">
          {blogs.map((blog) => {
            if (blog.author && blog.author.displayName) {
              return (
                <Card
                  key={blog.id}
                  id={blog.id}
                  category={blog.category}
                  title={blog.title}
                  coverImg={blog.imageURL}
                  date={blog.createdAt}
                  author={blog.author.displayName}
                  authorImg={blog.author.photoURL}
                  updateAndDelete={true}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="container">
        <button className="load-btn">Load More</button>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
