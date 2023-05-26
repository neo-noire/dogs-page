import { IDog, ISortParams } from './../../../types/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CounterState } from '../../../types/dogSliceTypes';
import { sizes, sortParams } from '../../data/filtersData';

const initialState: CounterState = {
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

}

export const allDogsList = createSlice({
    name: 'allDogsList',
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<IDog[]>) => {
            state.dogsArray = action.payload
        },
        updateQuery: (state, action: PayloadAction<string>) => {
            state.queryParam = action.payload
        },
        updatePages: (state, action: PayloadAction<number>) => {
            state.totalPages = Math.ceil(action.payload)
        },
        setBreedList: (state, action: PayloadAction<string[]>) => {
            state.breed.breedList = action.payload
        },
        setChosenBreeds: (state, action: PayloadAction<string[]>) => {
            state.breed.chosenBreeds = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        updateSorByFilter: (state, action: PayloadAction<ISortParams>) => {
            state.sortBy.chosenItem = action.payload
        },
        updateDogsPerPageFilter: (state, action: PayloadAction<number>) => {
            state.dogsPerPage.chosenItem = action.payload
        }


    },
})

// Action creators are generated for each case reducer function
export const { updateState, updateQuery, updatePages, setBreedList, setCurrentPage, setChosenBreeds, updateSorByFilter, updateDogsPerPageFilter } = allDogsList.actions

export default allDogsList.reducer