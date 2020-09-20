import React from "react";
import Login from "./Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const onLoggedIn = (result) => {
  console.log(result ? "Success!" : "Fail!");
};

function App() {
  return (
    <div className="wrapper d-flex justify-content-center align-content-center">
      <Login onLoggedIn={onLoggedIn} />
    </div>
  );
}

export default App;
