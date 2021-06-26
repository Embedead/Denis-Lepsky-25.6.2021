import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/favorites">
          here be dragons
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
