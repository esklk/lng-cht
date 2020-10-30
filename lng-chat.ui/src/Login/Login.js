import React from "react";
import GoogleLogin from "react-google-login";
import { accountService } from "../Services/accountService";
import "./Login.css";

export default function Login({onAuthenticated}) {

  const responseGoogle = (response) => {
    if (response && response.tokenId) {
      accountService
        .authenticate(response.tokenId).then(authData => {
          if(authData && onAuthenticated){
            onAuthenticated(authData);
          }
        });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <p>Sign In</p>
        <GoogleLogin
          clientId="422555402284-vjak2h10lk8m4vshjq8e5fk31tt1dulr.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}
