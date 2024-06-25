import React, { useEffect, useState } from "react";
import "./Blog.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../../slice/BlogSlice";
import HTMLReactParser from "html-react-parser";
import { addComment, fetchComments } from "../../slice/CommentSlice";
import Loader from "../Loader/Loader2";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "../../slice/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetError, resetStatus } from "../../slice/CommentSlice";

function Blog() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, status, blog } = useSelector((state) => state.blogs);
  const { cError, cStatus, comments } = useSelector((state) => state.comments);
  const param = useParams();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    dispatch(fetchBlog(param.id));
  }, [dispatch, param.id]);

  useEffect(() => {
    dispatch(fetchComments(param.id));
  }, [dispatch, param.id]);

  useEffect(() => {
    if (cError) {
      toast.error(cError);
      dispatch(resetError());
    }
  }, [cError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    dispatch(addComment({ blogId: param.id, content, user }))
      .unwrap()
      .then(() => {
        console.log("Comment added successfully");
        setContent("");
      })
      .catch((error) => {
        console.error("Failed to add comment:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="blog-page-container">
      <ToastContainer />
      <div>
        <span className="blog-tag">{blog?.category}</span>
      </div>
      <div className="blog-title-area">
        <h1>{blog?.title}</h1>
        <p>{blog?.description}</p>
      </div>
      <div className="auther-dtl">
        <img width="40" src="/user-avatar.png" alt="" />
        <p>{blog?.author?.displayName}</p>
        <p>{formatDate(blog?.createdAt)}</p>
      </div>
      <div className="main-blog-img">
        <img src={blog?.imageURL} alt="" />
      </div>
      <span className="main-content">{HTMLReactParser(`${blog?.content}`)}</span>
      <div className="comment-count">
        <h2>Comments ({comments.length})</h2>
      </div>
      <div className="blog-comment">
        {user && ( <form onSubmit={handleSubmit} className="">
          <label htmlFor="commentBox">Add Your Comment</label>
          <textarea
            name="commentBox"
            id="commentBox"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">
            {isSubmitting ? (
              <>
                <span>
                  <Loader /> Loading...
                </span>
              </>
            ) : (
              "Add comment"
            )}
          </button>
        </form>)}
      </div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="auther-dtl">
            <img width="40" src="/user-avatar.png" alt="" />
            <p>{comment?.author?.displayName}</p>
            <p>{formatDate(comment.createdAt)}</p>
          </div>
          <div className="comment-body">
            <h5>{comment?.content}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;
