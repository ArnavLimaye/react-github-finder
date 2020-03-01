import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import Axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data,
      loading: false
    });
  }

  searchUsers = async text => {
    //Ask ABhijit how prop up works
    this.setState({ loading: true });
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  //Get a single User
  getUser = async userName => {
    this.setState({ loading: true });
    const res = await Axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      user: res.data,
      loading: false
    });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert}></Alert>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    ></Search>
                    <Users loading={loading} users={users}></Users>
                  </Fragment>
                )}
              ></Route>
              <Route exact path='/about' component={About}></Route>
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props} ///Ask Abhjit what this syntax does?
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
