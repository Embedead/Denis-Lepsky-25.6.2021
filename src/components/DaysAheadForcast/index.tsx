import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { WeatherTile } from "./WeatherTile";
import axios from "axios";
import { useStore } from "../../stores/userStore";

interface IDarkTheme {
  darkTheme: boolean;
}

const DaysAheadContainer = styled.div<IDarkTheme>`
  animation: ${flowUP} 0.5s linear 250ms forwards;
  opacity: 0;
  display: flex;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  /* width: 10%; */
  /* height: 5rem; */
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  padding: 1rem;
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

const daysAhead = [
  {
    weatherText: "sunny",
    Temperature: {
      max: "38",
      min: "24",
    },
  },
  {
    weatherText: "sunny",
    Temperature: {
      max: "36",
      min: "28",
    },
  },
  {
    weatherText: "sunny",
    Temperature: {
      max: "41",
      min: "27",
    },
  },
  {
    weatherText: "sunny",
    Temperature: {
      max: "31",
      min: "19",
    },
  },
  {
    weatherText: "sunny",
    Temperature: {
      max: "33",
      min: "29",
    },
  },
];

const booleanToString = (expression: boolean) => {
  if (expression) return "true";
  return "false";
};

export const DaysAheadForCast = ({ locationKey, metric }: IProps) => {
  const { darkTheme } = useStore();
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
          console.log("5 day forecast is", res.data);
        })
        .catch((err) => {
          console.log("err is", err);
        });
      setCurrentKey(locationKey);
      setCurrentMetric(metric);
    }
  }, [locationKey, metric]);

  return (
    <DaysAheadContainer darkTheme={darkTheme}>
      {daysAhead.map((item, index) => {
        return (
          <WeatherTile
            key={index}
            weatherDetails={item}
            darkTheme={darkTheme}
          />
        );
      })}
    </DaysAheadContainer>
  );
};
