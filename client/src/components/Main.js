import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../actions/post_actions";

const Main = () => {
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { all, newPosts } = state.posts;

  const { fetchPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    fetchPosts();
  }, [newPosts]);

  console.log(state);

  // Problem is because RECEIVE_POSTS action is being dispatched before RECEIVE_NEW_POST. Figure out a way to redirect to main page after RECEIVE_POSTS action is dispatched

  return (
    <div>
      {Object.values(all).length === 0 ? (
        "There are no Posts"
      ) : (
        <div>
          <h2>Main Page</h2>
          {Object.values(all).map((value, index) => {
            return (
              <Link to={`/post/${value._id}`} key={index}>
                <div>
                  <p>{value.title}</p>
                  <p>{value.author.username}</p>
                  <p>{value.date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Main;
