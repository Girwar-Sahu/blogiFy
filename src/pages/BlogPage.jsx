import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import Blog from "../components/Blog/Blog";

function BlogPage() {
  return (
    <div>
      <Navbar />
      <div className="container container-body">
        <Blog />
      </div>
      <Footer />
    </div>
  );
}

export default BlogPage;
