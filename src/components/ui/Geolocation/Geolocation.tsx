import React, { FC, useEffect, useState } from "react";
import fetchRequest from "../../../utils/axios/axios";
import { ILocation } from "../../../types/types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { textFormater } from "../../../utils/handlers/textFormatterForGeo";

interface IResponse {
  results: ILocation[];
  total: number;
}

export const Geolocation: FC = () => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [textInput, setTextInput] = useState("");
  const [allAdresses, setAllAdresses] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false)


  async function getData(text: string) {
    const query = textFormater(text);
    setLoading(true)
    try {
      const { data } = await fetchRequest.post<IResponse>(`/locations/search`,
        {
          city: query[0],
          states: query[1] ? [query[1]] : "",
          size: 100,
        });
      setAllAdresses(data.results)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData(textInput)
  }, [textInput]);

  return (<>
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={openList}
      onOpen={() => {
        setOpenList(true);
      }}
      onClose={() => {
        setOpenList(false);
      }}
      isOptionEqualToValue={(option, value) => option.zip_code === value.zip_code}
      getOptionLabel={(option) => `${option.city}, ${option.state}, ${option.county}, ZIP:${option.zip_code}`}
      onInputChange={(_, value) => setTextInput(value)}
      options={allAdresses}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  </>
  );
};



