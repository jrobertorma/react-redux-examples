import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

/**
 * configureStore is the redux-toolkit way of setting up a redux store without having to do a lot of
 * configurations and code, we can pass middleware (like devTools) as parameters
 * */
export const store = configureStore({
  'reducer': { counterReducer },
  'devTools': true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch