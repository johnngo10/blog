import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
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
    <div>
      {Object.values(all).length === 0 ? (
        "There are no Posts"
      ) : (
        <div>
          {Object.values(all).map((value, index) => {
            return (
              <div className="card-container">
                <Link
                  to={`/post/${value._id}`}
                  key={index}
                  className="card-link"
                >
                  <p className="card-title">{value.title}</p>
                  <p className="card-author">Author: {value.author.username}</p>
                  <p className="card-date">{value.date}</p>
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
