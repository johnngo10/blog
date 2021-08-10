import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import "./App.css";

import Main from "./components/Main";
import HeaderContainer from "./components/HeaderContainer"
import UserSignupContainer from "./components/Auth/UserSignupContainer";
import UserLoginContainer from "./components/Auth/UserLoginContainer";
import Post from "./components/Post";
import PostForm from "./components/PostForm";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Switch>
        <AuthRoute exact path="/" component={Main} />
        <AuthRoute exact path="/user/signup" component={UserSignupContainer} />
        <AuthRoute exact path="/user/login" component={UserLoginContainer} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/post/create" component={PostForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
