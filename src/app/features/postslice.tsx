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
  liked: Record<number, boolean>; // Use Record<number, boolean> for liked posts
  savedPosts: Post[];
}

const initialState: PostsState = {
  data: [],
  saved: [],
  liked: {},
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
    toggleLikePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      state.liked[postId] = !state.liked[postId];
    },
  },
});

export const {
  setPosts,
  savePost,
  unsavePost,
  toggleLikePost,
} = postSlice.actions;

export default postSlice.reducer;
