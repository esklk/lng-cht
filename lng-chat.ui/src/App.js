import React, { Component } from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Body from "./Body/Body";
import { accountService } from "./Services/accountService";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    accountService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="main">
        <Header />
        {currentUser ? (
          <Body />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
