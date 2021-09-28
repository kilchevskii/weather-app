import { chooseCity } from "../actions/citiiesActions";

export const setCities = (data) => {
  return (dispatch) => {
    dispatch(chooseCity(data));
  };
};
