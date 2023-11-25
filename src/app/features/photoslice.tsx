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
  savedPhotos: Photo[];
}

const initialPhotosState: PhotosState = {
  data: [],
  saved: [],
  liked: [],
  savedPhotos: [],
};

const photoSlice = createSlice({
  name: 'photos',
  initialState: initialPhotosState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.data = action.payload;
    },
    savePhoto: (state, action: PayloadAction<number>) => {
      const photoToSave = state.data.find((photo) => photo.id === action.payload);
      if (photoToSave) {
        state.saved.push(action.payload);
        state.savedPhotos.push(photoToSave);
        localStorage.setItem('saved', JSON.stringify(state.saved));
      }
    },
    unsavePhoto: (state, action: PayloadAction<number>) => {
      const photoIdToRemove = action.payload;
      state.saved = state.saved.filter((id) => id !== photoIdToRemove);
      state.savedPhotos = state.savedPhotos.filter((photo) => photo.id !== photoIdToRemove);
      localStorage.setItem('saved', JSON.stringify(state.saved));
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
