import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { WeatherTile } from "./WeatherTile";
import { useToast } from "../../hooks/useToast";
import { get5DayForecast } from "../../api/basicAPI";
import { giveDayOfWeek, defaultForecast } from "../misc/lut";
import { useSelector } from "react-redux";
const DaysAheadContainer = styled.div<IDarkTheme>`
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
  /* padding: 1rem; */
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.5s linear;
  label {
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
    font-weight: 500;
    font-size: 2rem;
  }
`;

interface IProps {
  locationKey: string;
  metric: boolean;
}

type IForecast = {
  Temperature: {
    max: number | string;
    min: number | string;
  };
};

const booleanToString = (expression: boolean) => {
  if (expression) return "true";
  return "false";
};

export const DaysAheadForCast = ({ locationKey, metric }: IProps) => {
  const today = new Date().getDay();
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
  const { handleNewToast } = useToast();
  const [forecast, setForeacast] = React.useState<IForecast[]>(defaultForecast);
  const [currentKey, setCurrentKey] = React.useState("");
  const [currentMetric, setCurrentMetric] = React.useState<any>();
  React.useEffect(() => {
    if (currentKey === locationKey && currentMetric === metric) {
    } else {
      get5DayForecast(locationKey, booleanToString(metric))
        .then((res) => {
          let parsedForecast = res.data.DailyForecasts.map((item: any) => {
            let newWeather = {
              Temperature: {
                max: item.Temperature.Maximum.Value,
                min: item.Temperature.Minimum.Value,
              },
            };
            return newWeather;
          });

          setForeacast(parsedForecast);
        })
        .catch((err) => {
          handleNewToast("couldn't load 5 day forecast, network error");
        });
      setCurrentKey(locationKey);
      setCurrentMetric(metric);
    }
  }, [locationKey, metric]);

  return (
    <DaysAheadContainer darkTheme={darkTheme}>
      {forecast.map((item, index) => {
        return (
          <WeatherTile
            date={giveDayOfWeek(today + index + 1)}
            key={"unique" + index}
            weatherDetails={item}
            darkTheme={darkTheme}
          />
        );
      })}
    </DaysAheadContainer>
  );
};
