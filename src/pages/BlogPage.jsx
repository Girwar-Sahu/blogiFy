import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import Blog from "../components/Blog/Blog";

function BlogPage() {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="container container-body">
        <Blog />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

export default BlogPage;
