import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotosState {
  data: Photo[];
  saved: number[];
  liked: number[];
}

const initialPhotosState: PhotosState = {
  data: [],
  saved: [],
  liked: [],
};

const photoSlice = createSlice({
  name: 'photos',
  initialState: initialPhotosState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.data = action.payload;
    },
    savePhoto: (state, action: PayloadAction<number>) => {
      state.saved.push(action.payload);
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    unsavePhoto: (state, action: PayloadAction<number>) => {
      const photoIdToRemove = action.payload;

      // Remove the item from the saved array
      state.saved = state.saved.filter((id) => id !== photoIdToRemove);

      // Update localStorage with the new saved array
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    likePhoto: (state, action: PayloadAction<number>) => {
      state.liked.push(action.payload);
    },
    unlikePhoto: (state, action: PayloadAction<number>) => {
      state.liked = state.liked.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setPhotos,
  savePhoto,
  unsavePhoto,
  likePhoto,
  unlikePhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
