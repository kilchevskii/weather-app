import { GET_WEATHER, DELETE_CARD_WEATHER, REQUEST_WEATHER, UPDATE_CARD_WEATHER } from '../actions/actionTypes';


export const getWeather = (data) => {
  return {
    type: GET_WEATHER,
    payload: data,
  };
};

export const getWeatherRequest = (data) => {
  return {
    type: REQUEST_WEATHER,
    payload: data,
  };
};


export const deleteCardWeather = (name) => {
  return {
    type: DELETE_CARD_WEATHER,
    payload: name,
  };
}

export const updateCardWeather = (data) => {
  return {
    type: UPDATE_CARD_WEATHER,
    payload: data,
  }
}