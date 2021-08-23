import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessionActions from "../actions/session_actions";

const Header = () => {
  const state = useSelector((state) => state);
  const { isAuthenticated, user } = state.session;

  const dispatch = useDispatch();
  const { logout } = bindActionCreators(sessionActions, dispatch);

  const logoutUser = (e) => {
    e.preventDefault();
    logout();
  };

  const getLinks = () => {
    if (isAuthenticated) {
      return (
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/post/create"}>Create Post</NavLink>
          <button onClick={logoutUser}>Logout</button>
          <div>{user.username}</div>
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
