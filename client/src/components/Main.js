import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as postActions from "../actions/post_actions";

const Main = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { all, newPosts } = state.posts;

  const { fetchPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    fetchPosts();
  }, [newPosts]);

  return (
    <div className="main-container">
      {Object.values(all).length === 0 ? (
        "There are no Posts"
      ) : (
        <div className="cards">
          {Object.values(all).map((value, index) => {
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

export default Main;
