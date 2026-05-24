import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LightState {
  value: boolean[];
}

const initialState: LightState = {
    value: Array(6).fill(false)
}

export const lightSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    turnAllOn: state => {
      state.value = Array(6).fill(true);
    },
    turnAllOff: state => {
      state.value = Array(6).fill(false);
    },
    toggle: (state, action: PayloadAction<number>) => {
      state.value[action.payload] = !state.value[action.payload];
    },
    toggleAll: state => {
      state.value = state.value.map(element => (!element));
    }
  }
})

export const { turnAllOn, turnAllOff, toggle, toggleAll } = lightSlice.actions

export default lightSlice.reducer