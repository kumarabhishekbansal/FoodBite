import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import ResOrderService from "./ResOrderService";


const initialState={
    resorder:[],
    isLoading:false,
    isError:false,
    isresSuccess:false,
    message:"",
}

export const getresorders=createAsyncThunk(
    "ResOrderDetails/getresorders",
    async(_id,thunkAPI)=>{
        try {
            return await ResOrderService.getresorders(_id);
        } catch (error) {
            const message=(error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              console.log("message ResOrderDetails  slice : ", message);
              return thunkAPI.rejectWithValue(message);
        }
    }
)


export const updateorders=createAsyncThunk(
    "ResOrderDetails/updateorders",
    async(datas,thunkAPI)=>{
        try {
            return await ResOrderService.updateorders(datas);
        } catch (error) {
            const message=(error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              console.log("message ResOrderDetails  slice : ", message);
              return thunkAPI.rejectWithValue(message);
        }
    }
)


const ResOrderSlice=createSlice({
    name:"ResOrderDetails",
    initialState,
    reducers:{
        resorderreset:(state)=>{
            state.message="";
            state.isLoading=false;
            state.isError=false;
            state.isresSuccess=false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getresorders.pending,(state)=>{
            state.isLoading=false;
        })
        .addCase(getresorders.fulfilled,(state,action)=>{
            // console.log("getresorders.fulfilled",action.payload);
            state.resorder=action.payload.data;
            state.message=action.payload.message;
            state.isError=false;
            state.isLoading=false;
            state.isresSuccess=true;
        })
        .addCase(getresorders.rejected,(state,action)=>{
            console.log("getresorders.fulfilled",action.payload);
            state.resorder=[];
            state.message=action.payload.message;
            state.isError=true;
            state.isLoading=false;
            state.isresSuccess=false;
        })
        .addCase(updateorders.pending,(state)=>{
            state.isLoading=false;
        })
        .addCase(updateorders.fulfilled,(state,action)=>{
            // console.log("updateorders.fulfilled",action.payload);
            state.resorder=action.payload.data;
            state.message=action.payload.message;
            state.isError=false;
            state.isLoading=false;
            state.isresSuccess=true;
        })
        .addCase(updateorders.rejected,(state,action)=>{
            console.log("updateorders.fulfilled",action.payload);
            state.message=action.payload.message;
            state.isError=true;
            state.isLoading=false;
            state.isresSuccess=false;
        })
    }

});

export const {resorderreset}=ResOrderSlice.actions;

export default ResOrderSlice.reducer;


