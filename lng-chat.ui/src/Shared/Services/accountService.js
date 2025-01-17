import { api } from "./apiService";
var jwt = require("jsonwebtoken");

export const accountService = {
  loginWithGoogle,
  logout,
  get userId() {
    var token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token is missing.");
    }

    let decodedUserId = jwt.decode(token)[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

    return decodedUserId ? parseInt(decodedUserId) : null;
  },
  get accessToken() {
    var token = localStorage.getItem("accessToken");
    if (!token) {
      return null;
    }

    var tokenExp = jwt.decode(token).exp;
    if (Date.now() >= tokenExp * 1000) {
      localStorage.removeItem("accessToken");
      return null;
    }

    return token;
  },
};

function loginWithGoogle(token) {
  return api
    .getAsync("auth", { token }, { "Token-Provider": "Google" }, true)
    .then((response) => {
      return response.json().then((authData) => {
        authData.isNew = response.status === 201;
        return authData;
      });
    })
    .then((authData) => {
      if (authData) {
        localStorage.setItem("accessToken", authData.accessToken);
        return authData;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function logout() {
  // remove the access token from local storage to log user out
  localStorage.removeItem("accessToken");
}
