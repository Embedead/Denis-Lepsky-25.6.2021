import React from "react";
import styled from "styled-components";
import { useStore } from "../stores/userStore";

export const FavoritesPage = () => {
  const { favorites } = useStore();
  return (
    <div>
      {favorites.map((item, index) => {
        return <label key={index}>{item}</label>;
      })}
    </div>
  );
};
