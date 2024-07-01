import React, { useEffect,useState } from "react";
import queryString from "query-string";
import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeadmin, reset,addcashbackpoints,getuser } from "../../../Reducers/Auth/AuthSlice";
import { onaddresbtn,offaddresbtn } from "../../../Reducers/Dashboard/AddResSlice";
import Modal from "./Modal";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { cartreset } from "../../../Reducers/Cart/CartSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAdmin, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const {cart}=useSelector((state)=>state.cart);
  const queryParams = queryString.parse(window.location.search)
  const {addresbtn}=useSelector((state)=>state.addres);

  const handlemakeadmin = () => {
    dispatch(makeadmin(user._id));
  };
  const handleaddres=()=>{
    console.log("add res clicked");
    dispatch(onaddresbtn());
    console.log("addresbtn dashboard : ",addresbtn);
  }
  const handleview=()=>{
    dispatch(offaddresbtn());
    navigate("/viewadminres");
  }
  const handleclientview=()=>{
    navigate("/viewres");
  }


//   const getuser=async()=>{
//     console.log("profile getusre");
//     const data={id:user._id};
//     const response=await axios.post('/api/user/getuser',data);
//     console.log("response is : ",response);
//     if(response.status!==200)
//     {
//         console.log(response.status);
//     }else if(response.data && response.status===200){
//         console.log(response.data);
//     }
// }

  const checkpaysuccess=async()=>{
    if(queryParams.session_id && user)
    {
        const API_URL='/api/cart/'
        const actualpoint=user.cashbackpoints;
        console.log("user actual point ",user.cashbackpoints);
        console.log("Actual point ",actualpoint);
        const amountoff=JSON.parse(localStorage.getItem('cashbackpoints'));
        const removepoint=JSON.parse(localStorage.getItem('cashbackpoints'))*5;
       console.log("removepoint ",removepoint);

        const data={cart:cart,userId:user._id,amountoff:amountoff}
        const response=await axios.post(API_URL+'addcartitems',data);
        console.log(response);
        dispatch(cartreset());
        const addpoint=25;
      //   const actualpoint=user.cashbackpoints;
      //   console.log("user actual point ",user.cashbackpoints);
      //   console.log("Actual point ",actualpoint);
      //   const removepoint=JSON.parse(localStorage.getItem('cashbackpoints'))*5;
      //  console.log("removepoint ",removepoint);
        const pointdata={
          userId:user._id,
          points:actualpoint+addpoint-removepoint
        }
        dispatch(addcashbackpoints(pointdata));
        navigate("/profile");
    }
    // dispatch(getuser(user._id));
  }

useEffect(()=>{
  dispatch(getuser(user._id));
},[]);

  useEffect(() => {
    if (isError) {
      console.log("dashboard error ", message);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    } else if (isSuccess || isAdmin) {
      setTimeout(() => {
        navigate("/profile");
        dispatch(reset());
      }, 2000);
    }
  }, [isAdmin, message, isSuccess, isError]);

useEffect(()=>{
  checkpaysuccess();
},[]);

  if (!user) {
    return navigate("/register");
  }

  return (
    <section style={{ backgroundColor: "#eee", height: "150vh" }}>
      {addresbtn?(<>
        <Modal/>
      </>):(<>

      </>)}
      
      <MDBContainer className="py-1 dashboardcont">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.profile}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  UserName : <b>{user.username}</b>
                </p>
                <p className="text-muted mb-4">
                  CashBack Points : <b>{user.cashbackpoints}</b>
                </p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="child fa-lg text-warning" />
                    <MDBCardText>{user._id}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon icon="bolt fa-lg" style={{ color: "#333333" }} />
                    <MDBCardText>Streaks: {user.streaks}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="jedi-order fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>TotalOrders : {user.orderscount}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <Link to='/cart'>
                    <MDBIcon
                    fas
                      icon="cart-plus fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    </Link>
                    
                    <MDBCardText>Cart : {cart.length}</MDBCardText>
                  </MDBListGroupItem>
                  {user.isAdmin === false ? (
                    <>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          icon="users fa-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText
                          onClick={handlemakeadmin}
                          style={{ cursor: "pointer",'border':'2px solid green','padding':'4px','backgroundColor':'green','color':"white"}}
                        >
                          Make Admin
                        </MDBCardText>
                      </MDBListGroupItem>
                    </>
                  ) : (
                    <>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="opencart fa-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText
                        onClick={handleaddres}
                        style={{ cursor: "pointer",'border':'2px solid orange','padding':'4px','backgroundColor':'orange','color':"white"}} 
                        >Add Restuarant</MDBCardText>
                      </MDBListGroupItem>
                    </>
                  )}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8" className="mt-5">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.fullName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.phone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>DOB</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.dob}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.city}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Zip Code</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.zipcode}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.role}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <hr />
                {(user.isAdmin?(<>
                  <MDBRow>
                  <MDBCol sm="12">
                  <button className="btn btn-primary" onClick={handleview}
                  style={{backgroundColor:"blue"}}
                  >
                      View Restuarnats
                  </button>
                  </MDBCol>
                </MDBRow>
                </>):(<>
                  <MDBRow>
                  <MDBCol sm="12">
                  <button className="btn btn-primary" onClick={handleclientview}
                  style={{backgroundColor:"blue"}}
                  >
                      View Restuarnats
                  </button>
                  </MDBCol>
                </MDBRow>
                </>))}
                <MDBRow>
                  <MDBCol sm="12" >
                  <button className="btn btn-primary"  style={{backgroundColor:"green"}}
                  onClick={()=>navigate("/historyorders")}
                  >
                      View Orders
                  </button>
                  </MDBCol>
                </MDBRow>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Dashboard;
