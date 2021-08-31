import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/post_actions";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newPost: "",
  });
  const { title, content } = formData;

  const dispatch = useDispatch();
  const { composePost } = bindActionCreators(postActions, dispatch);

  const state = useSelector((state) => state);
  const errors = state.errors.posts;

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = { title, content };

    composePost(post);
    history.push("/");
  };

  const renderErrors = () => {
    return (
      <ul className="form-error-container">
        {Object.keys(errors).map((error, i) => (
          <li key={i} className="form-error">
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <h2>Create a post</h2>
      <fieldset>
        <label htmlFor="title">
          Title
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            required
            className="session-form-input"
          ></input>
        </label>
        <label htmlFor="content">
          Content
          <textarea
            name="content"
            type="text"
            value={content}
            onChange={(e) => handleChange(e)}
            required
            className="form-textarea"
          ></textarea>
        </label>
      </fieldset>
      {renderErrors()}
      <fieldset>
        <input
          type="submit"
          value="Publish"
          className="session-form-submit"
        ></input>
        <Link to={"/"} className="cancel-btn">
          Cancel
        </Link>
      </fieldset>
    </form>
  );
};

export default PostForm;
