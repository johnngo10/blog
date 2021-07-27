import React from "react";

const UserSignup = () => {
  return (
    <form action="" method="POST">
      <fieldset>
        <label for="username">
          Username
          <input type="text" required name="username"></input>
        </label>
        <label for="password">
          Password
          <input type="password" name="password" required></input>
        </label>
        <label for="confirmPassword">
          Confirm Password
          <input type="password" name="confirmPassword" required></input>
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
