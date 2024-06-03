import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Nav";
import Carosuel from "../components/Carosuel/Carosuel";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import { slides } from "../components/Carosuel/carosuel.json";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  fetchBlogsByCategory,
  resetError,
  resetStatus,
} from "../slice/BlogSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <Carosuel data={slides} />
      </div>
      <div className="container">
        <div className="app-heading-container">
          <h1 className="app-heading">Latest Post</h1>
          <i className="fa-sharp fa-solid fa-list fa-lg"></i>
        </div>
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

export default HomePage;
