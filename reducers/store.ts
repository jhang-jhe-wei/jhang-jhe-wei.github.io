import { configureStore } from '@reduxjs/toolkit'
import light_slice from './light/light_slice'
import figure_slice from './figure/figure_slice';

export const store = configureStore({
  reducer: {
      light: light_slice,
      figure: figure_slice
  }
})

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;