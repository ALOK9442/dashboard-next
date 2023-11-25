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
  savedPosts: Post[];
}

const initialState: PostsState = {
  data: [],
  saved: [],
  liked: [],
  savedPosts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    },
    savePost: (state, action: PayloadAction<number>) => {
      const postToSave = state.data.find((post) => post.id === action.payload);
      if (postToSave) {
        state.saved.push(action.payload);
        state.savedPosts.push(postToSave);
        localStorage.setItem('saved', JSON.stringify(state.saved));
      }
    },
    unsavePost: (state, action: PayloadAction<number>) => {
      const postIdToRemove = action.payload;
      state.saved = state.saved.filter((id) => id !== postIdToRemove);
      state.savedPosts = state.savedPosts.filter((post) => post.id !== postIdToRemove);
      localStorage.setItem('saved', JSON.stringify(state.saved));
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
