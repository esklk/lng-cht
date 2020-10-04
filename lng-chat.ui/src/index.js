import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

var lang = localStorage.getItem("lang");
if (!lang) {
  lang = navigator.language.substring(0, 2);
  localStorage.setItem("lang", lang);
}
//TODO: apply language

var theme = localStorage.getItem("theme");
if (!theme) {
  theme = "light";
  localStorage.setItem("theme", theme);
}
document.lastChild.className = theme;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
