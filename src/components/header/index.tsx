import React from "react";
import styled, { ThemeContext } from "styled-components";
import WeatherLogo from "../../images/WeatherLogo.png";
import { useHistory } from "react-router-dom";
import { theme } from "../../theme";
const HeaderContainer = styled.div`
  margin: 0.5rem 1rem;
  padding: 0 0.5rem;
  background-color: ${theme.colors.white};
  border-radius: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.05);
  /* height: 2rem; */
`;

const LogoSpan = styled.div`
  display: flex;
  margin: 0.25rem;
  color: ${theme.colors.black};

  img {
    width: 2.25rem;
    height: 2.25rem;
  }
  label {
    margin: auto 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0 0.25rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
`;

const LinksSpan = styled.span`
  display: flex;

  label {
    cursor: pointer;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0 0.25rem;
    padding: 0 0.25rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
    }
  }
`;

export const WeatherHeader = () => {
  const history = useHistory();
  const handleLogoClick = () => {
    console.log("clicked");
    window.location.assign("/");
  };

  const handleHistoryPush = (urlSuffix: string) => {
    history.push(urlSuffix);
  };

  return (
    <HeaderContainer>
      <LogoSpan onClick={handleLogoClick}>
        <img src={WeatherLogo} alt="weather-logo" />
        <label>WeatherApp</label>
      </LogoSpan>
      <LinksSpan>
        <label onClick={() => handleHistoryPush("/")}>Homepage</label>
        <label onClick={() => handleHistoryPush("/favorites")}>Favorites</label>
      </LinksSpan>
    </HeaderContainer>
  );
};
