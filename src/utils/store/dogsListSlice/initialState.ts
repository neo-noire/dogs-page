import { CounterState } from "../../../types/dogSliceTypes";
import { sizes, sortParams } from "../../../assets/data/filtersData";

export const initialState: CounterState = {
    dogsArray: [],
    queryParam: '',
    totalPages: 0,
    breed: {
        breedList: [],
        chosenBreeds: []
    },
    sortBy: {
        sortList: sortParams,
        chosenItem: sortParams[0],
    },
    dogsPerPage: {
        sortList: sizes,
        chosenItem: sizes[0]
    },
    currentPage: 0,
    address: {
        addressList: [],
        zipCodes: null,
        input: ".",
    }

}