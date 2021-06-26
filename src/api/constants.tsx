import axios from "axios";
import { BASE_URL, api_key } from "./apiWorker";

export const getSearchResults = (data: string) => {
  return axios.get(
    BASE_URL + "autocomplete?" + api_key + "q=" + data + "&language=en-us"
  );
};

const defaultWeather = {
  weatherText: "null",
  Temperature: {
    Imperial: "null",
    Metric: "null",
  },
};

export const getWeatherByLocationId = (locationKey: string) => {
  let currentWeather = defaultWeather;
  axios
    .get(
      BASE_URL +
        "currentconditions/v1/" +
        locationKey +
        api_key +
        "&language=en-us&details=false"
    )
    .then((res) => {
      currentWeather = {
        weatherText: res.data[0].WeatherText,
        Temperature: {
          Imperial: res.data[0].Temperature.Imperial.Value,
          Metric: res.data[0].Temperature.Metric.Value,
        },
      };
    });
  return currentWeather;
};
