import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

const UserLogin = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {},
  });

  const { username, password, errors } = formData;

  useEffect(() => {
    if (props.currentUser === true) {
      props.history.push("/");
    }

    setFormData({ ...formData, errors: props.errors });
  }, [props.errors]);

  // const componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.currentUser === true) {
  //     this.props.history.push("/");
  //   }

  //   setFormData({ ...formData, errors: nextProps.errors });
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    props.login(user);
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

export default withRouter(UserLogin);
