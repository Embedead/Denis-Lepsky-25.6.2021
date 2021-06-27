import axios from "axios";
import React from "react";
import styled from "styled-components";
import { CurrentWeather } from "../components/currentWeather";
import { DaysAheadForCast } from "../components/DaysAheadForcast";
import { useStore } from "../stores/userStore";
import { Loader } from "../components/misc/Loader";

interface IProps {
  specificLocationKey?: string;
}

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Homepage = ({ specificLocationKey }: IProps) => {
  const { locationID, setLocationID, metric } = useStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const location = navigator.geolocation;

  const handleAquiredLocation = (pos: any) => {
    let coordinates =
      pos.coords.latitude.toString() + "," + pos.coords.longitude.toString();
    console.log("pos is", coordinates);
    axios
      .get(
        "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&q=" +
          coordinates +
          "&language=en-us&details=false&toplevel=false"
      )
      .then((res) => {
        console.log("res data key is", res.data.Key);
      })
      .catch((err) => {
        console.log("location couldn't be found", err);
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
          <CurrentWeather
            locationKey={specificLocationKey || locationID}
            metric={metric}
          />
          <DaysAheadForCast
            locationKey={specificLocationKey || locationID}
            metric={metric}
          />
        </HomepageContainer>
      )}
    </>
  );
};
