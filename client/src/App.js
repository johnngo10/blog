import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Header from "./components/Header";
import UserSignup from "./components/UserSignup";
import UserLogin from "./components/UserLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/user/signup" component={UserSignup} />
        <Route exact path="/user/login" component={UserLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
