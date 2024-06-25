import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import UserSlice from "./slice/UserSlice";
import blogSlice from "./slice/BlogSlice";
import CommentSlice from "./slice/CommentSlice";
import DarkModeSlice from "./slice/DarkModeSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: UserSlice,
    blogs: blogSlice,
    comments: CommentSlice,
    mode: DarkModeSlice
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
