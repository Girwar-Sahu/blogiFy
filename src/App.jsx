import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import AddBlogPage from "./pages/AddBlogPage";
import BlogsPage from "./pages/BlogsPage";
import UserProfile from "./pages/UserProfile";
import UpdateBlog from "./pages/UpdateBlog";
import AboutPage from "./pages/Ablout";
import {useSelector} from "react-redux"

function App() {
  const mode = useSelector((state) => state.mode.mode)
  return (
    <div className="App" data-theme={mode ? "dark": "light"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/addblog" element={<AddBlogPage />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
