import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

const UserSignup = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const { username, password, confirmPassword, errors } = formData;

  const clearedErrors = false

  useEffect(() => {
    if (props.signedIn === true) {
      props.history.push("/user/login");
    }

    setFormData({ ...formData, errors: props.errors });
  }, [props.signedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { username, password, confirmPassword };

    props.signup(user, props.history);
  };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={i}>{errors[error]}</li>
        ))}
      </ul>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <fieldset>
        <label for="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
        <label for="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </label>
        <label for="confirmPassword">
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
        <a href="/">Cancel</a>
      </fieldset>
      {renderErrors()}
    </form>
  );
};

export default withRouter(UserSignup);
