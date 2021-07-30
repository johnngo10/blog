import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = formData;

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = { username, password, confirmPassword };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      await axios.post("/api/user/signup", body, config);
      history.push("/user/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
    </form>
  );
};

export default UserSignup;
