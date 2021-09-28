import {
  getWeather,
  deleteCardWeather,
  getWeatherRequest,
  updateCardWeather,
} from "../actions/weatherActions";
import { API_KEY } from "../../api/api";
import axios from "axios";
export const renderWeather = () => {
  const itemsWeather = [];
  let parseItemsWeather = [];
  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    itemsWeather.push(localStorage.getItem(key));
    parseItemsWeather = itemsWeather.map((item) => JSON.parse(item));
  }
  return (dispatch) => {
    dispatch(getWeather(parseItemsWeather));
  };
};

export const weatherRequest = (value) => {
  return (dispatch) => {
    localStorage.setItem(value.data?.name, JSON.stringify(value));
    dispatch(getWeatherRequest(value));
  };
};

export const deleteWeather = (name) => {
  return (dispatch) => {
    localStorage.removeItem(name);
    dispatch(deleteCardWeather(name));
  };
};

export const updateWeather = (name) => {
  return (dispatch) => {
    localStorage.removeItem(name);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`
      )
      .then((res) => dispatch(updateCardWeather(res)))
      .then((res) => localStorage.setItem(name, JSON.stringify(res.payload)));
  };
};
