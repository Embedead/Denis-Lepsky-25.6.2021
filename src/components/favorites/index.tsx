import React from "react";
import styled from "styled-components";
import { IDarkTheme } from "../misc/interfaces";
import { theme, flowUP } from "../../theme";
import { useStore } from "../../stores/userStore";
import { CurrentWeather } from "../currentWeather/";

const FavoritesContainer = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear 250ms forwards;
  opacity: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 0.5rem 1rem;
  }
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.5s linear;
  label {
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
    font-weight: 500;
    font-size: 2rem;
  }
`;

const FavoriteTile = styled.span`
  flex-shrink: 1;
  padding: 0.5rem;
  @media only screen and (max-width: 600px) {
    flex-shrink: 0;
    padding: 0;
  }
`;

export const Favorites = () => {
  const { darkTheme, favorites, metric } = useStore();

  return (
    <>
      {favorites.length > 0 ? (
        <FavoritesContainer darkTheme={darkTheme}>
          {favorites.map((item, index) => {
            return (
              <FavoriteTile>
                <CurrentWeather
                  key={index}
                  locationKey={item}
                  metric={metric}
                />
              </FavoriteTile>
            );
          })}
        </FavoritesContainer>
      ) : (
        <></>
      )}
    </>
  );
};
