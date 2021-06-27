import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import axios from "axios";
import { LocationTitle } from "./LocationTitle";
import { Loader } from "../misc/Loader";
import { useStore } from "../../stores/userStore";
interface IProps {
  locationKey: string;
  metric: boolean;
}

interface IWeather {
  weatherText: string;
  Temperature: {
    Imperial: string;
    Metric: string;
  };
}

const defaultWeather = {
  weatherText: "null",
  Temperature: {
    Imperial: "null",
    Metric: "null",
  },
};

interface ICurrentWeatherContainer {
  darkTheme: boolean;
}

const CurrentWeatherContainer = styled.div<ICurrentWeatherContainer>`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  @media only screen and (max-width: 600px) {
    margin-top: 0.5rem;
    flex-grow: 1;
  }
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.5s linear;
  label {
    font-weight: 500;
    font-size: 2rem;
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
  }
`;

export const CurrentWeather = ({ locationKey, metric }: IProps) => {
  const { darkTheme } = useStore();
  console.log("location key is", locationKey);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentWeather, setCurrentWeather] =
    React.useState<IWeather>(defaultWeather);

  React.useMemo(() => {
    setIsLoading(true);
    axios
      .get(
        "https://dataservice.accuweather.com/currentconditions/v1/" +
          locationKey +
          "?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&language=en-us&details=false"
      )
      .then((res) => {
        let weather = {
          weatherText: res.data[0].WeatherText,
          Temperature: {
            Imperial: res.data[0].Temperature.Imperial.Value,
            Metric: res.data[0].Temperature.Metric.Value,
          },
        };
        setCurrentWeather(weather);
      })
      .catch((err) => {
        if (err.toString().includes("Network Error"))
          console.log("error is", err);
        setCurrentWeather(defaultWeather);
      });
    setIsLoading(false);
  }, [locationKey]);

  return (
    <CurrentWeatherContainer darkTheme={darkTheme}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <label>{currentWeather.weatherText}</label>
          {!metric ? (
            <label>{currentWeather.Temperature.Imperial}°</label>
          ) : (
            <label>{currentWeather.Temperature.Metric}°</label>
          )}
          <LocationTitle locationKey={locationKey} />
        </>
      )}
    </CurrentWeatherContainer>
  );
};
