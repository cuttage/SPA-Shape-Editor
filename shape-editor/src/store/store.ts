import { configureStore } from '@reduxjs/toolkit'
import mySlice from './myslice'

const store = configureStore({
  reducer: {
    one: mySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
