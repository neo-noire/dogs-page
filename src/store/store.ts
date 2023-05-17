import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './favoriteDogsSlice/favoriteDogsSlice'

export const store = configureStore({
    reducer: {
        favDogs: dogsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch