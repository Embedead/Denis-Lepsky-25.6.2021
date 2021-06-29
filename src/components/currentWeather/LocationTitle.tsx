import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLocationNameByKey } from "../../api/basicAPI";
import { useToast } from "../../hooks/useToast";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setLocationID } from "../../store/actionCreators";
import { theme } from "../../theme";

interface IProps {
  locationKey: string;
}

const LocationContainer = styled.div`
  align-self: flex-end;
  label {
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.main};
    }
  }
`;

export const LocationTitle = ({ locationKey }: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();
  const { handleNewToast } = useToast();
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    if (locationKey !== "") {
      getLocationNameByKey(locationKey)
        .then((res) => {
          setLocation(res.data.LocalizedName);
        })
        .catch((err) => {
          handleNewToast("couldn't access location title, network error");
          setLocation("N/A");
        });
    }
  }, [locationKey]);

  const handleTileClick = (locationKey: string) => {
    dispatch(setLocationID(locationKey));
    history.push("/");
  };
  return (
    <LocationContainer>
      <label onClick={() => handleTileClick(locationKey)}>{location}</label>
    </LocationContainer>
  );
};
