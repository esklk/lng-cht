import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute";
import FindUser from "../FindUser/FindUser";
import ChatList from "../ChatList/ChatList";
import Settings from "../Settings/Settings";
import { useI18n } from "../Components/i18nContext";
import "./Body.css";

export default function Body({ isUserNew }) {
  const history = createBrowserHistory();
  history.push(isUserNew ? "/settings" : "/chat");

  const i18n = useI18n();

  return (
    <div className="body">
      <div className="wrapper">
        <Router history={history}>
          <div className="navbar">
            <NavbarItem name={i18n.find} path="/find" />
            <NavbarItem name={i18n.chat} path="/chat" />
            <NavbarItem name={i18n.settings} path="/settings" />
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
