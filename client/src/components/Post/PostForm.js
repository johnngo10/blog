import React, { useState, useEffect } from "react";
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

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">
          Title
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            required
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
          ></textarea>
        </label>
      </fieldset>
      <fieldset>
        <input type="submit" value="Publish"></input>
        <Link to={"/"}>Cancel</Link>
      </fieldset>
    </form>
  );
};

export default PostForm;
