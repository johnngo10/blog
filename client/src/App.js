import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import "./App.css";

import MainContainer from "./components/MainContainer";
import HeaderContainer from "./components/HeaderContainer";
import UserSignupContainer from "./components/Auth/UserSignupContainer";
import UserLoginContainer from "./components/Auth/UserLoginContainer";
import Post from "./components/Post/Post";
import PostFormContainer from "./components/Post/PostFormContainer";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <AuthRoute exact path="/user/signup" component={UserSignupContainer} />
        <AuthRoute exact path="/user/login" component={UserLoginContainer} />
        <ProtectedRoute
          exact
          path="/post/create"
          component={PostFormContainer}
        />
        <ProtectedRoute exact path="/post/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
