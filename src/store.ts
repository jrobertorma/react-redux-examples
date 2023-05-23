import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import postsReducer from './features/posts/postsSlice'
import {useDispatch} from "react-redux";

const reducers = combineReducers({
  'counter': counterReducer,
  'posts': postsReducer
});

/**
 * configureStore is the redux-toolkit way of setting up a redux store without having to do a lot of
 * configurations and code, we can pass middleware (like devTools) as parameters
 * */
export const store = configureStore({
  'reducer': { reducers },
  'devTools': true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()