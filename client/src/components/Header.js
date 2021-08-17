import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/post/create"}>Create Post</NavLink>
          <button onClick={logoutUser}>Logout</button>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/user/signup"}>Signup</NavLink>
          <NavLink to={"/user/login"}>Login</NavLink>
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
