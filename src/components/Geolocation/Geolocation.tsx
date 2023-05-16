import React, { useEffect, useState } from "react";
import fetchRequest from "../../axios/axios";

interface ICoordinates {
  lat: number | null;
  lon: number | null;
}
export const Geolocation = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [recieveCoordinates, setRecieveCoordinates] = useState(false);
  useEffect(() => {
    // Error 500 coming from server, not possible to make auto geo
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setCoordinates({
    //     lat: position.coords.latitude,
    //     lon: position.coords.longitude,
    //   });
    //   setRecieveCoordinates(true);
    // });
    const getLocation = async () => {
      try {
        const res = await fetchRequest.post(`/locations/search`, {
          city: "Madison",
          //   states: ["WI"],
          size: 100,
        });

        console.log(res.data.results);
      } catch (error) {}
    };

    getLocation();
  }, [recieveCoordinates]);

  return (
    <div>
      {" "}
      <input placeholder="search" />
    </div>
  );
};
