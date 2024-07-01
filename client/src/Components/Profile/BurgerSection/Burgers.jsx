import React from "react";
import "../NoodleSection/noodlestyle.css"
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Reducers/Cart/CartSlice";
const Burgers = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="main_foodsection">
        <MDBCard className="cardmain">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={props.vals.photo} fluid alt="..." className="itemphoto"/>
          </MDBRipple>
          <MDBCardBody className="cardbody">
            <MDBCardTitle>
              <b className="namebold">{props.vals.name}</b>
            </MDBCardTitle>
            <MDBCardText>{props.vals.price} Rs.</MDBCardText>
            <MDBCardText>
            {props.vals.isVeg === true ? (
              <>
                <p>
                  <i class="fas fa-square-check" style={{ color: "green" }}>
                    veg
                  </i>
                </p>
              </>
            ) : (
              <>
                <p>
                  <i class="fas fa-square-check" style={{ color: "red" }}>
                    Non veg
                  </i>
                </p>
              </>
            )}
            </MDBCardText>
            
            <MDBBtn onClick={() => dispatch(addToCart(props.vals))}>
              Add to Cart
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default Burgers;
