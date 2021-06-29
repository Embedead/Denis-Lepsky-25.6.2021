import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";
import * as actionTypes from "./actionTypes";

const initialState: IUserStore = {
  locationID: "",
  favorites: [],
  metric: true,
  darkTheme: false,
};

const reducer = (
  state: IUserStore = initialState,
  action: UserAction
): IUserStore => {
  switch (action.type) {
    case actionTypes.SET_LOCATIONID:
      return {
        ...state,
        locationID: action.newLocationID,
      };
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: action.newFavorites,
      };
    case actionTypes.SET_METRIC:
      return {
        ...state,
        metric: action.metric,
      };
    case actionTypes.SET_DARKTHEME:
      return {
        ...state,
        darkTheme: action.darkTheme,
      };

    default:
      return state;
  }
};

export default reducer;
