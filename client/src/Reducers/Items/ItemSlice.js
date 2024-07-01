import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import ItemService from "./ItemService"

const initialState={
    item:null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
    totalitemdata:"",
    vegitemdata:[],
    nonvegitemdata:[],
    itemdata:[],
}

export const additem=createAsyncThunk(
    "itemreducer/additem",
    async(itemdata,thunkAPI)=>{
        try {
            return await ItemService.additem(itemdata);
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

export const getAllFood=createAsyncThunk(
    "itemreducer/getAllFood",
    async(id,thunkAPI)=>{
        try {
            return await ItemService.getAllFood(id);
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
)

const ItemSlice=createSlice({
    name:'itemreducer',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isError=false;
            state.message="";
            state.isSuccess=false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase("additem.pending",(state)=>{
            state.isLoading=true;
        })
        .addCase("additem.fulfilled",(state,action)=>{
            console.log("Action payload");
            state.message=action.payload.message;
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.item=action.payload.data;
        })
        .addCase("additem.rejected",(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload;
        })
        .addCase("getAllFood.pending",(state)=>{
            state.isLoading=true;
        })
        .addCase("getAllFood.fulfilled",(state,action)=>{
            console.log("Action payload getall food");
            state.message=action.payload.message;
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.itemdata=action.payload.data;
        })
        .addCase("getAllFood.rejected",(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload;
        })
    }
})

export const {reset}=ItemSlice.actions;
export default ItemSlice.reducer;


