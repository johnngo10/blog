import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessionActions from "../../actions/session_actions";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });
  const { username, password, confirmPassword, errors } = formData;

  const state = useSelector((state) => state);
  const { signupErrors } = state.errors.session;
  const { isSignedIn } = state.session;
  const dispatch = useDispatch();
  const history = useHistory();

  const { signup } = bindActionCreators(sessionActions, dispatch);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/user/login");
    }

    setFormData({ ...formData, errors: signupErrors });
  }, [state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { username, password, confirmPassword };

    signup(user);
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
      <h2>Sign Up</h2>
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
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
      </fieldset>
      <fieldset>
        <input type="submit" value="Sign Up"></input>
        <Link to={"/"}>Cancel</Link>
      </fieldset>
      {renderErrors()}
    </form>
  );
};

export default UserSignup;
