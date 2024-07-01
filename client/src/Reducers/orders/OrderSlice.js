import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./OrderService";
const userorders=JSON.parse(localStorage.getItem("userorders"));

const initialState={
    userorders:userorders?userorders.data:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    isMessage:userorders?userorders.data.message:""
}

export const findorders=createAsyncThunk(
    "orders/findorders",
    async(id,thunkAPI)=>{
        try {
            return await OrderService.findorders(id);
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
)

const OrderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        orderreset:(state)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=false;
            state.isMessage="";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(findorders.pending,(state)=>{
            state.isLoading=true;
        }).addCase(findorders.fulfilled,(state,action)=>{
            console.log("findorder fulfilled action ",action.payload);
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.isMessage=action.payload.message;
            state.userorders=action.payload.data;
        }).addCase(findorders.rejected,(state,action)=>{
            console.log("findorder pending action ",action.payload);
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.isMessage=action.payload.message;
        })
    }
})

export const {orderreset}=OrderSlice.actions;
export default OrderSlice.reducer;