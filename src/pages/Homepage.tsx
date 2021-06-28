import React from "react";
import styled from "styled-components";
import { CurrentWeather } from "../components/currentWeather";
import { DaysAheadForCast } from "../components/DaysAheadForcast";
import { Search } from "../components/Search";
import { useStore } from "../stores/userStore";
import { useToast } from "../hooks/useToast";
import { Loader } from "../components/misc/Loader";
import { getLocationKeyByCord } from "../api/constants";

interface IProps {
  specificLocationKey?: string;
}

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomepageRow = styled.span`
  display: flex;
  justify-content: center; ;
`;

export const Homepage = ({ specificLocationKey }: IProps) => {
  const { locationID, setLocationID, metric } = useStore();
  const { handleNewToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const location = navigator.geolocation;

  const handleAquiredLocation = (pos: any) => {
    let coordinates =
      pos.coords.latitude.toString() + "," + pos.coords.longitude.toString();

    getLocationKeyByCord(coordinates)
      .then((res) => {
        setLocationID(res.data.Key);
      })
      .catch((err) => {
        handleNewToast("couldn't find location name, network error");
      });
  };

  const findLocation = () => {
    const error = (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    location.getCurrentPosition(handleAquiredLocation, error);
  };

  React.useEffect(() => {
    setIsLoading(true);
    findLocation();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <HomepageContainer>
          <HomepageRow>
            <Search />
          </HomepageRow>
          <HomepageRow>
            <CurrentWeather
              locationKey={specificLocationKey || locationID}
              metric={metric}
            />
          </HomepageRow>
          <DaysAheadForCast
            locationKey={specificLocationKey || locationID}
            metric={metric}
          />
        </HomepageContainer>
      )}
    </>
  );
};
