import axios from "axios";
// import { BASE_URL, api_key } from "./apiWorker";

const BASE_URL = "https://dataservice.accuweather.com";
const api_key = "jlTotreoBf71iErBfZuafN0GwopmAsG5";
export const getSearchResults = (data: string) => {
  return axios.get(
    BASE_URL +
      "/locations/v1/cities/autocomplete?apikey=" +
      api_key +
      "&q=" +
      data +
      "&language=en-us"
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
  return axios.get(
    BASE_URL +
      "/currentconditions/v1/" +
      locationKey +
      "?apikey=" +
      api_key +
      "&language=en-us&details=false"
  );
};

export const getLocationNameByKey = (locationKey: string) => {
  return axios.get(
    BASE_URL +
      "/locations/v1/" +
      locationKey +
      "?apikey=" +
      api_key +
      "&language=en-us&details=false"
  );
};

export const getLocationKeyByCord = (coordinates: string) => {
  return axios.get(
    BASE_URL +
      "/locations/v1/cities/geoposition/search?apikey=" +
      api_key +
      "&q=" +
      coordinates +
      "&language=en-us&details=false&toplevel=false"
  );
};

export const get5DayForecast = (locationKey: string, metric: string) => {
  return axios.get(
    BASE_URL +
      "/forecasts/v1/daily/5day/" +
      locationKey +
      "?apikey=" +
      api_key +
      "&language=en-us&details=false&metric=" +
      metric
  );
};
