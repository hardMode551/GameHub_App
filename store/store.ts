import { configureStore } from '@reduxjs/toolkit';
import difficultyReducer from './SnakeGame/difficultySlice';
import imageSetsSlice from './ThreeInARow/imageSetsSlice';

export const store = configureStore({
  reducer: {
    difficulty: difficultyReducer,
    imageSets: imageSetsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;