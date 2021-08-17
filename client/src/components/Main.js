import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

const Main = (props) => {
  const [posts, setPosts] = useState([]);

  // Problem is because RECEIVE_POSTS action is being dispatched before RECEIVE_NEW_POST. Figure out a way to redirect to main page after RECEIVE_POSTS action is dispatched

  useEffect(() => {
    props.fetchPosts();
    console.log(props);
  }, []);

  return (
    <div>
      {props.posts.length === 0 ? (
        "There are no Posts"
      ) : (
        <div>
          <h2>Main Page</h2>
          {props.posts.map((value, index) => {
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

export default withRouter(Main);
