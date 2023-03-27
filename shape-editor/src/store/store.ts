import { configureStore } from '@reduxjs/toolkit'
import mySlice from './myslice'
import selectableReducer from './selectable'
import clickableReducer from './clickable'

const store = configureStore({
  reducer: {
    one: mySlice,
    selectable: selectableReducer,
    clickable: clickableReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
