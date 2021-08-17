import React, { useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";

const Post = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.fetchPost(id);
  }, []);

  const { title, author, content, date, comments } = props.post;

  return (
    <div>
      <h2>{title}</h2>
      <p>
        Author: {author ? author.username : "unknown"}, {date}
      </p>
      <p>{content}</p>
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

export default withRouter(Post);
