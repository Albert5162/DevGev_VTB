import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

export const getMarketData = createAsyncThunk(
  "auth/signup",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/showcase")

      let data = response.data;
      console.log("data", data);

      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  marketplaceData: [],
}

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarketData.fulfilled, (state, action) => {
        state.marketplaceData = action.payload
      })
  },
});

export const {

} = marketplaceSlice.actions
export default marketplaceSlice.reducer