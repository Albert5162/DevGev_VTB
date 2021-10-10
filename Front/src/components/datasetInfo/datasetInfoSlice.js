import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

export const getDataset = createAsyncThunk(
  "datasetInfo/get",
  async (urn, thunkAPI) => {
    try {
      const response = await axios.get(`/showcase/${urn}`)

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
  urn: null,
  dataset: {},
  loading: false,
  isError: false,
  selectedFields: []
}

const datasetModalSlice = createSlice({
  name: "datasetInfo",
  initialState,
  reducers: {
    openDataset: (state, action) => {
      state.urn = action.payload
    },
    closeDataset: (state) => {
      state.urn = null
      state.dataset = {}
      state.loading = false
      state.isError = false
    },
    addField: (state, action) => {
      state.selectedFields.push(action.payload)
    },
    removeField: (state, action) => {
      state.selectedFields = state.selectedFields.filter(field => field.fieldPath === action.payload.fieldPath)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataset.pending, (state) => {
        state.loading = true
        state.isError = false
      })
      .addCase(getDataset.fulfilled, (state, action) => {
        state.dataset = action.payload
        state.loading = false
        state.isError = false
      })
      .addCase(getDataset.rejected, (state, action) => {
        state.loading = false
        state.isError = true
      })
  },
});

export const {
  openDataset,
  closeDataset,
  addField,
  removeField
} = datasetModalSlice.actions
export default datasetModalSlice.reducer