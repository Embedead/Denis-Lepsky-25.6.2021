import React from "react";
import axios from "axios";
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
export const useWeather = () => {
  const useCurrentWeather = (locationKey: string) => {
    const [currentWeather, setCurrentWeather] =
      React.useState<IWeather>(defaultWeather);
    React.useEffect(() => {
      axios
        .get(
          "https://dataservice.accuweather.com/currentconditions/v1/" +
            locationKey +
            "?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&language=en-us&details=false"
        )
        .then((res) => {
          setCurrentWeather({
            weatherText: res.data[0].WeatherText,
            Temperature: {
              Imperial: res.data[0].Temperature.Imperial.Value,
              Metric: res.data[0].Temperature.Metric.Value,
            },
          });
        });
    }, [locationKey]);
    return currentWeather;
  };

  return {
    useCurrentWeather,
  };
};
