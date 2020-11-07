import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import GoogleLogin from "react-google-login";
import { useI18n } from "../Shared/i18nContext";
import { accountService } from "../Shared/Services/accountService";
import "./Login.css";

export default function Login({ onAuthenticated }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const i18n = useI18n();

  const responseGoogle = (response) => {
    if (response && response.tokenId) {
      setIsLoading(true);
      accountService.authenticate(response.tokenId).then((authData) => {
        setIsLoading(false);
        if (!authData) {
          setErrorMessage(i18n.failedToSignIn);
        }
        if (authData && onAuthenticated) {
          onAuthenticated(authData);
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <p>{i18n.signIn}</p>
        <GoogleLogin
          clientId="422555402284-vjak2h10lk8m4vshjq8e5fk31tt1dulr.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {errorMessage ? (
          <>
            <br />
            <Alert severity="error">{errorMessage}.</Alert>
          </>
        ) : null}
        <Backdrop style={{ zIndex: 10, color: "#fff" }} open={isLoading}>
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
    </div>
  );
}
