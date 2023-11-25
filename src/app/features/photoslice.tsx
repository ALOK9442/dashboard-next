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
  liked: Record<number, boolean>;
  savedPhotos: Photo[];
}

const initialPhotosState: PhotosState = {
  data: [],
  saved: [],
  liked: {},
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
    toggleLikePhoto: (state, action: PayloadAction<number>) => {
      const photoId = action.payload;
      state.liked[photoId] = !state.liked[photoId];
    },
  },
});

export const {
  setPhotos,
  savePhoto,
  unsavePhoto,
  toggleLikePhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
