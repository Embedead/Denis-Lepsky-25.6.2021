import React from "react";
import styled from "styled-components";
import { useStore } from "../../stores/userStore";
import { theme } from "../../theme";
import { IDarkTheme } from "../misc/interfaces";
import axios from "axios";
import { MdSearch } from "react-icons/md";

const SearchContainer = styled.div<IDarkTheme>`
  position: relative;
  display: flex;
  margin: 0 1rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  flex-grow: 1;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};
  @media only screen and (max-width: 600px) {
  }
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  input {
    flex-grow: 1;
    padding: 0.25rem;
    border: none;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0);
    &:focus {
      outline: none;
    }
  }
`;

export const Search = () => {
  const { darkTheme, setLocationID } = useStore();
  const [searchValue, setSearchValue] = React.useState("");
  React.useMemo(() => {
    axios
      .get(
        "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&q=" +
          searchValue +
          "&language=en-us"
      )
      .then((res) => {
        console.log("res data is", res.data);
      });
  }, [searchValue]);
  console.log("search value is", searchValue);
  return (
    <SearchContainer darkTheme={darkTheme}>
      <input
        type="text"
        placeholder="Search Cities..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <MdSearch />
    </SearchContainer>
  );
};
