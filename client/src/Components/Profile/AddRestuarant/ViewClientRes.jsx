import React, { useState, useEffect } from "react";
import { getAllRes, reset } from "../../../Reducers/Modal/AddResModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
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
const ViewClientRes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { resclientdata, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.addresmodal
  );

  const [isRes, setisRes] = useState(false);
  const [resdata, setresdata] = useState([]);
  const [flag, setflag] = useState(false);

  const fetchdata = () => {
    if (user) {
      dispatch(getAllRes(user.zipcode));
      if (resclientdata.length !== 0) {
        setresdata(resclientdata);
        setisRes(true);
        setflag(false);
      }
    } else if (isError) {
      console.log(message);
    } else {
      console.log("you have no rights to see this page");
      navigate("/");
    }
  };

  const handlenavi = () => {
    setflag(true);
    fetchdata();
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    } else if (isSuccess || resclientdata.length > 0) {
      console.log("success");
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    } else {
      dispatch(reset());
    }
  }, [dispatch, flag, isError, isSuccess, message, fetchdata]);

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

                      <hr />
                      <MDBBtn>
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

export default ViewClientRes;
