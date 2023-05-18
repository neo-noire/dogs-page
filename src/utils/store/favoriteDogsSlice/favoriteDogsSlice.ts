import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IDog } from '../../../types/types'

export interface CounterState {
    dogsList: IDog[]
}

const initialState: CounterState = {
    dogsList: [],
}

export const dogSlice = createSlice({
    name: 'favDogs',
    initialState,
    reducers: {
        dogToFavToggle: (state, action: PayloadAction<IDog>) => {
            const isInCart = state.dogsList.find(el => el.id === action.payload.id)
            isInCart
                ? state.dogsList = state.dogsList.filter(el => el.id !== action.payload.id)
                : state.dogsList.push(action.payload)
        },

    },
})

// Action creators are generated for each case reducer function
export const { dogToFavToggle } = dogSlice.actions

export default dogSlice.reducer