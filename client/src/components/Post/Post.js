import React, { useEffect, useState } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/post_actions";

// When adding comments, component does not update in real time
// When logging out while on post page, error occurs
// No longer need to use connect or mapstatetoprops or post_container

const Post = () => {
  const [formData, setFormData] = useState({ comment: "" });
  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { title, author, date, content, comments } = state.posts.post;
  const { isAuthenticated } = state.session;

  const { fetchPost, composeComment } = bindActionCreators(
    postActions,
    dispatch
  );

  useEffect(() => {
    fetchPost(id);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let comment = { comment: formData.comment };

    composeComment(id, comment);
    clear();
  };

  const clear = () => {
    setFormData({ comment: "" });
  };

  console.log(state);

  return (
    <div>
      <h2>{title}</h2>
      <p>
        Author: {author ? author.username : "unknown"}, {date}
      </p>
      <p>{content}</p>
      <div>
        <h3>Comments</h3>
        {!isAuthenticated ? (
          <Link to={"/user/login"}>Log in to add comment</Link>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              name="comment"
              type="text"
              placeholder="Add a comment.."
              value={formData.comment}
              onChange={(e) => handleChange(e)}
              required
            ></textarea>
            <input type="submit" value="Add Comment"></input>
          </form>
        )}
        <ul>
          {comments === undefined
            ? "No Comments"
            : comments.length === 0
            ? "No Comments"
            : comments.map((value, index) => {
                return (
                  <li key={index}>
                    <p>{value.author}</p>
                    <p>{value.date}</p>
                    <p>{value.comment}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default Post;
