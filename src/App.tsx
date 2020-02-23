import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://dashboard.cypress.io/projects/nkhmz8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check the cypress dashboard
        </a>
      </header>
    </div>
  );
}

export default App;
