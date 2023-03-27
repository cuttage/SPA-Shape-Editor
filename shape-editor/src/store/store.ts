import { configureStore } from '@reduxjs/toolkit'
import mySlice from './myslice'
import selectableReducer from './selectable'
import clickableReducer from './clickable'
import isdistanceReducer from './isdistance'

const store = configureStore({
  reducer: {
    one: mySlice,
    selectable: selectableReducer,
    clickable: clickableReducer,
    isDistance: isdistanceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
