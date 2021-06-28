import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { WeatherTile } from "./WeatherTile";
import axios from "axios";
import { useStore } from "../../stores/userStore";
import { IDarkTheme } from "../misc/interfaces";

const DaysAheadContainer = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear 250ms forwards;
  opacity: 0;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
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
  weatherText: string;
  Temperature: {
    max: number | string;
    min: number | string;
  };
};

const defaultForecast = [
  {
    weatherText: "N/A",
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    weatherText: "N/A",
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    weatherText: "N/A",
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    weatherText: "N/A",
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    weatherText: "N/A",
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
];

const booleanToString = (expression: boolean) => {
  if (expression) return "true";
  return "false";
};

const dayPraser = (day: number) => {
  let dayOfWeek = day % 7;
  switch (dayOfWeek) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "N/A";
  }
};

export const DaysAheadForCast = ({ locationKey, metric }: IProps) => {
  let today = new Date().getDay();
  const { darkTheme } = useStore();
  const [forecast, setForeacast] = React.useState<IForecast[]>(defaultForecast);
  const [currentKey, setCurrentKey] = React.useState("");
  const [currentMetric, setCurrentMetric] = React.useState<any>();
  React.useMemo(() => {
    if (currentKey === locationKey && currentMetric === metric) {
      console.log("same");
    } else {
      axios
        .get(
          "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
            locationKey +
            "?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&language=en-us&details=false&metric=" +
            booleanToString(metric)
        )
        .then((res) => {
          let parsedForecast = res.data.DailyForecasts.map((item: any) => {
            let newWeather = {
              weatherText: item.weatherText,
              Temperature: {
                max: item.Temperature.max,
                min: item.Temperature.min,
              },
            };
            return newWeather;
          });

          setForeacast(parsedForecast);
        })
        .catch((err) => {
          console.log("5 day forecast", err);
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
            date={dayPraser(today + index + 1)}
            key={"unique" + index}
            weatherDetails={item}
            darkTheme={darkTheme}
          />
        );
      })}
    </DaysAheadContainer>
  );
};
