import React from "react";
import styled from "styled-components";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useStore } from "../../stores/userStore";
import { IDarkTheme } from "../misc/interfaces";
import { theme } from "../../theme";
import { useFavorites } from "../../hooks/useFavorites";

interface IProps {
  locationKey: string;
}

const FavoriteLabel = styled.label<IDarkTheme>`
  font-size: 1.5rem;
  align-self: flex-end;
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};
`;

export const Favorite = ({ locationKey }: IProps) => {
  const { darkTheme } = useStore();
  const { checkKeyStatus, changeFavoriteStatus } = useFavorites();
  return (
    <FavoriteLabel darkTheme={darkTheme}>
      {checkKeyStatus(locationKey) ? (
        <MdFavorite onClick={() => changeFavoriteStatus(locationKey)} />
      ) : (
        <MdFavoriteBorder onClick={() => changeFavoriteStatus(locationKey)} />
      )}
    </FavoriteLabel>
  );
};
