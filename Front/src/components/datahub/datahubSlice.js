import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const parseDatahub = createAsyncThunk(
  "datahub/parse",
  async ({ url, username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/parse_dataHub",
        { url, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;
      console.log("data", data);

      if (response.status === 200) {
        localStorage.setItem('dataHubUrl', url)
        return data
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
  dataHubData: []
};

const datahubSlice = createSlice({
  name: "datahub",
  initialState,
  reducers: {
    orderDataset: (state, action) => {
      let index = state.dataHubData.findIndex(dataset => dataset._id === action.payload._id)
      if (~index) {
        state.dataHubData[index].ordered = true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(parseDatahub.fulfilled, (state, action) => {
        state.dataHubData = action.payload
      })
  },
});

export const {orderDataset} = datahubSlice.actions;
export default datahubSlice.reducer;
