import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as postActions from "../../actions/post_actions";

const Post = () => {
  const [formData, setFormData] = useState({ comment: "" });
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state);
  const { title, author, date, content, comments } = state.posts.post;
  const { isAuthenticated, user } = state.session;

  const { fetchPost, composeComment, deletePost, deleteComment } =
    bindActionCreators(postActions, dispatch);

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

  const handlePostDelete = (e) => {
    deletePost(id);
    history.push("/");
  };

  const handlePostEdit = (e) => {
    history.push(`/post/${id}/edit`);
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(id, commentId);
  };

  const clear = () => {
    setFormData({ comment: "" });
  };

  return (
    <div className="post-container">
      <h2>{title}</h2>
      <p className="post-author-date">
        Author: {author ? author.username : "unknown"},{" "}
        {moment(date).format("MMMM Do YYYY")}{" "}
        {author && user ? (
          user.id === author._id ? (
            <span className="edit-delete-post">
              <i className="fas fa-edit" onClick={handlePostEdit}></i>{" "}
              <i className="fas fa-trash-alt" onClick={handlePostDelete}></i>
            </span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
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
        <ul className="comment-container">
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
                    <div className="date-close-container">
                      <p className="comment-date">
                        {moment(value.date).fromNow()}
                      </p>
                      {value.author === user.username ? (
                        <i
                          className="fas fa-times"
                          onClick={(e) => handleCommentDelete(value._id)}
                        ></i>
                      ) : (
                        ""
                      )}
                    </div>
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
