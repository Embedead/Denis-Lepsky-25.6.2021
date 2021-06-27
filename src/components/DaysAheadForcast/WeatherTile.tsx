import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";

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

interface IDarkTheme {
  darkTheme: boolean;
}

const Tile = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  transition: all 0.5s linear;
  /* width: 10%; */
  border-radius: 1rem;
  margin: 0 1rem;
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

export const WeatherTile = ({ weatherDetails, darkTheme }: IProps) => {
  return (
    <Tile darkTheme={darkTheme}>
      <label>Day</label>
      <label>{weatherDetails.weatherText}</label>
      <label>{weatherDetails.Temperature.max}</label>
      <label>{weatherDetails.Temperature.min}</label>
    </Tile>
  );
};
