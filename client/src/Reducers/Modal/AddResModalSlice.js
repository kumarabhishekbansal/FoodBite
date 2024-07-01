import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddResModalService from "./AddResModalService";
let resadmindata = JSON.parse(localStorage.getItem("resadmindata"));
const initialState = {
  res: null,
  isLoading: false,
  message: "",
  isError: false,
  isSuccess: false,
  resadmindata: resadmindata ? resadmindata : [],
  resclientdata:[],
};

export const register = createAsyncThunk(
  "addrestuarants/register",
  async (resdata, thunkAPI) => {
    try {
      return await AddResModalService.register(resdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   console.log("message auth  slice : ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all restuarants for admin

export const getalladminres = createAsyncThunk(
  "addrestuarants/getalladminres",
  async (id, thunkAPI) => {
    try {
      return await AddResModalService.getalladminres(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   console.log("message auth  slice : ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatevacancies = createAsyncThunk(
  "addrestuarants/updatevacancies",
  async (data, thunkAPI) => {
    try {
      return await AddResModalService.updatevacancies(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   console.log("message auth  slice : ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllRes = createAsyncThunk(
  "addrestuarants/getAllRes",
  async (zipcode, thunkAPI) => {
    try {
      return await AddResModalService.getAllRes(zipcode);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   console.log("message auth  slice : ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const AddResModalSlice = createSlice({
  name: "addresmodal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.res = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.res = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getalladminres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getalladminres.fulfilled, (state, action) => {
        // console.log(action.payload.data,"action");
        // state.res=action.payload.data
        state.resadmindata = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        // console.log("Res ",state.res);
      })
      .addCase(getalladminres.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(updatevacancies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatevacancies.fulfilled, (state, action) => {
        // console.log(action.payload.data,"action");
        // state.res=action.payload.data
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        // console.log("Res ",state.res);
      })
      .addCase(updatevacancies.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllRes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRes.fulfilled, (state, action) => {
        // console.log(action.payload.data,"action");
        // state.res=action.payload.data
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.resclientdata=action.payload.data;
        // console.log("Res ",state.res);
      })
      .addCase(getAllRes.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { reset } = AddResModalSlice.actions;
export default AddResModalSlice.reducer;
