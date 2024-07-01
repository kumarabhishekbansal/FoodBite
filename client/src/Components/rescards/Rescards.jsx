import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import SearchIcon from "@mui/icons-material/Search";
let API_URL = "/api/res/getallrestuarant";
let API_URL_CITY = "/api/res/search";
const Rescards = () => {
  const [items, setitems] = useState([]);
  const [vegitems, setvegitems] = useState([]);
  const [nonvegitems, setnonvegitems] = useState([]);
  const [popularitems, setpopularitems] = useState([]);
  const [searchitems, setsearchitems] = useState([]);
  const [searchcity, setsearchcity] = useState("");
  const [flag, setflag] = useState(false);
  const [vegi, setvegi] = useState(false);
  const [nvegi, setnvegi] = useState(false);
  const [sflag, setsflag] = useState(false);
  const [popular, setpopular] = useState(false);
  const fetchdata = async () => {
    console.log("view menu fetch data", API_URL);
    const response = await axios.post(API_URL);
    if (response.status !== 200 && response.status !== 201) {
      console.log(response.status);
    } else if (response.data || response.status === 200) {
      if (response.data.data) {
        setitems(response.data.data);
        if (response.data.data.length > 0) {
          console.log(items);
          setflag(true);
          setnvegi(false);
          setvegi(false);
          setpopular(false);
          setflag(false);
          setsflag(false);
        }
      } else if (response.data.message) {
        console.log(response.data.message);
      }
    }
    return response.data;
  };

  const handleveg = () => {
    console.log("click veg");
    const findveg = items.filter((val) => {
      return val.category === "Veg";
    });
    console.log(findveg);
    if (findveg) {
      setvegi(true);
      setnvegi(false);
      setpopular(false);
      setflag(false);
      setsflag(false);
      setvegitems(findveg);
    }
  };

  const handlenonveg = () => {
    console.log("click nonveg");
    const findnonveg = items.filter((val) => {
      return val.category === "NonVeg";
    });
    console.log(findnonveg);
    if (findnonveg) {
      setnvegi(true);
      setvegi(false);
      setpopular(false);
      setflag(false);
      setsflag(false);
      setnonvegitems(findnonveg);
    }
  };

  const handlepopular = () => {
    console.log("click popular");
    const findpopular = items.filter((val) => {
      return val.category === "Both";
    });
    console.log(findpopular);
    if (findpopular) {
      setpopular(true);
      setvegi(false);
      setnvegi(false);
      setflag(false);
      setsflag(false);
      setpopularitems(findpopular);
    }
  };

  const handlesearchchange = (e) => {
    setsearchcity(e.target.value);
    console.log(searchcity);
  };

  const handlesearch = async () => {
    console.log("view menu search data", API_URL_CITY);
    const response = await axios.post(API_URL_CITY, { searchcity: searchcity });
    if (response.status !== 200 && response.status !== 201) {
      console.log(response.status);
    } else if (response.data || response.status === 200) {
      if (response.data.data) {
        setsearchitems(response.data.data);
        if (response.data.data.length > 0) {
          console.log(searchitems);
          setsflag(true);
          setflag(false);
          setpopular(false);
          setvegi(false);
          setnvegi(false);
        }else if(response.data.data.length === 0)
        {
          console.log(response.data.data.length);
          setsflag(false);
          setflag(false);
          setpopular(false);
          setvegi(false);
          setnvegi(false);
        }
      } 
      else if (response.data.message) {
        console.log(response.data.message);
      }
    }
    return response.data;
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    handlesearch();
  }, [searchcity]);
  return (
    <>
      {/* top menu nav bar */}
      <div className="section1 mt-4">
        <MDBNavbarItem className="navit">
          <MDBNavbarLink>
            <Link onClick={handleveg}>Veg</Link>
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem className="navit">
          <MDBNavbarLink>
            <Link onClick={handlenonveg}>Non-Veg</Link>
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBNavbarItem className="navit">
          <MDBNavbarLink>
            <Link onClick={handlepopular}>Most Popular</Link>
          </MDBNavbarLink>
        </MDBNavbarItem>

        <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
          <div className="insearch d-flex">
            <input
              type="text"
              placeholder="Search"
              className="inputsearch"
              onChange={handlesearchchange}
              value={searchcity}
            />
            <SearchIcon
              sx={{ fontSize: "2rem" }}
              className="searchicon"
              onClick={handlesearch}
            />
          </div>
        </MDBInputGroup>
      </div>
      <div className="cardmenu mt-5">
        {/* all */}

        {flag ? (
          <>
            {items.map((val) => {
              return (
                <MDBCard className="cardsmenu">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="cardimgs"
                  >
                    <MDBCardImage
                      src={val.profile}
                      alt="..."
                      className="cardimgimg"
                    />

                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{val.trademark}</MDBCardTitle>
                    <MDBCardText>{val.description}</MDBCardText>

                    <MDBCardText>
                      <b>Address :</b>
                      {val.address}
                    </MDBCardText>

                    <MDBCardText>
                      <b>City : </b>
                      {val.city}
                    </MDBCardText>

                    <MDBCardText>
                      <b>Category : </b>
                      {val.category}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* veg */}

        {vegi ? (
          <>
            {vegitems.map((val) => {
              return (
                <MDBCard className="cardsmenu">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage src={val.profile} fluid alt="..." />
                    <Link>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </Link>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{val.trademark}</MDBCardTitle>
                    <MDBCardText>{val.description}</MDBCardText>

                    <MDBCardText>
                      <b>Address :</b>
                      {val.address}
                    </MDBCardText>

                    <MDBCardText>
                      <b>City : </b>
                      {val.city}
                    </MDBCardText>

                    <MDBCardText>
                      <b>Category : </b>
                      {val.category}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* nonveg */}

        {nvegi ? (
          <>
            {nonvegitems.map((val) => {
              return (
                <MDBCard className="cardsmenu">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage src={val.profile} fluid alt="..." />
                    <Link>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </Link>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{val.trademark}</MDBCardTitle>
                    <MDBCardText>{val.description}</MDBCardText>

                    <MDBCardText>
                      <b>Address :</b>
                      {val.address}
                    </MDBCardText>

                    <MDBCardText>
                      <b>City : </b>
                      {val.city}
                    </MDBCardText>

                    <MDBCardText>
                      <b>Category : </b>
                      {val.category}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* popular */}

        {popular ? (
          <>
            {popularitems.map((val) => {
              return (
                <MDBCard className="cardsmenu">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage src={val.profile} fluid alt="..." />
                    <Link>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </Link>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{val.trademark}</MDBCardTitle>
                    <MDBCardText>{val.description}</MDBCardText>

                    <MDBCardText>
                      <b>Address :</b>
                      {val.address}
                    </MDBCardText>

                    <MDBCardText>
                      <b>City : </b>
                      {val.city}
                    </MDBCardText>

                    <MDBCardText>
                      <b>Category : </b>
                      {val.category}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* Search */}

        {sflag ? (
          <>
            {searchitems.map((val) => {
              return (
                <MDBCard className="cardsmenu">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage src={val.profile} fluid alt="..." />
                    <Link>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </Link>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{val.trademark}</MDBCardTitle>
                    <MDBCardText>{val.description}</MDBCardText>

                    <MDBCardText>
                      <b>Address :</b>
                      {val.address}
                    </MDBCardText>

                    <MDBCardText>
                      <b>City : </b>
                      {val.city}
                    </MDBCardText>

                    <MDBCardText>
                      <b>Category : </b>
                      {val.category}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
          </>
        ) : (
          <></>
        )}


          {/* nothing to show */}

          {(!flag && !sflag && !vegi && !nvegi && !popular)?(<>
              <h1 className="my-5">Nothing to show!!</h1>
          </>):(<>

          </>)}

      </div>
    </>
  );
};

export default Rescards;
