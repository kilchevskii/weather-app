import {
  GET_WEATHER,
  DELETE_CARD_WEATHER,
  REQUEST_WEATHER,
  UPDATE_CARD_WEATHER,
} from "../actions/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: true,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case REQUEST_WEATHER:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_CARD_WEATHER:
      const name = action.payload;
      return {
        ...state,
        data: state.data.filter((item) => item.data.name !== name),
        error: null,
        loading: true,
      };
    case UPDATE_CARD_WEATHER:
      return {
        ...state,
        data: state.data.map(
          (item) => {
            return item.data.name === action.payload.data.name ? action.payload : item;
          }
        ),
        error: null,
        loading: true,
      };
    default:
      return state;
  }
}
