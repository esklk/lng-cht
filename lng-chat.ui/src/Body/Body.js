import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute";
import FindUser from "../FindUser/FindUser";
import ChatList from "../ChatList/ChatList";
import Settings from "../Settings/Settings";
import "./Body.css";

export default function Body() {
  return (
    <div className="body">
      <div className="wrapper">
        <Router history={createBrowserHistory()}>
          <div className="navbar">
            <NavbarItem name={"find"} path={"/find"} />
            <NavbarItem name={"chat"} path={"/chat"} />
            <NavbarItem name={"settings"} path={"/settings"} />
          </div>
          <div className="content">
            <Switch>
              <PrivateRoute
                exact
                path="/find"
                component={FindUser}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/chat"
                component={ChatList}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/settings"
                component={Settings}
              ></PrivateRoute>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}
