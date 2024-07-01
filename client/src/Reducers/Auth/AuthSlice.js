import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./AuthService";
let customer = JSON.parse(localStorage.getItem("customer"));

const initialState = {
  user: customer ? customer.data : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  token: customer ? customer.token : null,
  username: customer ? customer.data.username : null,
  isAdmin: customer ? customer.data.isAdmin : false,
  Address: customer ? customer.data.address : null,
};

// register user

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      console.log("auth slice user , ", user);
      return await AuthService.register(user);
    } catch (error) {
      console.log("error auth  slice : ", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("message auth  slice : ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await AuthService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("message auth  slice : ", message);
    return thunkAPI.rejectWithValue(message);
  }
});
// logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      return await AuthService.logout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// make admin

export const makeadmin = createAsyncThunk(
  "auth/makeadmin",
  async (_id, thunkAPI) => {
    try {
      return await AuthService.makeadmin(_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update cashback point

export const addcashbackpoints = createAsyncThunk(
  "auth/addcashbackpoints",
  async (pointdata, thunkAPI) => {
    try {
      return await AuthService.addcashbackpoints(pointdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getting user

export const getuser = createAsyncThunk(
  "auth/getuser",
  async (id, thunkAPI) => {
    try {
      return await AuthService.getuser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.username = action.payload.data.username;
        state.token = action.payload.token;
        state.isAdmin = action.payload.data.isAdmin;
        state.Address = action.payload.data.address;
        // console.log("register action payload : ",action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.username = null;
        state.isAdmin = false;
        state.Address = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.username = action.payload.data.username;
        state.token = action.payload.token;
        state.isAdmin = action.payload.data.isAdmin;
        state.Address = action.payload.data.address;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.username = null;
        state.isAdmin = false;
        state.Address = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.username = null;
        state.isAdmin = false;
        state.Address = null;
      })
      .addCase(makeadmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeadmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.username = action.payload.data.username;
        state.token = action.payload.token;
        state.isAdmin = action.payload.data.isAdmin;
        state.Address = action.payload.data.address;
      })
      .addCase(makeadmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isAdmin = false;
      })
      .addCase(addcashbackpoints.fulfilled, (state, action) => {
        // console.log("action ,",action.payload.data);
        state.user = action.payload.data;  
        localStorage.setItem('customer',JSON.stringify(action.payload));
        localStorage.removeItem("cashbackpoints");
      })
      .addCase(getuser.fulfilled, (state, action) => {
        console.log("action getuser ,",action.payload.data);
        state.user = action.payload.data;  
        localStorage.setItem('customer',JSON.stringify(action.payload));
      })
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
