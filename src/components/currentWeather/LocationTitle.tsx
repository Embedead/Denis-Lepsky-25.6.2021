import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLocationNameByKey } from "../../api/constants";
import { useToast } from "../../hooks/useToast";
import { useStore } from "../../stores/userStore";
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
  const history = useHistory();
  const { setLocationID } = useStore();
  const { handleNewToast } = useToast();
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    getLocationNameByKey(locationKey)
      .then((res) => {
        setLocation(res.data.LocalizedName);
      })
      .catch((err) => {
        handleNewToast("couldn't access location title, network error");
        setLocation("N/A");
      });
  }, [locationKey]);

  const handleTileClick = (locationKey: string) => {
    setLocationID(locationKey);
    history.push("/");
  };
  return (
    <LocationContainer>
      <label onClick={() => handleTileClick(locationKey)}>{location}</label>
    </LocationContainer>
  );
};
