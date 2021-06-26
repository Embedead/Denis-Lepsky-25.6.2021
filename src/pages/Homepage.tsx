import React from "react";
// import axios from "axios"
import styled from "styled-components";
import { CurrentWeather } from "../components/currentWeather";
import { DaysAheadForCast } from "../components/DaysAheadForcast";
// import {getSearchResults}  from "../api/constants"

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Homepage = () => {
  const [locationKey, setLocationKey] = React.useState("215854");
  return (
    <HomepageContainer>
      <CurrentWeather locationKey={locationKey} />
      <DaysAheadForCast />
    </HomepageContainer>
  );
};
