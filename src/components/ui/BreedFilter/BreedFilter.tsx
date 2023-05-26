import {  useEffect, FC } from "react";
import fetchRequest from "../../../utils/axios/axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store/store";
import { setBreedList, setChosenBreeds } from "../../../utils/store/dogsListSlice/dogsListSlice";


export const BreedFilter: FC = () => {
  const breedsPersisted = useSelector((store: RootState) => store.mainDogsCache.breed)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBreeds = async () => {
      if(breedsPersisted.breedList.length === 0) {
        try {
          const { data: breeds } = await fetchRequest<string[]>(`/dogs/breeds`);
          dispatch(setBreedList(breeds))
        } catch (error) {
          console.log(error);
        }
      }
    };

    getBreeds();
  }, []);

   const chooseBreedHandler = (e:string[]):void => {
      dispatch(setChosenBreeds(e))
   }

  return (
    <Autocomplete
      multiple
      sx={{
        minWidth: 200,
        maxWidth: 380,
        backgroundColor: "#1a1a1a",
        borderRadius: "1rem",
        "& .MuiChip-root": {
          color: "#ffff",
          border: "1px solid #ffff",
        },
        "& .MuiInputBase-input": {
          color: "#ffff",
        },
        "& .MuiFormLabel-root": {
          color: "#ffff",
        },
        "& .MuiInputBase-root": {
          borderRadius: "1rem",
        },
        "& .MuiFormControl-root": {
          borderRadius: "1rem",
        },
        //all icons/ svg of dropdown etc.
        "& .MuiSvgIcon-root": {
          fill: "#ffff",
        },
        //cutted outline
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffff",
        },
        "& + .MuiPopper-root ": {
          backgroundColor: "red",
        },
      }}
      id="tags-outlined"
      options={breedsPersisted.breedList}
      getOptionLabel={(option) => option}
      onChange={(_, value) => {
        chooseBreedHandler(value);
      }}
      defaultValue={breedsPersisted.chosenBreeds}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          sx={{ backgroundColor: "#1a1a1a", color: "#ffff" }}
          {...params}
          label="All breeds"
          placeholder=""
        />
      )}
    />
  );
};
