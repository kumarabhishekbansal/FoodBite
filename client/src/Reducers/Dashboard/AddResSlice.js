import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addresbtn: false,
  additembtn: false,
};

const AddResSlice = createSlice({
  name: "addres",
  initialState,
  reducers: {
    onaddresbtn: (state, action) => {
      state.addresbtn = true;
    },
    offaddresbtn: (state, action) => {
      state.addresbtn = false;
    },
    onadditembtn: (state, action) => {
      state.additembtn = true;
    },
    offadditembtn: (state, action) => {
      state.additembtn = false;
    },
  },
});
export const { onaddresbtn, offaddresbtn,onadditembtn,offadditembtn } = AddResSlice.actions;
export default AddResSlice.reducer;
