import React from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../store/actionCreators";

export const useFavorites = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const favorites = useSelector((state: IUserStore) => state.favorites);
  const changeFavoriteStatus = (locationKey: string) => {
    let tempFavorites: any[] = [...favorites];
    let favoriteIndex = tempFavorites.indexOf(locationKey);
    if (favoriteIndex === -1) {
      tempFavorites.push(locationKey);
    } else {
      tempFavorites = tempFavorites.filter((key) => key !== locationKey);
    }
    dispatch(setFavorites(tempFavorites));
  };

  const checkKeyStatus = (locationKey: string) => {
    return favorites.includes(locationKey);
  };

  return {
    changeFavoriteStatus,
    checkKeyStatus,
  };
};
