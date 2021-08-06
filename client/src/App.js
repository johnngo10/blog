import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import "./App.css";

import Main from "./components/Main";
import Header from "./components/Header";
import UserSignup from "./components/UserSignup";
import UserLogin from "./components/UserLogin";
import Post from "./components/Post";
import PostForm from "./components/PostForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <AuthRoute exact path="/" component={Main} />
        <AuthRoute exact path="/user/signup" component={UserSignup} />
        <AuthRoute exact path="/user/login" component={UserLogin} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/post/create" component={PostForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
