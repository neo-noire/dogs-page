import { useState, useEffect, FC } from "react";
import fetchRequest from "../../../utils/axios/axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface IBreedFilterProps {
  setBreedsList: (arg: string[]) => void;
}

export const BreedFilter: FC<IBreedFilterProps> = ({ setBreedsList }) => {
  const [allBreeds, setAllBreeds] = useState<string[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const { data: breeds } = await fetchRequest<string[]>(`/dogs/breeds`);
        setAllBreeds(breeds);
      } catch (error) {
        console.log(error);
      }
    };

    getBreeds();
  }, []);

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
      options={allBreeds}
      getOptionLabel={(option) => option}
      onChange={(_, value) => {
        setBreedsList(value);
      }}
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
