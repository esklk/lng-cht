import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Body from "./Body/Body";
import { accountService } from "./Shared/Services/accountService";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import i18nContext from "./Shared/i18nContext";
import { i18n } from "./Shared/Services/i18nService";
import { ChatProvider } from "./Shared/ChatContext";

const theme = createMuiTheme({
  palette: {
    type: localStorage.getItem("theme"),
    primary: {
      main: "#ca3e47",
    },
  },
});

const resources = new i18n(localStorage.getItem("lang"));

export default function App() {
  const [authData, setAuthData] = React.useState({
    accessToken: accountService.accessToken,
    isNew: false,
  });

  const onAuthenticated = (data) => {
    if (data) {
      setAuthData(data);
    }
  };

  return (
    <i18nContext.Provider value={resources}>
      <ThemeProvider theme={theme}>
        <div className="main">
          <Header />
          {authData.accessToken ? (
            <ChatProvider accessToken={authData.accessToken}>
              <Body isNewUser={authData.isNew} />
            </ChatProvider>
          ) : (
            <Login onAuthenticated={onAuthenticated} />
          )}
        </div>
      </ThemeProvider>
    </i18nContext.Provider>
  );
}
