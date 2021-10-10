import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const signup = createAsyncThunk(
 "auth/signup",
 async ({companyName, login, password}, thunkAPI) => {
   try {
     const response = await axios.post("/registration", { company: companyName, login, pass: password }, {
        headers: {
          "Content-Type": "application/json",
        }
      })

      let data = response.data
      console.log("data", data)

      if (response.status === 200) {
        localStorage.setItem("token", data)
        localStorage.setItem("companyName", companyName)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
        return { ...data, companyName }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const signin = createAsyncThunk(
  'auth/login',
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await axios.post('/sign_in', { login, password }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      let data = response.data
      console.log('response', data)
      
      if (response.status === 200) {
        localStorage.setItem('token', data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isFetching = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isFetching = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(signup.rejected, (state) => {
        state.isError = true
        state.isFetching = false
        state.isSuccess = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(signin.pending, (state) => {
        state.isFetching = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(signin.rejected, (state) => {
        state.isError = true
        state.isFetching = false
        state.isSuccess = false
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
      })
  },
})

export const { clearState } = authSlice.actions;

export default authSlice.reducer