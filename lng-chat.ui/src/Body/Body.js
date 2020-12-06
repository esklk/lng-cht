import React, { useState } from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import PrivateRoute from "../Shared/PrivateRoute";
import FindUser from "./FindUser/FindUser";
import Chat from "./Chat/Chat";
import Settings from "./Settings/Settings";
import { useI18n } from "../Shared/i18nContext";
import "./Body.css";
import { useChat } from "../Shared/ChatContext";
import { IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export default function Body({ isUserNew }) {
  const history = createBrowserHistory();
  if (window.location.pathname === "/") {
    history.push(isUserNew ? "/settings" : "/chat");
  }

  const i18n = useI18n();

  const [notificationText, setNotificationText] = useState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationText(null);
  };

  useChat((message) => {
    console.log(message);
    let notificationSetting = localStorage.getItem("notificationsEnabled");
    if (!notificationSetting || !JSON.parse(notificationSetting)) {
      return;
    }
    let notificationText = message.isImage
      ? i18n.picture
      : message.isVoice
      ? i18n.voiceMessage
      : message.content;

    if ("Notification" in window) {
      new Notification(i18n.newMessage, {
        tag: "ache-mail",
        body: notificationText,
        icon: "/logo512.png",
      });
    }

    setNotificationText(notificationText);
  });

  return (
    <div className="body">
      <div className="wrapper">
        <Router history={history}>
          <div className="navbar">
            <NavbarItem
              id="nav-find"
              name={i18n.find}
              iconName="search"
              path="/find"
            />
            <NavbarItem
              id="nav-chat"
              name={i18n.chat}
              iconName="chat"
              path="/chat"
            />
            <NavbarItem
              id="nav-settings"
              name={i18n.settings}
              iconName="tune"
              path="/settings"
            />
          </div>
          <div className="content">
            <Switch>
              <PrivateRoute
                exact
                path="/find"
                component={FindUser}
              ></PrivateRoute>
              <PrivateRoute exact path="/chat" component={Chat}></PrivateRoute>
              <PrivateRoute
                exact
                path="/settings"
                component={Settings}
              ></PrivateRoute>
            </Switch>
          </div>
        </Router>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={notificationText}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notificationText}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
