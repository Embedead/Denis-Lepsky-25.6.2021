import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";

interface IProps {
  darkTheme: boolean;
  date: string;
  weatherDetails: {
    Temperature: {
      max: string | number;
      min: string | number;
    };
  };
}

const Tile = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: nowrap;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    margin: 0.5rem 0;
    flex-wrap: wrap;
  }
  background-color: ${(props) =>
    props.darkTheme ? "#202020" : theme.colors.white};
  transition: all 0.5s linear;
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  padding: 1rem;
  box-shadow: ${(props) =>
    props.darkTheme ? "null" : "0px 2px 4px 4px rgba(0, 0, 0, 0.05)"};
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

export const WeatherTile = ({ weatherDetails, darkTheme, date }: IProps) => {
  return (
    <Tile darkTheme={darkTheme}>
      <TileRow>
        <label>{date}</label>
      </TileRow>
      <TileRow>
        <label>
          {weatherDetails.Temperature.max}° / {weatherDetails.Temperature.min}°
        </label>
      </TileRow>
    </Tile>
  );
};
