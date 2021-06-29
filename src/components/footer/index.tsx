import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const FooterContainer = styled.div<IDarkTheme>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 1rem;
  font-weight: 700;
  color: ${(props) => (props.darkTheme ? "white" : "#363636")};
  @media only screen and (max-width: 600px) {
    padding-right: 0;
    padding-bottom: 0.25rem;
    align-items: center;
    font-size: 0.85rem;
  }
`;

export const WeatherFooter = () => {
  const darkTheme = useSelector((state: IUserStore) => state.darkTheme);
  return (
    <FooterContainer darkTheme={darkTheme}>
      <label>Developed by Denis Lepsky</label>
      <label>Using accuWeather API</label>
      <label>delepis3@gmail.com</label>
    </FooterContainer>
  );
};
