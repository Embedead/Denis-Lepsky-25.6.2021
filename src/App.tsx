import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { FavoritesPage } from "./pages/Favorites";
import styled from "styled-components";
import { WeatherHeader } from "./components/header";

const AppContainer = styled.div`
  position: absolute;
  background-color: #f2c760;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <WeatherHeader />

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/favorites">
            <FavoritesPage />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
