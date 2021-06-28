import React from "react";
import styled from "styled-components";
import { IDarkTheme } from "../misc/interfaces";
import { theme, flowUP } from "../../theme";
import { useStore } from "../../stores/userStore";

interface IProps {
  results: any;
  setResults: (data: any) => void;
}

const ResultsContainer = styled.div<IDarkTheme>`
  position: absolute;
  z-index: 30;
  top: 2.5rem;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  cursor: pointer;
  animation: ${flowUP} 0.4s linear;
  background-color: ${(props) =>
    props.darkTheme ? theme.colors.black : theme.colors.white};
  color: ${(props) =>
    props.darkTheme ? theme.colors.white : theme.colors.black};
  padding: 0.5rem;
`;

const Result = styled.span<IDarkTheme>`
  display: flex;
  flex-grow: 1;
  border-bottom: 1px solid gray;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

export const SearchResults = ({ results, setResults }: IProps) => {
  const handleResultClick = (key: string, setter: (data: any) => void) => {
    setLocationID(key);
    setter([]);
  };
  const { darkTheme, setLocationID, locationID } = useStore();
  return (
    <ResultsContainer darkTheme={darkTheme}>
      {results.map((item: any, index: number) => {
        return (
          <Result
            key={index}
            darkTheme={darkTheme}
            onClick={() => handleResultClick(item.key, setResults)}
          >
            {item.localizedName}, {item.adminArea}, {item.country}
          </Result>
        );
      })}
    </ResultsContainer>
  );
};
