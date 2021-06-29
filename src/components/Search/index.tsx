import React from "react";
import styled from "styled-components";
import { useToast } from "../../hooks/useToast";
import { theme, flowUP } from "../../theme";
import { MdSearch } from "react-icons/md";
import { getSearchResults } from "../../api/basicAPI";
import { SearchResults } from "./Results";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useSelector } from "react-redux";

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
  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.15);
  animation: ${flowUP} 0.4s linear;
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
    @media only screen and (max-width: 600px) {
      padding: 0.75rem 0.25rem;
    }
    color: ${(props) =>
      props.darkTheme ? theme.colors.white : theme.colors.black};
    background-color: rgba(0, 0, 0, 0);
    &:focus {
      outline: none;
    }
  }
`;

export const Search = () => {
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
  const { addKnownToast } = useToast();
  const resultsRef = useRef(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
    setSearchValue("");
  };

  useOnClickOutside(resultsRef, handleClickOutside);

  const handleEnterPress = () => {
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
          setIsOpen(true);
        })
        .catch((err) => {
          addKnownToast("couldn't get search results to show, network error");
        });
    } else {
      setResults([]);
    }
  };

  return (
    <SearchContainer darkTheme={darkTheme}>
      <input
        type="text"
        placeholder="Search Cities..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleEnterPress();
        }}
      />
      <MdSearch />
      {results.length > 0 && isOpen && (
        <div ref={resultsRef}>
          <SearchResults results={results} setResults={setResults} />
        </div>
      )}
    </SearchContainer>
  );
};
