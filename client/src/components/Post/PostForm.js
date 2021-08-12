import React, { useState } from "react";

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newPost: "",
  });

  const { title, content } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = { title, content };

    props.composePost(post);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label for="title">
          Title
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
        <label for="content">
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
        <a href="/">Cancel</a>
      </fieldset>
    </form>
  );
};

export default PostForm;
