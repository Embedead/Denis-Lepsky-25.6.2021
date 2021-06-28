import React from "react";
import { useStore } from "../stores/userStore";

export const useFavorites = () => {
  const { favorites, setFavorites } = useStore();
  const changeFavoriteStatus = (locationKey: string) => {
    let tempFavorites: any[] = [...favorites];
    let favoriteIndex = tempFavorites.indexOf(locationKey);
    if (favoriteIndex === -1) {
      tempFavorites.push(locationKey);
    } else {
      tempFavorites = tempFavorites.filter((key) => key !== locationKey);
    }
    setFavorites(tempFavorites);
  };

  const checkKeyStatus = (locationKey: string) => {
    return favorites.includes(locationKey);
  };

  return {
    changeFavoriteStatus,
    checkKeyStatus,
  };
};
