import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  n: 0,
  nh: 0,
  nt: 0,
}

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    incrementN: (state) => {
      state.n++
    },
    incrementNh: (state) => {
      state.nh++
    },
    incrementNt: (state) => {
      state.nt++
    },
  },
})

export const { incrementN, incrementNh, incrementNt } = mySlice.actions
export default mySlice.reducer
