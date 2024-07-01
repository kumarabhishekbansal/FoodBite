import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../Reducers/Auth/AuthSlice'
import AddResReducer from "../Reducers/Dashboard/AddResSlice"
import AddResModalReducer from '../Reducers/Modal/AddResModalSlice'
import ItemReducer from '../Reducers/Items/ItemSlice'
import CartReducer from "../Reducers/Cart/CartSlice"
import OrderReducer from "../Reducers/orders/OrderSlice"
import ResOrderReducer from '../Reducers/ResOrder/ResOrderSlice'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    addres:AddResReducer,
    addresmodal:AddResModalReducer,
    itemreducer:ItemReducer,
    cart:CartReducer,
    orders:OrderReducer,
    ResOrderDetails:ResOrderReducer,
    // [PaymentService.reducerPath]: PaymentService.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat([
  //    PaymentService.middleware,
  //   ]),
});