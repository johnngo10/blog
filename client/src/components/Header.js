import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/post/create"}>Create Post</Link>
          <button onClick={logoutUser}>Logout</button>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/user/signup"}>Signup</Link>
          <Link to={"/user/login"}>Login</Link>
        </nav>
      );
    }
  };

  return (
    <header>
      <h1>Blog</h1>
      {getLinks()}
    </header>
  );
};

export default Header;
