import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { WeatherTile } from "./WeatherTile";
import { useStore } from "../../stores/userStore";
import { useToast } from "../../hooks/useToast";
import { IDarkTheme } from "../misc/interfaces";
import { get5DayForecast } from "../../api/constants";

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

const defaultForecast = [
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
    Temperature: {
      max: "N/A",
      min: "N/A",
    },
  },
  {
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
  const { handleNewToast } = useToast();
  const [forecast, setForeacast] = React.useState<IForecast[]>(defaultForecast);
  const [currentKey, setCurrentKey] = React.useState("");
  const [currentMetric, setCurrentMetric] = React.useState<any>();
  React.useEffect(() => {
    if (currentKey === locationKey && currentMetric === metric) {
      console.log("same");
    } else {
      get5DayForecast(locationKey, booleanToString(metric))
        .then((res) => {
          console.log("res data", res.data);
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
