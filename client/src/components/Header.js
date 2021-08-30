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
          <NavLink to={"/"} className="nav-links">
            Home
          </NavLink>
          <NavLink to={"/post/create"} className="nav-links">
            Create Post
          </NavLink>
          <button onClick={logoutUser} className="logout-btn">
            Logout
          </button>
          <NavLink to={`/post/user/${user.id}`} className="nav-links">
            <div>
              <i className="fas fa-user"></i>
              {user.username}
            </div>
          </NavLink>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to={"/"} className="nav-links">
            Home
          </NavLink>
          <NavLink to={"/user/signup"} className="nav-links">
            Signup
          </NavLink>
          <NavLink to={"/user/login"} className="nav-links">
            Login
          </NavLink>
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
