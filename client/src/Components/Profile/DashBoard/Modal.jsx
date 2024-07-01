import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { offaddresbtn } from "../../../Reducers/Dashboard/AddResSlice";
import si1 from "../images/resback.jpg"
import { reset,register } from "../../../Reducers/Modal/AddResModalSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Modal = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [topRightModal, setTopRightModal] = useState(true);
  const handleclose = () => {
    dispatch(offaddresbtn());
  };
  const {res,isLoading,isError,isSuccess,message}=useSelector((state)=>state.addresmodal);
  const [resdata, setresdata] = useState({
    userid: "",
    email: "",
    trademark: "",
    street: "",
    phone: "",
    state: "",
    city: "",
    zipcode: "",
    profile: "",
    description:"",
    openHours:"",
    closeHours:"",
    category:""
  });
  const {
    userid,
    email,
    trademark,
    street,
    phone,
    state,
    city,
    zipcode,
    profile,
    description,
    openHours,
    closeHours,
    category
  } = resdata;


  const [img, setimg] = useState(null);
  const handleimage = async (e) => {
    const data = new FormData();
    const file=e.target.files[0];
    setimg(file);
    data.append("file", file);
    data.append("upload_preset", "FoodBite");
    data.append("cloud_name", "dbhnxaw3m");
    try {
      fetch("https://api.cloudinary.com/v1_1/dbhnxaw3m/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setimg(data.url);
          setresdata({...resdata,profile:data.url});
        })
        .catch((err) => console.log("error"));
    } catch (error) {
      console.log("Error");
    }
  };

  const handleform = (e) => {
    setresdata({...resdata,userid:user._id})
    setresdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange = (event) => {
    setresdata({ ...resdata, category: event.target.value });
  };
  useEffect(() => {
    if (isError) {
      console.log("message : ", message);
      toast.error(message);
      // notify(message);
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    } else if (isSuccess || res) {
      console.log(message);
      toast.success("Registering.. ");
      setTimeout(() => {
        navigate("/");
        dispatch(reset());
      }, 5000);
    } else {
      dispatch(reset());
    }
  }, [res, isError, isSuccess, message, navigate, dispatch]);

const handlesubmit=(e)=>{
    e.preventDefault();
    setresdata({...resdata,userid:user._id})
    if(!userid ||
    !email ||
    !trademark ||
    !street ||
    !phone ||
    !state ||
    !city ||
    !zipcode ||
    !profile ||
    !description ||
    !openHours ||
    !closeHours||
    !profile ||
    !category
    )
    {
      console.log(resdata);
      toast.error("Please filled all data");
      return;
    }else{
      dispatch(register(resdata));
    } 
    
}

if(isLoading)
{
  return <h1>Loading.....</h1>
}


  return (
    <>
      <MDBModal
        animationDirection="right"
        show={topRightModal}
        tabIndex="-1"
        setShow={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white">
              <MDBModalTitle>Product in the cart</MDBModalTitle>
              <MDBBtn
                color="none"
                className="btn-close btn-close-white"
                onClick={handleclose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-12 text-center">
                  <form onSubmit={handlesubmit}>
                    {/* res pic */}

                    <div className="signup_profile_container">
                      <img src={img || si1} alt="" className="signup_profile_pic" />
                      <label htmlFor="profile" className="image-upload-label">
                        <i className="fas fa-plus-circle add-picture-icon"></i>
                      </label>
                      <input type="file" onChange={handleimage} id="profile" hidden name="profile" />
                    </div>

                    {/* userid */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname1" className="form-label">
                        UserId
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname1"
                        name="user"
                        readOnly
                        value={user._id}
                      />
                    </div>

                    {/* TradeMark */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname2" className="form-label">
                        TradeMark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname2"
                        name="trademark"
                        value={trademark}
                        onChange={handleform}
                      />
                    </div>

                    {/* Description */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname3" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="exampleInputname3"
                        name="description"
                        value={description}
                        onChange={handleform}
                      ></textarea>
                    </div>

                    {/* email */}

                    <div class="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={email}
                        onChange={handleform}
                      />
                    </div>

                    {/* phone */}

                    <div class="mb-3">
                      <label
                        htmlFor="exampleInputphone1"
                        className="form-label"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleInputphone1"
                        name="phone"
                        value={phone}
                        onChange={handleform}
                      />
                    </div>

                    {/* street */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                        street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="street"
                        value={street}
                        onChange={handleform}
                      />
                    </div>

                    {/* state */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                        state
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="state"
                        value={state}
                        onChange={handleform}
                      />
                    </div>

                    {/* city */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="city"
                        value={city}
                        onChange={handleform}
                      />
                    </div>

                    {/* zipcode */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="zipcode"
                        value={zipcode}
                        onChange={handleform}
                      />
                    </div>

                    {/* openHours */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                      openHours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="openHours"
                        value={openHours}
                        onChange={handleform}
                      />
                    </div>

                    {/* closeHours */}

                    <div class="mb-3">
                      <label htmlFor="exampleInputname4" className="form-label">
                      closeHours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname4"
                        name="closeHours"
                        value={closeHours}
                        onChange={handleform}
                      />
                    </div>
{/* category */}

<div class="mb-3">
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={category}
                          onChange={handleChange}
                          label="Category"
                        >
                          <MenuItem value={"Veg"}>Veg</MenuItem>
                          <MenuItem value={"NonVeg"}>NonVeg</MenuItem>
                          <MenuItem value={"Both"}>Both</MenuItem>
          
                        </Select>
                      </FormControl>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                    <ToastContainer />
                  </form>
                  
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default Modal;
