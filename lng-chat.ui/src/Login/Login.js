import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import GoogleLogin from "react-google-login";
import { accountService } from "../Services/accountService";

const responseGoogle = (response, onLoggedIn) => {
  if (response && response.tokenId) {
    accountService
      .authenticate(response.tokenId)
      .then((accountInfo) => onLoggedIn(accountInfo));
  }
};

export default function Login({ onLoggedIn }) {
  return (
    <Jumbotron style={{ marginTop: "50px", height: "300px" }}>
      <GoogleLogin
        clientId="422555402284-vjak2h10lk8m4vshjq8e5fk31tt1dulr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response) => responseGoogle(response, onLoggedIn)}//TODO: bind callback in defferent way
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Jumbotron>
  );
}
