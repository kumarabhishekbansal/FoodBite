import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../../../Reducers/Auth/AuthSlice";
import logo from "../images/mainLogo.png";
import { getCartTotal } from "../../../Reducers/Cart/CartSlice";
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Divider } from "@mui/material";
const Navigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleaboutus=()=>{
    window.scrollBy(0, window.innerHeight);
  }

  const handlecontactus=()=>{
    window.scrollBy(0, 7*window.innerHeight);
  }

  const handlefaqus=()=>{
    window.scrollBy(0, 2*window.innerHeight);
  }

  const { cart, totalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);
  const [showNavCentred, setShowNavCentred] = useState(false);
  return (
    <>
      <MDBNavbar
        expand="lg"
        light
        bgColor="light"
        className="fixed-top navi mb-5"
      >
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <Link to="/">
              <img src={logo} height="60" alt="" loading="lazy" />
            </Link>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavCentred(!showNavCentred)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse
            navbar
            show={showNavCentred}
            center
            id="navbarCenteredExample"
          >
            <MDBNavbarNav fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem className="navitem">
                <MDBNavbarLink active aria-current="page">
                  <Link to="/">Home</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className="navitem">
                <MDBNavbarLink>
                  <Link onClick={handleaboutus}>About Us</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className="navitem">
                <MDBNavbarLink to="/faq">
                  {" "}
                  <Link onClick={handlefaqus}>FAQ's</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className="navitem">
                <MDBNavbarLink to="/contact">
                  {" "}
                  <Link  onClick={handlecontactus}>Contact US</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              {!user ? (
                <>
                  <MDBNavbarItem className="navitem">
                    <MDBNavbarLink to="/register">
                      <Link to="/register">Register</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem className="navitem">
                    <MDBNavbarLink to="/login">
                      <Link to="/login">Login</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem className="navitem">
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag="a"
                        className="nav-link"
                        role="button"
                      >
                        Services
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem link className="navitemd" >
                          {" "}
                          <Link to="/">Add Resturants</Link>{" "}
                        </MDBDropdownItem>
                        <MDBDropdownItem link className="navitemd">
                          {" "}
                          <Link to="/">Add Tiffin Service</Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link className="navitemd">
                          <Link to="/">Friend Sent</Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link className="navitemd">
                          <Link to="/">Friends List</Link>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                  <MDBNavbarItem className="navitem">
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag="a"
                        className="nav-link"
                        role="button"
                      >
                        Profile
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem link className="navitemd">
                          {" "}
                          <Link to="/profile">Dashboard</Link>{" "}
                        </MDBDropdownItem>
                        <MDBDropdownItem link className="navitemd">
                          {" "}
                          <Link to="/cart">Cart</Link>{" "}
                        </MDBDropdownItem>
                        <MDBDropdownItem link className="navitemd">
                          <Link onClick={onLogout}>Logout</Link>{" "}
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <Divider />
    </>
  );
};

export default Navigation;
