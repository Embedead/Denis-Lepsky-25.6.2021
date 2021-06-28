import React from "react";
import styled from "styled-components";
import { useStore } from "../../stores/userStore";
import { useToast } from "../../hooks/useToast";
import { theme } from "../../theme";
import { IDarkTheme } from "../misc/interfaces";
import { MdSearch } from "react-icons/md";
import { getSearchResults } from "../../api/constants";
import { SearchResults } from "./Results";

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
  transition: all 0.5s linear;
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
  const { handleNewToast } = useToast();
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (searchValue !== "") {
      console.log("search value is", searchValue);
      getSearchResults(searchValue)
        .then((res) => {
          console.log("results data is", res.data);
          let currentResults = res.data.map((item: any) => {
            let newResult = {
              key: item.Key,
              localizedName: item.LocalizedName,
              adminArea: item.AdministrativeArea.LocalizedName,
              country: item.Country.LocalizedName,
            };
            return newResult;
          });

          setResults(currentResults);
        })
        .catch((err) => {
          handleNewToast("couldn't get search results to show, network error");
        });
    } else {
      setResults([]);
    }
  }, [searchValue]);

  return (
    <SearchContainer darkTheme={darkTheme}>
      <input
        type="text"
        placeholder="Search Cities..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <MdSearch />
      {results.length > 0 && (
        <SearchResults results={results} setResults={setResults} />
      )}
    </SearchContainer>
  );
};
