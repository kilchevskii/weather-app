// import { sortName } from '../../components/Helpers/helpers';
import { CHOOSE_CITY } from "../actions/actionTypes";

const initialState = {
  cities: [],
  error: null,
  loading: true,
};

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
