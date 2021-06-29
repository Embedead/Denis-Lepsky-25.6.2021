import * as actionTypes from "./actionTypes";

export function setLocationID(newLocationID: string) {
  const action: UserAction = {
    type: actionTypes.SET_LOCATIONID,
    newLocationID,
    //garbage for action type to no recieve undefined
    newFavorites: [],
    metric: false,
    darkTheme: false,
  };
  return action;
}

export function setFavorites(newFavorites: any[]) {
  const action: UserAction = {
    type: actionTypes.SET_FAVORITES,
    newFavorites,
    //garbage for action type to no recieve undefined
    newLocationID: "",
    metric: false,
    darkTheme: false,
  };
  return action;
}

export function setMetric(metric: boolean) {
  const action: UserAction = {
    type: actionTypes.SET_METRIC,
    metric,
    //garbage for action type to no recieve undefined
    newLocationID: "",
    newFavorites: [] as any,
    darkTheme: false,
  };
  return action;
}

export function setDarkTheme(darkTheme: boolean) {
  const action: UserAction = {
    type: actionTypes.SET_DARKTHEME,
    darkTheme,
    //garbage for action type to no recieve undefined
    newLocationID: "",
    newFavorites: [],
    metric: false,
  };
  return action;
}
