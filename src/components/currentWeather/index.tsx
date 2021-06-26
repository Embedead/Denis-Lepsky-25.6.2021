import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import axios from "axios";
import { LocationTitle } from "./LocationTitle";

interface IProps {
  locationKey: string;
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

const CurrentWeatherContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
`;

export const CurrentWeather = ({ locationKey }: IProps) => {
  const [currentWeather, setCurrentWeather] =
    React.useState<IWeather>(defaultWeather);
  //   const [currentLocationName, setCurrentLocationName] = React.useState("");
  const [units, setUnits] = React.useState("metric");

  React.useMemo(() => {
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
      });
  }, [locationKey]);

  return (
    <CurrentWeatherContainer>
      <LocationTitle locationKey={locationKey} />
      {currentWeather.weatherText}
      {currentWeather.Temperature.Imperial}
      {currentWeather.Temperature.Metric}
    </CurrentWeatherContainer>
  );
};
