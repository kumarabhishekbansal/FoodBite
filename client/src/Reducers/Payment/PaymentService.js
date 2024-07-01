// import { Try } from "@mui/icons-material";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const PaymentService = createApi({
//   reducerPath: "payment",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8000/api/pay",
//   }),
//   endpoints: (builder) => {
//     return {
//       sendPayment: builder.mutation({
//         query: (cart) => {
//             console.log("enter send payment react");
//             console.log(cart," cart");
//           return {
//             url: "/create-checkout-session",
//             method: "POST",
//             body: cart,
//           };
//         },
//       }),
//     };
//   },
// });


const PaymentService=async(cart,id)=>{
  
}
export const { useSendPaymentMutation} = PaymentService;
export default PaymentService;