import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/post_actions";

const PostEditForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { id } = useParams();
  const { title, content } = formData;

  const dispatch = useDispatch();
  const { fetchPost, editPost } = bindActionCreators(postActions, dispatch);

  const state = useSelector((state) => state);
  const errors = state.errors.posts;
  const stateTitle = state.posts.post.title;
  const stateContent = state.posts.post.content;

  useEffect(() => {
    fetchPost(id);

    setFormData({
      title: stateTitle,
      content: stateContent,
    });
  }, []);

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = { title, content };

    editPost(id, post);

    history.push(`/post/${id}`);
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
      <h2>Edit post</h2>
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
          value="Update"
          className="session-form-submit"
        ></input>
        <Link to={`/post/${id}`} className="cancel-btn">
          Cancel
        </Link>
      </fieldset>
    </form>
  );
};

export default PostEditForm;
