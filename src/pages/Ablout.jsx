import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
// import Blog from "../components/Blog/Blog";

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="container about-container">
        <h1>About Us</h1>
        <h3>Our Mission</h3>
        <p>
          At Blog Platform, our mission is to empower individuals to share their
          stories, ideas, and knowledge with the world. We believe in the power
          of words and the impact they can have on communities and individuals.
          Our platform provides an easy and accessible way for everyone to
          express themselves through blogging.
        </p>
        <h3>What We Do</h3>
        <p>
          Blog Platform offers a user-friendly interface for creating, managing,
          and sharing blog posts. Whether you are a seasoned writer or just
          starting out, our platform is designed to make blogging simple and
          enjoyable. Key features include:
        </p>
        <p>
          <b>User Authentication: </b>Secure and easy sign-up and login process
          using Firebase Authentication.
        </p>
        <p>
          <b>Blog Management:</b> Create, update, and delete blog posts with
          ease. Organize your blogs by categories and authors.
        </p>
        <p>
          <b>Real-Time Updates:</b> Experience instant updates and
          synchronization with Firebase Firestore
        </p>
        <p>
          <b>Media Storage:</b> Upload and manage blog images using Firebase
          Storage.
        </p>
        <p>
          <b>Responsive Design:</b> Enjoy a seamless experience on both desktop
          and mobile devices.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
