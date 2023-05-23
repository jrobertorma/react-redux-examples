import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface postsState {
  id: string,
  title: string,
  content: string
}

const initialState = {
  posts: [] as postsState[],
  status: 'idle',
  error: null
}

// this thunk function will handle data loading with an external API
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', async () => {
    async function getProfileData() {
      try {
        return await axios.get(
          "http://localhost:8085/anequim/employees/employee-profile/robertoramirez@anequim.net",
        );
      } catch (error) {
        console.log(error)
      }
    }

    const response = await getProfileData();
    if (response) {
      return response.data;
    }

    return undefined;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.posts.push(action.payload)
    },
    postUpdated : (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }, // extra reducers handle changes on state when running the actions created by createAsyncThunk()
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        if (state.posts.length <= 0) {
          state.posts = state.posts.concat(action.payload)
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        // @ts-ignore
        state.error = action.error.message
      })
  }
});

// sometimes it may be better to include the selectors on the slice
// as it can allow for easier modifications, Note that the state parameter
// for these selector functions is the root Redux state object,
// as it was for the inlined anonymous selectors we wrote directly
// inside of useSelector. Also note that we are calling state.reducers as we
// have more than one reducer included on configureStore
export const selectAllPosts = (state: any) => state.reducers.posts.posts;
export const selectPostStatus = (state: any) => state.reducers.posts.status;
export const selectPostError = (state: any) => state.reducers.posts.error;

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;