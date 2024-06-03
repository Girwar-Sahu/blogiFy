import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader2";
import { createBlog, updateBlog } from "../../slice/BlogSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { user } from "../../slice/UserSlice";
import "./Form.css";
import JoditEditor from "jodit-react";

function BlogPostForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const editor = useRef(null);
  const currentUser = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.blogs.status);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);

  useEffect(() => {
    if (props.id) {
      console.log(props.id);
      setTitle(props.title);
      setDescription(props.description);
      setCategory(props.category);
      setContent(props.content);
      setCoverImg(props.coverImg);
    }
  }, [props.id, props.title,props.coverImg, props.description, props.category, props.content]);

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarSticky: false,
      minHeight: 400,
      maxHeight: 600,
      uploader: {
        insertImageAsBase64URI: false,
      },
      placeholder: props.placeholder || "",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "ul",
        "ol",
        "outdent",
        "indent",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "table",
        "link",
        "align",
        "undo",
        "redo",
        "hr",
        "eraser",
        "copyformat",
        "fullsize",
        "selectall",
      ],
    }),
    [props.placeholder]
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    if (coverImg) {
      const user = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
      };
      dispatch(
        updateBlog({id:props.id, title, description, category, content, coverImg, user })
      );

    } else {
      toast.error("Please select a cover image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coverImg) {
      const user = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
      };
      dispatch(
        createBlog({ title, description, category, content, coverImg, user })
      );
    } else {
      toast.error("Please select a cover image");
    }
  };

  return (
    <form
      onSubmit={props.id ? handleUpdate : handleSubmit}
      className="form blog-form"
    >
      <div className="form-column new-blog-heading">
        <h1>{props.id ? "# Update Blog" : "Create new Blog"}</h1>
      </div>
      <div className="flex-column">
        <label>Title </label>
      </div>
      <div className="inputForm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="input"
          placeholder="Enter Blog Title"
        />
      </div>
      <div className="flex-column">
        <label>Description </label>
      </div>
      <div className="inputForm">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="input"
          placeholder="Enter Blog Description"
        />
      </div>
      <div className="flex-column">
        <label>Category </label>
      </div>
      <div className="inputForm">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          className="input"
          placeholder="Enter Blog Category"
        />
      </div>
      <div className="flex-column">
        <label>Thumbnail </label>
      </div>
      <div className="inputForm">
        <label className="custom-file-upload">
          <input
            onChange={(e) => setCoverImg(e.target.files[0])}
            className="input"
            accept="images/*"
            type="file"
          />
          <p
            style={{
              color: "grey",
              position: "absolute",
              left: "160px",
              top: "10px",
            }}
          >
            {coverImg?.name}
          </p>
        </label>
      </div>
      <div className="flex-column">
        <label>Content</label>
      </div>
      <div className="inputForm inputForm--textarea">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          className="input textarea"
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </div>

      <button type="submit" className="button-submit">
        {status === "loading" && (
          <div className="loader-container">
            <Loader /> Loading...
          </div>
        )}
        {status !== "loading" && props.id ? "Update Blog" : "Post Blog"}
      </button>
    </form>
  );
}

export default BlogPostForm;
