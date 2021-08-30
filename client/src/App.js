import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import "./App.css";

import Main from "./components/Main";
import Header from "./components/Header";
import UserSignup from "./components/Auth/UserSignup";
import UserLogin from "./components/Auth/UserLogin";
import Post from "./components/Post/Post";
import PostForm from "./components/Post/PostForm";
import PostEditForm from "./components/Post/PostEditForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <AuthRoute exact path="/user/signup" component={UserSignup} />
        <AuthRoute exact path="/user/login" component={UserLogin} />
        <ProtectedRoute exact path="/post/create" component={PostForm} />
        <ProtectedRoute exact path="/post/:id/edit" component={PostEditForm} />
        <Route exact path="/post/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
