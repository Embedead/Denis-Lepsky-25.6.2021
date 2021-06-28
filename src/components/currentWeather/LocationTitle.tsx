import React from "react";
import styled from "styled-components";
import { getLocationNameByKey } from "../../api/constants";
import { useToast } from "../../hooks/useToast";

interface IProps {
  locationKey: string;
}

const LocationContainer = styled.div`
  align-self: flex-end;
  label {
    font-size: 1.5rem;
  }
`;

export const LocationTitle = ({ locationKey }: IProps) => {
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
  return (
    <LocationContainer>
      <label>{location}</label>
    </LocationContainer>
  );
};
