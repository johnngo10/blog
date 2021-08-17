import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newPost: "",
  });

  const { title, content } = formData;

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = { title, content };

    props.composePost(post);
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
