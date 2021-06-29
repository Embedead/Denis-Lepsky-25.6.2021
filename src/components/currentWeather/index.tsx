import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { LocationTitle } from "./LocationTitle";
import { Favorite } from "./Favorite";
import { Loader } from "../misc/Loader";
import { useToast } from "../../hooks/useToast";
import { getWeatherByLocationId } from "../../api/basicAPI";
import { useSelector } from "react-redux";
interface IProps {
  locationKey: string;
  metric: boolean;
  enableShadow: boolean;
}

interface ICurrentContainer extends IDarkTheme {
  enableShadow: boolean;
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

const CurrentWeatherContainer = styled.div<ICurrentContainer>`
  animation: ${flowUP} 0.5s linear;
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  @media only screen and (max-width: 600px) {
    flex-grow: 1;
  }
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: ${(props) =>
    props.enableShadow
      ? "0px 2px 4px 4px rgba(0, 0, 0, 0.05)"
      : "0 0 0 0 rgba(0,0,0,0)"};
  transition: all 0.5s linear;
  label {
    font-weight: 500;
    font-size: 2rem;
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
  }
`;

export const CurrentWeather = ({
  locationKey,
  metric,
  enableShadow,
}: IProps) => {
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
  const { handleNewToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentWeather, setCurrentWeather] =
    React.useState<IWeather>(defaultWeather);

  React.useEffect(() => {
    setIsLoading(true);

    getWeatherByLocationId(locationKey)
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
        if (err.toString().includes("Network Error")) {
          handleNewToast("couldn't get current weather, network error");
          setCurrentWeather(defaultWeather);
        }
      });
    setIsLoading(false);
  }, [locationKey]);

  return (
    <CurrentWeatherContainer darkTheme={darkTheme} enableShadow={enableShadow}>
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
          <Favorite locationKey={locationKey} />
          <LocationTitle locationKey={locationKey} />
        </>
      )}
    </CurrentWeatherContainer>
  );
};
