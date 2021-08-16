import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const Main = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    props.fetchPosts();
  }, [props.posts]);

  // Post doesn't update on main page after creating a post

  useEffect(() => {
    setPosts(props.posts);
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        "There are no Posts"
      ) : (
        <div>
          <h2>Main Page</h2>
          {props.posts.map((value, index) => {
            return (
              <div key={index}>
                <p>{value.title}</p>
                <p>{value.author.username}</p>
                <p>{value.date}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withRouter(Main);
