import React from "react";

const PostForm = () => {
  return (
    <form method="POST" action="">
      <fieldset>
        <label for="title">
          Title
          <input name="title" type="text" required></input>
        </label>
        <label for="text">
          Content
          <textarea name="content" type="text" required></textarea>
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
