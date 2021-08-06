import React, { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/post")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {posts.map((value, index) => {
        return (
          <div key={index}>
            <p>{value.title}</p>
            <p>{value.author.username}</p>
            <p>{value.date}</p>
          </div>
        );
      })}
      {/* <div>
        <p>Title of the post</p>
        <p>Author's name</p>
        <p>28 Jan 2021</p>
      </div> */}
    </div>
  );
};

export default MainPage;
