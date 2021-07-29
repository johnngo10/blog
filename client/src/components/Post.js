import React from "react";

const Post = () => {
  return (
    <div>
      <h2>title of the post</h2>
      <p>Author: Tim Tim, April 7, 2014</p>
      <p>The content of the article</p>
      <div>
        <h3>Comments</h3>
        <form method="POST" action="">
          <textarea placeholder="Add a comment.."></textarea>
          <input type="submit" value="Add Comment"></input>
        </form>
        <ul>
          <li>
            <p>Name</p>
            <p>Jan 8, 2015</p>
            <p>The comment...</p>
          </li>
          <li>
            <p>Name</p>
            <p>Jan 8, 2015</p>
            <p>The comment...</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
