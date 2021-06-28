import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { FavoritesPage } from "./pages/Favorites";
import styled from "styled-components";
import { WeatherHeader } from "./components/header";
import { Search } from "./components/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
  position: absolute;
  background-color: #f2c760;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

function App() {
  return (
    <AppContainer>
      <ToastContainer />
      <Router>
        <WeatherHeader />

        <Switch>
          <Route exact path="/">
            {/* <Search /> */}
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
