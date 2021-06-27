import React from "react";
import axios from "axios";
import styled from "styled-components";

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
  const [location, setLocation] = React.useState("");

  React.useMemo(() => {
    axios
      .get(
        "https://dataservice.accuweather.com/locations/v1/" +
          locationKey +
          "?apikey=g8cU8trXVrAZXk7GCwiSgVpBAAAbhYZ4&language=en-us&details=false"
      )
      .then((res) => {
        setLocation(res.data.LocalizedName);
      })
      .catch((err) => {
        console.log("location title error is", err);
        setLocation("N/A");
      });
  }, [locationKey]);
  return (
    <LocationContainer>
      <label>{location}</label>
    </LocationContainer>
  );
};
