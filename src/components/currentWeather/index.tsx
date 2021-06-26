import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../theme";
import axios from "axios";
import { LocationTitle } from "./LocationTitle";
import { useWeather } from "../../hooks/useWeather";
import { Loader } from "../misc/Loader";
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

const flowUP = keyframes`
    from{
        opacity: 0;
        transform: translateY(20px);
    }

    to{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const CurrentWeatherContainer = styled.div`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  width: 10%;
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
  label {
    font-weight: 500;
    font-size: 2rem;
  }
`;

export const CurrentWeather = ({ locationKey }: IProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentWeather, setCurrentWeather] =
    React.useState<IWeather>(defaultWeather);
  //   const [currentLocationName, setCurrentLocationName] = React.useState("");
  const [units, setUnits] = React.useState("metric");
  const { useCurrentWeather } = useWeather();

  useCurrentWeather(locationKey);

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
        setIsLoading(false);
      });
  }, [locationKey]);

  return (
    <CurrentWeatherContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <label>{currentWeather.weatherText}</label>
          {units === "Imperial" ? (
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
