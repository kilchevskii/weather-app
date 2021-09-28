import { CHOOSE_CITY } from '../actions/actionTypes';

export const chooseCity = (data) => {
    return {
      type: CHOOSE_CITY,
      payload: data,
    };
  };