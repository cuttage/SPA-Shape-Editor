import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectable: false,
}

const selectableSlice = createSlice({
  name: 'selectable',
  initialState,
  reducers: {
    setSelectable: (state, action) => {
      state.selectable = action.payload
    },
  },
})

export const { setSelectable } = selectableSlice.actions

export default selectableSlice.reducer
