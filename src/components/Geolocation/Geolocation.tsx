import React, { FC, useEffect, useRef, useState } from "react";
import fetchRequest from "../../axios/axios";
import styles from "./Geolocation.module.scss";
import { BsGeoAlt } from "react-icons/bs";

interface ILocation {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface IResponse {
  results: ILocation[];
  total: number;
}

interface IGeoProps {
  setZipCodes: (zipCodes: string[] | null) => void;
}

export const Geolocation: FC<IGeoProps> = ({ setZipCodes }) => {
  const [showInput, setShowInput] = useState(false);
  const [textInput, setTextInput] = useState<string>("");
  const [allAdresses, setAllAdresses] = useState<ILocation[]>([]);

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
      let string = textFormater(textInput);
      let res: string[] = [];

      if (string.includes(",")) {
        res = string.split(",");
      } else {
        res = [string];
      }
      try {
        const { data } = await fetchRequest.post<IResponse>(
          `/locations/search`,
          {
            city: res[0],
            states: res[1] ? [res[1]] : "",
            size: 100,
          }
        );
        setAllAdresses(data.results);
        setZipCodes(data.results.map((el) => el.zip_code));
        res[2] && setZipCodes([res[2]]);
        textInput.length === 0 && setZipCodes(null);
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, [textInput]);

  function textFormater(text: string): string {
    let res: string = "";
    if (text.includes(",")) {
      res = textInput
        .split(",")
        .map((el, idx) =>
          idx === 0
            ? (el.charAt(0).toLocaleUpperCase() + el.slice(1)).trim()
            : el.toLocaleUpperCase().trim()
        )
        .join(",");
    } else {
      res = textInput.charAt(0).toLocaleUpperCase() + textInput.slice(1);
    }

    return res;
  }

  return (
    <div className={styles.geoWrapper}>
      {" "}
      <label htmlFor="check">
        <BsGeoAlt />:
        <span>
          {textFormater(textInput).length > 0
            ? textFormater(textInput)
            : "All Cities"}
        </span>
      </label>
      <input id="check" type="checkbox" />
      <div className={`${styles.popup} ${styles.open}`}>
        <input
          id="geo"
          type="text"
          value={textInput}
          onChange={(event) => setTextInput(event.currentTarget.value)}
          placeholder="search"
        />
        <ul>
          {allAdresses.map((el) => (
            <li
              key={el.zip_code}
              onClick={() =>
                setTextInput(`${el.city},${el.state},${el.zip_code}`)
              }
            >
              {el.city}, {el.state},{el.county} county, ZIP:{el.zip_code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
