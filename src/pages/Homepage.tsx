import React from "react";
import styled from "styled-components";
import { CurrentWeather } from "../components/currentWeather";
import { DaysAheadForCast } from "../components/DaysAheadForcast";
import { Search } from "../components/Search";
import { useToast } from "../hooks/useToast";
import { Loader } from "../components/misc/Loader";
import { getLocationKeyByCord } from "../api/basicAPI";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { setLocationID } from "../store/actionCreators";

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomepageRow = styled.span`
  display: flex;
  justify-content: center; ;
`;

export const Homepage = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const locationID = useSelector((state: IUserStore) => state.locationID);
  const metric = useSelector((state: IUserStore) => state.metric);
  const { handleNewToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const location = navigator.geolocation;

  const handleAquiredLocation = (pos: any) => {
    let coordinates =
      pos.coords.latitude.toString() + "," + pos.coords.longitude.toString();

    getLocationKeyByCord(coordinates)
      .then((res) => {
        dispatch(setLocationID(res.data.Key));
      })
      .catch((err) => {
        handleNewToast("couldn't find location name, network error");
      });
  };

  const findLocation = () => {
    const error = (err: any) => {
      handleNewToast("couldn't aquire device location");
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
              locationKey={locationID}
              metric={metric}
              enableShadow={true}
            />
          </HomepageRow>
          <DaysAheadForCast locationKey={locationID} metric={metric} />
        </HomepageContainer>
      )}
    </>
  );
};
