import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      await axios.post("/api/user/login", body, config);
      history.pushState("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      </fieldset>
      <fieldset>
        <input type="submit" value="Login"></input>
        <a href="/">Cancel</a>
      </fieldset>
    </form>
  );
};

export default UserLogin;
