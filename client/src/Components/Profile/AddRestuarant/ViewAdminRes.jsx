import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { updatevacancies } from "../../../Reducers/Modal/AddResModalSlice";
import onadditembtn from "../../../Reducers/Dashboard/AddResSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { getalladminres } from "../../../Reducers/Modal/AddResModalSlice";
const ViewAdminRes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user

  const { user } = useSelector((state) => state.auth);
  const { resadmindata, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.addresmodal
  );
  const { addresbtn } = useSelector((state) => state.addres);

  const handleadditem = () => {
    console.log("add res clicked");
    dispatch(onadditembtn());
    console.log("addresbtn dashboard : ", addresbtn);
  };

  const [isRes, setisRes] = useState(false);
  const [resdata, setresdata] = useState([]);
  const [flag, setflag] = useState(false);

  const fetchdata = () => {
    if (user.isAdmin === true) {
      dispatch(getalladminres(user._id));
      if (resadmindata.length !== 0) {
        setresdata(resadmindata);
        setisRes(true);
        setflag(false);
      }
    } else if (isError) {
      console.log(message);
    } else if (user.isAdmin === false) {
      // console.log("you have no rights to see this page");
      navigate("/viewres");
    }
  };

  const handlenavi = () => {
    setflag(true);
  };

  const handlechange = (e) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;

    const checkedValue = e.target.value;

    const checkedName = e.target.name;

    console.log(checked, checkedValue, checkedName);
    const data = { resid: checkedValue, isvacancies: checked };
    dispatch(updatevacancies(data));
    dispatch(getalladminres(user._id));
    fetchdata();
    handlenavi();
    // window.location.reload(false);
    // navigate("/viewadminres");
  };

  useEffect(() => {
    fetchdata();
  }, [flag]);

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <>
      {isRes ? (
        <>
          <div className="cards_div">
            {resdata.map((val) => {
              return (
                <>
                  <MDBCard className="main_card text-center">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    >
                      <hr />
                      <MDBCardImage src={val.profile} fluid alt={val.profile} />
                      <Link>
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </Link>
                    </MDBRipple>
                    <MDBCardBody>
                      <MDBCardTitle>{val.trademark}</MDBCardTitle>
                      <MDBCardText>{val.description}</MDBCardText>
                      <MDBCardText className="fw-bold">
                        {val.address}
                      </MDBCardText>
                      {val.isvacancies === false ? (
                        <>
                          <MDBCheckbox
                            name="isvacancies"
                            value={val._id}
                            id="flexCheckDefault"
                            label="IsVacancies"
                            onChange={handlechange}
                          />
                        </>
                      ) : (
                        <>
                          <MDBCheckbox
                            name="isvacancies"
                            value={val._id}
                            id="flexCheckDefault"
                            label="IsVacancies"
                            onChange={handlechange}
                            defaultChecked
                          />
                        </>
                      )}
                      <hr />
                      <MDBBtn className="readmbtn">
                        {" "}
                        <Link
                          to={`/viewres/${encodeURIComponent(
                            JSON.stringify(val)
                          )}`}
                          style={{ color: "white" }}
                        >
                          Read More
                        </Link>
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="container_empty_res">
            <h1 className="empty_res_h1">Nothing to Show</h1>
            <p className="empty_res_p">
              Sorry, there is nothing to show here Or you can try to click on
              below button
            </p>

            <button onClick={handlenavi} className="hc_btn">
              View Restuarant
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ViewAdminRes;
