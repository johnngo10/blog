import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/post_actions";

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

  return (
    <div className="post-container">
      <h2>{title}</h2>
      <p className="post-author-date">
        Author: {author ? author.username : "unknown"}, {date}
      </p>
      <p className="post-content">{content}</p>
      <div>
        <h3>({comments === undefined ? 0 : comments.length}) Comments</h3>
        {!isAuthenticated ? (
          <Link to={"/user/login"}>Log in to add comment</Link>
        ) : (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              name="comment"
              type="text"
              placeholder="Add a comment.."
              value={formData.comment}
              onChange={(e) => handleChange(e)}
              required
              className="comment-textarea"
            ></textarea>
            <input
              type="submit"
              value="Comment"
              className="comment-submit"
            ></input>
          </form>
        )}
        <ul>
          {comments === undefined ? (
            <p className="no-comments">No Comments</p>
          ) : comments.length === 0 ? (
            <p className="no-comments">No Comments</p>
          ) : (
            comments.map((value, index) => {
              return (
                <li key={index} className="comment">
                  <div className="comment-author-date">
                    <p>{value.author}</p>
                    <p className="comment-date">{value.date}</p>
                  </div>
                  <p>{value.comment}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Post;
