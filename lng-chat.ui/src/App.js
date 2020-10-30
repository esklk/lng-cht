import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Body from "./Body/Body";
import { accountService } from "./Services/accountService";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: localStorage.getItem("theme"),
    primary: {
      main: "#ca3e47",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <div className="main">
        <Header />
        {authData.accessToken ? (
          <Body isNewUser={authData.isNew} />
        ) : (
          <Login onAuthenticated={onAuthenticated} />
        )}
      </div>
    </ThemeProvider>
  );
}
