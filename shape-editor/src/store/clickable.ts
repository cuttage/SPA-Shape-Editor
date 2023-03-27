import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clickable: false,
}

const clickableSlice = createSlice({
  name: 'clickable',
  initialState,
  reducers: {
    setClickable: (state, action) => {
      state.clickable = action.payload
    },
  },
})

export const { setClickable } = clickableSlice.actions

export default clickableSlice.reducer
