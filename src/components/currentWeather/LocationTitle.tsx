import React from "react";
import axios from "axios";

interface IProps {
  locationKey: string;
}

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
      });
  }, [locationKey]);
  return <div>{location}</div>;
};
