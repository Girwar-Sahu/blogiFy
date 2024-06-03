import React, { useEffect } from "react";
import "./Card.css";
import pic from "/user-avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlog } from "../../slice/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Card = ({
  id,
  title,
  category,
  coverImg,
  date,
  author,
  authorImg,
  updateAndDelete,
}) => {
  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBlog(id));
  };

  // useEffect(()=>{
  //   if(status==="succeeded"){
  //     toast.error("blog deleted")
  //   }
  // },[status])

  const navigate = useNavigate();
  return (
    <div
      className={
        updateAndDelete
          ? "card-container card-container-extra"
          : "card-container"
      }
    >
      <ToastContainer />
      <div className="card-img-container">
        <img className="card-img" src={coverImg} alt="card-image" />
      </div>
      <div className="card-body-container">
        <button className="card-capsule">{category}</button>
        <Link className="card-link" to={`/blog/${id}`}>
          <h2 className="card-title">{title}</h2>
        </Link>
        <div className="card-profile">
          <img width="40" src={authorImg ? authorImg : pic} alt="" />
          <p>{author}</p>
          <p>{formatDate(date)}</p>
        </div>
        {updateAndDelete && (
          <div>
            <button
              onClick={() => navigate(`/updateblog/${id}`)}
              className="extra-btn"
            >
              update
            </button>
            <button onClick={handleDelete} className="extra-btn">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
