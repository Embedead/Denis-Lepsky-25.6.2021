import React from "react";
import styled from "styled-components";
import { theme, flowUP } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { setLocationID } from "../../store/actionCreators";

interface IProps {
  results: any;
  setResults: (data: any) => void;
}

const ResultsContainer = styled.div<IDarkTheme>`
  position: absolute;
  z-index: 30;
  top: 2.5rem;
  @media only screen and (max-width: 600px) {
    top: 3.5rem;
  }
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
  box-shadow: ${(props) =>
    props.darkTheme
      ? "0 2px 4px 4px rgba(255,255,255,0.05)"
      : "0 2px 4px 4px rgba(0,0,0,0.15)"};
`;

const Result = styled.span<IDarkTheme>`
  display: flex;
  flex-grow: 1;
  border-bottom: 1px solid gray;
  padding: 0.25rem;
  margin: 0.5rem 0;
  font-size: 1.25rem;
  &:hover {
    color: ${theme.colors.main};
  }
`;

export const SearchResults = ({ results, setResults }: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const handleResultClick = (key: string, setter: (data: any) => void) => {
    dispatch(setLocationID(key));
    setter([]);
  };
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);

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
