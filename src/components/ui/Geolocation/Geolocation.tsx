import React, { FC, useEffect, useState } from "react";
import fetchRequest from "../../../utils/axios/axios";
import { ILocation } from "../../../types/types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { textFormater } from "../../../utils/handlers/textFormatterForGeo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store/store";
import { setAddressList, setAddressQuery, setZipCodes } from "../../../utils/store/dogsListSlice/dogsListSlice";
import { muiStyleAutocomplete } from "../../../assets/data/muiStyles";

interface IResponse {
  results: ILocation[];
  total: number;
}

export const Geolocation: FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.mainDogsCache.address)
  const [openList, setOpenList] = useState<boolean>(false);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false)


  async function getData(text: string) {
    const query = textFormater(text);
    if (query.join('') === address.input) return
    setLoading(true)
    try {
      const { data } = await fetchRequest.post<IResponse>(`/locations/search`,
        {
          city: query[0],
          states: query[1] ? [query[1]] : "",
          size: 100,
        });
      zipCodesHandler(data.results)
      dispatch(setAddressQuery(query.join('')))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (openList) {
      getData(textInput)

    }
  }, [textInput, openList]);

  function handleInputClick(el: ILocation | null) {
    if (el) {
      dispatch(setZipCodes(el.zip_code.toString()))
    } else {
      dispatch(setZipCodes(''))
    }
  }
  function zipCodesHandler(e: ILocation[]) {
    dispatch(setAddressList(e))
  }

  return (<>
    <Autocomplete
      id="asynchronous-demo"
      sx={{ ...muiStyleAutocomplete, width: 300 }}
      open={openList}
      onOpen={() => {
        setOpenList(true);
      }}
      onClose={() => {
        setOpenList(false);
      }}
      isOptionEqualToValue={(option, value) => option.zip_code === value.zip_code}
      getOptionLabel={(option) => `${option.city}, ${option.state}, ZIP:${option.zip_code}`}
      onInputChange={(_, value) => setTextInput(value)}
      onChange={(_, v) => handleInputClick(v)}
      options={address.addressList}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Address"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
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



