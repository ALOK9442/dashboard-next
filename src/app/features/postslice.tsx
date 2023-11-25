import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  data: Post[];
  saved: number[];
  liked: number[];
}

const initialState: PostsState = {
  data: [],
  saved: [],
  liked: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    },
    savePost: (state, action: PayloadAction<number>) => {
      state.saved.push(action.payload);
    },
    unsavePost: (state, action: PayloadAction<number>) => {
      state.saved = state.saved.filter((id) => id !== action.payload);
    },
    likePost: (state, action: PayloadAction<number>) => {
      state.liked.push(action.payload);
    },
    unlikePost: (state, action: PayloadAction<number>) => {
      state.liked = state.liked.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setPosts,
  savePost,
  unsavePost,
  likePost,
  unlikePost,
} = postSlice.actions;

export default postSlice.reducer;
