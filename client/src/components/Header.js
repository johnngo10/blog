import React from "react";

const Header = () => {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/user/signup">Sign Up</a>
          </li>
          <li>
            <a href="/user/login">Log In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
