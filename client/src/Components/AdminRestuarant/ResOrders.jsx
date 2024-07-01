import React, { useEffect, useState,useRef } from "react";
// import Moment from "react-moment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "./ResOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getresorders,
  updateorders
} from "../../Reducers/ResOrder/ResOrderSlice";

const ResOrders = () => {
  // const orderidref=useRef();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { val } = useParams();
  const usedval = JSON.parse(decodeURIComponent(val));
  const { resorder, isLoading, isError, isresSuccess, message } = useSelector(
    (state) => state.ResOrderDetails
  );
  const [userorders, setuserorders] = useState([]);
  // const [totalam, settotalam] = useState(0);
  const [orderid,setorderid]=useState({});
  const[orderstatus,setorderstatus]=useState("Placed");

  const handleChange = (event) => {
    setorderstatus(event.target.value);
    console.log(event.target.value);
    updatedata(event.target.value);
  };

  const orderidchange=(event)=>{
    console.log("orderidchange ",event.target.value);
    setorderid(event.target.value);
  }

  const fetchdata = () => {
    console.log("fetchdata ResOrders");
    dispatch(getresorders(usedval._id));
    console.log(resorder);
    if (resorder.length > 0) {
      setuserorders(resorder);
    }
    console.log(userorders);
  };

  const updatedata = (orderstatus) => {
    console.log("update data");
    const datas={
      _id:usedval._id,
      order_id:orderid,
      orderstatus:orderstatus
    }
    console.log("react side data ",datas);
    dispatch(updateorders(datas));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      fetchdata();
    }
    if (isresSuccess && resorder.length === 0) {
      console.log(message);
      fetchdata();
    } else if (isresSuccess) {
      console.log(message);
      console.log(resorder);
      setuserorders(resorder);
      console.log(userorders);
    }
  }, [isError, isresSuccess, message]);

  if (isLoading) {
    return <h1 style={{ marginTop: "20rem" }}>Loading...</h1>;
  }

  return (
    <>
      <div className="admin_Res_table">
        <MDBTable align="middle" className="table_Admin">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Orders</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Time</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {resorder.length > 0 ? (
              <>
                {resorder.map((val) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={val.customerId.profile}
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">
                                {val.customerId.fullName}
                              </p>
                              <p className="text-muted mb-0">
                                {val.customerId.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span>
                              <MDBTable align="middle" className="table_Admin">
                                <MDBTableHead>
                                  <tr>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                  </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                  {val.orderDetails.items.map((itemval) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{itemval.itemname}</td>
                                          <td>{itemval.quantity}</td>
                                          <td>{itemval.totalPrice} Rs</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                  <tr>
                                    <td><b>Total Amount : {val.orderDetails.amount} Rs.</b></td>
                                  </tr>
                                  <tr>
                                    <td><b>Discount : {val.orderDetails.amountoff} Rs.</b></td>
                                  </tr>
                                  {/* <tr>
                                    <td><b>Amount Paid : {val.orderDetails.totalAmount} Rs. </b></td>
                                  </tr> */}
                                </MDBTableBody>
                              </MDBTable>
                            </span>
                          </div>
                        </td>

                        <td>
                          <p className="fw-normal mb-1">{val.address}</p>
                        </td>
                        <td>
                          <FormControl
                            style={{ fontSize: "4rem" }}
                            sx={{ m: 1, minWidth: 300 }}
                            className="modal_inpt"
                          >
                          <input type="text" name="orderid" value={val._id} onFocus={orderidchange} className="orderidinpt" readonly/>
                            <label
                              id="demo-simple-select-standard-label"
                              className="modal_inpt"
                            >
                              Status
                            </label>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={val.orderstatus}
                              onChange={handleChange}
                              label="Status"
                              className="modal_inpt"
                            >
                              <MenuItem
                                value={"Placed"}
                                className="modal_inpt"
                                style={{ fontSize: "2.5rem" }}
                              >
                                Placed
                              </MenuItem>
                              <MenuItem
                                value={"Confirmed"}
                                className="modal_inpt"
                                style={{ fontSize: "2.5rem" }}
                              >
                                Confirmed
                              </MenuItem>
                              <MenuItem
                                value={"Prepared"}
                                className="modal_inpt"
                                style={{ fontSize: "2.5rem" }}
                              >
                                Prepared
                              </MenuItem>
                              <MenuItem
                                value={"Delivered"}
                                className="modal_inpt"
                                style={{ fontSize: "2.5rem" }}
                              >
                                Delivered
                              </MenuItem>
                              <MenuItem
                                value={"Completed"}
                                className="modal_inpt"
                                style={{ fontSize: "2.5rem" }}
                              >
                                Completed
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <p className="fw-bold mb-1">
                            {/* <Moment format="D/MMM/YYYY">{val.createdAt}</Moment> */}
                          </p>

                          <p className="fw-bold mb-1">
                            {/* <Moment format="h:mm A">{val.updatedAt}</Moment> */}
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>
    </>
  );
};

export default ResOrders;
