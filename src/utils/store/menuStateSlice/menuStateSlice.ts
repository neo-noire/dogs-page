import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen
        },

    },
})

// Action creators are generated for each case reducer function
export const { toggleMenu } = menuSlice.actions

export default menuSlice.reducer