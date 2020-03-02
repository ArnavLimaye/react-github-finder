import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

import GihubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

const App = () => {
  return (
    <GihubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='Github Finder' icon='fab fa-github' />
            <div className='container'>
              <Alert component={Alert}></Alert>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/about' component={About}></Route>
                <Route exact path='/user/:login' component={User}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GihubState>
  );
};

export default App;
