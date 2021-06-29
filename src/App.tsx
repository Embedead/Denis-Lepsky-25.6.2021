import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { FavoritesPage } from "./pages/Favorites";
import styled from "styled-components";
import { WeatherHeader } from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WeatherFooter } from "./components/footer";
import { useSelector } from "react-redux";

const AppContainer = styled.div<IDarkTheme>`
  position: absolute;
  transition: all 0.5s linear;
  background-color: ${(props) => (props.darkTheme ? "#0C3853" : "#f2c760")};
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

function App() {
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
  return (
    <AppContainer darkTheme={darkTheme}>
      <ToastContainer autoClose={1500} pauseOnFocusLoss={false} />
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
        <WeatherFooter />
      </Router>
    </AppContainer>
  );
}

export default App;
