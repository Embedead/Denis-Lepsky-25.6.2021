import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { IDarkTheme } from "../misc/interfaces";

interface IProps {
  darkTheme: boolean;
  weatherDetails: {
    weatherText: string;
    Temperature: {
      max: string;
      min: string;
    };
  };
}

const Tile = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 10;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    margin: 0.5rem 0;
    flex-wrap: wrap;
  }
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  transition: all 0.5s linear;
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  padding: 1rem;
  box-shadow: ${(props) =>
    props.darkTheme
      ? "0px 2px 4px 4px rgba(255, 255, 255, 0.15)"
      : "0px 2px 4px 4px rgba(0, 0, 0, 0.05)"};
  label {
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
    font-weight: 500;
    font-size: 2rem;
  }
`;

const TileRow = styled.span`
  display: flex;
  width: 100%;
`;

export const WeatherTile = ({ weatherDetails, darkTheme }: IProps) => {
  return (
    <Tile darkTheme={darkTheme}>
      <TileRow>
        <label>Day</label>
      </TileRow>
      <TileRow>
        <label>{weatherDetails.weatherText}</label>
      </TileRow>
      <TileRow>
        <label>
          {weatherDetails.Temperature.max}° / {weatherDetails.Temperature.min}°
        </label>
      </TileRow>
    </Tile>
  );
};
