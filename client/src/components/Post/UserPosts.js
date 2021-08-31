import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as postActions from "../../actions/post_actions";

const UserPosts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const state = useSelector((state) => state);
  const { user } = state.posts;

  const { fetchUserPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    fetchUserPosts(id);
  }, []);

  return (
    <div className="main-container">
      {Object.values(user).length === 0 ? (
        <div className="no-post-message">There are no posts</div>
      ) : (
        <div className="cards">
          {Object.values(user).map((value, index) => {
            return (
              <div className="card-container" key={index}>
                <Link to={`/post/${value._id}`} className="card-link">
                  <p className="card-title">{value.title}</p>
                  <p className="card-author">Author: {value.author.username}</p>
                  <p className="card-date">
                    {moment(value.date).format("MMMM Do YYYY")}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
