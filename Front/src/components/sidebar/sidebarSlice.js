import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: "Каталог"
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
});

export const {
  setPage
} = sidebarSlice.actions

export default sidebarSlice.reducer