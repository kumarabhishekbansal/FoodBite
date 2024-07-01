import React from "react";
import "./App.css"

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Components/Home/Home";
import { Routes, Route} from "react-router-dom";
import ViewMenu from "./Components/ViewMenu/ViewMenu";
import Bnavbar from "./Components/bottom navigation/Bnavbar";
import Navigation from "./Components/Navigation/Top/Navigation";
import Login from "./Components/com/Login";
import Form from "./Components/com/Form";
import Footers from "./Components/Navigation/Footer/Footers";
import Dashboard from "./Components/Profile/DashBoard/DashBoard";
import ViewAdminRes from "./Components/Profile/AddRestuarant/ViewAdminRes";
import AdminResDetail from "./Components/Profile/AdminResDetail/AdminResDetail";
import ViewClientRes from "./Components/Profile/AddRestuarant/ViewClientRes";
import Cart from "./Components/Profile/ViewMenuRes/Cart";
import PreviousOrder from "./Components/OrderList/PreviousOrder";
import ResOrders from "./Components/AdminRestuarant/ResOrders";
const App = () => {
  return (
    <>
    <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/menu" element={<ViewMenu />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Form />}/>
        <Route exact path="/profile" element={<Dashboard />}/>
        <Route exact path="/viewadminres" element={<ViewAdminRes />}/>
        <Route exact path="/viewres/:val" element={<AdminResDetail />}/>
        <Route exact path="/viewres" element={<ViewClientRes />}/>
        <Route exact path="/cart" element={<Cart />}/>
        <Route exact path="/historyorders" element={<PreviousOrder />}/>
        <Route exact path="/ResOrder/:val" element={<ResOrders />}/>
      </Routes>
      <Footers />
      <Bnavbar />
      
    </>
  );
};

export default App;
