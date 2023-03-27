import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDistance: false,
}

const isDistanceSlice = createSlice({
  name: 'isdistance',
  initialState,
  reducers: {
    setIsDistance: (state, action) => {
      if (state.isDistance !== action.payload) {
        state.isDistance = action.payload
      }
    },
  },
})

export const { setIsDistance } = isDistanceSlice.actions

export default isDistanceSlice.reducer
