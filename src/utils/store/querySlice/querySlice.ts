import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    queryParamsString: string,
    totalPages: number,
    breedList: string[],
    currentPage: number,
}

const initialState: CounterState = {
    queryParamsString: '',
    totalPages: 0,
    breedList: [],
    currentPage: 0,
}

export const querySlice = createSlice({
    name: 'allDogsList',
    initialState,
    reducers: {

        updateQuery: (state, action: PayloadAction<string>) => {
            state.queryParamsString = action.payload
        },
        updatePages: (state, action: PayloadAction<number>) => {
            state.totalPages = Math.ceil(action.payload)
        },
        setBreedList: (state, action: PayloadAction<string[]>) => {
            state.breedList = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },


    },
})

// Action creators are generated for each case reducer function
export const { updateQuery, updatePages, setBreedList, setCurrentPage } = querySlice.actions

export default querySlice.reducer