import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const productData=JSON.parse(localStorage.getItem('products'));
const cartitems=JSON.parse(localStorage.getItem('cartitems'));
const discount=JSON.parse(localStorage.getItem("cashbackpoints"));
const initialState = {
  cart: cartitems?cartitems:[],
  items: productData?productData:[],
  totalQuantity: 0,
  totalPrice: 0,
  discount:discount?discount:0,
};





const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartreset:(state)=>{
      console.log("enter cart reset slice");
      localStorage.removeItem('cartitems');
      state.cart=[];
      state.totalPrice=0;
      state.totalQuantity=0;
    },
    addToCart: (state, action) => {
        console.log("add to cart ");
      let find = state.cart.findIndex((item) => item._id === action.payload._id);
      console.log("find is : ",find);
      console.log("action payload  : ",action.payload);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          // console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice=state.totalPrice-state.discount;
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

export const {
  cartreset,
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;