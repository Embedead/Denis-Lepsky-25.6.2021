import React from "react";
import styled, { keyframes } from "styled-components";
import WeatherLogo from "../../images/WeatherLogo.png";
import { useHistory } from "react-router-dom";
import { theme } from "../../theme";
import { MdHome, MdFavorite } from "react-icons/md";
import { useStore } from "../../stores/userStore";
import { IDarkTheme } from "../misc/interfaces";

const expand = keyframes`
  from{
    transform:scaleX(0);
    opacity:0;
  }
  to{
    transform: scaleX(1);
    opacity:1;
  }
`;

const HeaderContainer = styled.div<IDarkTheme>`
  animation: ${expand} 0.4s linear;
  margin: 0.5rem 1rem;
  padding: 0 0.5rem;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};
  border-radius: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.5s linear;
`;

const LogoSpan = styled.div<IDarkTheme>`
  display: flex;
  margin: 0.25rem;
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};

  img {
    width: 2.25rem;
    height: 2.25rem;
  }
  label {
    margin: auto 0.5rem;
    font-size: 1.5rem;
    @media only screen and (max-width: 600px) {
      font-size: 0;
    }
    font-weight: 500;
    padding: 0 0.25rem;
    &:hover {
      color: ${theme.colors.main};
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
`;

const LinksSpan = styled.span`
  display: flex;
  align-items: center;
  label {
    cursor: pointer;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0 0.25rem;
    padding: 0 0.25rem;
    /* justify-self: center; */
    align-self: center;
    &:hover {
      color: ${theme.colors.main};
    }
  }
`;

const IconContainer = styled.span`
  display: flex;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0 0.25rem;
  padding: 0 0.25rem;
  align-self: center;
  &:hover {
    color: ${theme.colors.main};
  }
`;

export const WeatherHeader = () => {
  const { metric, setMetric, darkTheme, setDarkTheme } = useStore();
  const history = useHistory();
  const handleLogoClick = () => {
    window.location.assign("/");
  };

  const handleHistoryPush = (urlSuffix: string) => {
    history.push(urlSuffix);
  };

  return (
    <HeaderContainer darkTheme={darkTheme}>
      <LogoSpan darkTheme={darkTheme} onClick={handleLogoClick}>
        <img src={WeatherLogo} alt="weather-logo" />
        <label>WeatherApp</label>
      </LogoSpan>
      <LinksSpan>
        <label onClick={() => setDarkTheme(!darkTheme)}>
          {darkTheme ? "dark" : "light"}
        </label>
        <label onClick={() => setMetric(!metric)}>{metric ? "C°" : "F°"}</label>
        <IconContainer onClick={() => handleHistoryPush("/")}>
          <MdHome />
        </IconContainer>
        <IconContainer onClick={() => handleHistoryPush("/favorites")}>
          <MdFavorite />
        </IconContainer>
      </LinksSpan>
    </HeaderContainer>
  );
};
