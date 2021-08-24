import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessionActions from "../../actions/session_actions";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {},
  });
  const { username, password, errors } = formData;

  const state = useSelector((state) => state);
  const { loginErrors } = state.errors.session;
  const { isAuthenticated } = state.session;

  const dispatch = useDispatch();
  const history = useHistory();
  const { login } = bindActionCreators(sessionActions, dispatch);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    setFormData({ ...formData, errors: loginErrors });
  }, [state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    login(user);
  };

  const renderErrors = () => {
    if (errors !== undefined) {
      return (
        <ul>
          {Object.keys(errors).map((error, i) => (
            <li key={i}>{errors[error]}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <fieldset>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
      </fieldset>
      <fieldset>
        <input type="submit" value="Login"></input>
        <Link to={"/"}>Cancel</Link>
      </fieldset>
      {renderErrors()}
    </form>
  );
};

export default UserLogin;
