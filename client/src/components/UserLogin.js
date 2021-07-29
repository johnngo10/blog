import React from "react";

const UserLogin = () => {
  return (
    <form action="" method="POST">
      <h2>Login</h2>
      <fieldset>
        <label for="username">
          Username
          <input type="text" required name="username"></input>
        </label>
        <label for="password">
          Password
          <input type="password" name="password" required></input>
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
