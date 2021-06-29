import React from "react";
import styled from "styled-components";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { theme } from "../../theme";
import { useFavorites } from "../../hooks/useFavorites";
import { useSelector } from "react-redux";

interface IProps {
  locationKey: string;
}

const FavoriteLabel = styled.label<IDarkTheme>`
  font-size: 1.5rem;
  align-self: flex-end;
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.main};
  }
`;

export const Favorite = ({ locationKey }: IProps) => {
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
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
