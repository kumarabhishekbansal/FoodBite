import React, { useEffect, useState } from "react";
import "./ViewMenuRes.css";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom'
import Noodles from "../NoodleSection/Noodles";
import { getAllFood } from "../../../Reducers/Items/ItemSlice";
import axios from "axios";
import Burgers from "../BurgerSection/Burgers";
import Gbread from "../GarlicBreadSection/Gbread";
import Pizza from "../PizzaSection/Pizza";
import Subway from "../SubwaySection/Subway";
import CookingLoader from "../../../Components/CookingLoader";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { getCartTotal } from "../../../Reducers/Cart/CartSlice";
import { Link } from "react-router-dom";


let API_URL = "/api/item/";
const ViewMenuRes = (props) => {
  const [items, setitems] = useState([]);
  const [noodledata, setnoodledata] = useState([]);
  const [pizzadata, setpizzadata] = useState([]);
  const [burgerdata, setburgerdata] = useState([]);
  const [garlicbreaddata, setgarlicbreaddata] = useState([]);
  const [subwaydata, setsubwaydata] = useState([]);
  const [flag, setflag] = useState(false);
  const [nflag, setnflag] = useState(false);
  const [bflag, setbflag] = useState(false);
  const [sflag, setsflag] = useState(false);
  const [gflag, setgflag] = useState(false);
  const [pflag, setpflag] = useState(false);
  const dispatch=useDispatch();
  const fetchdata = async () => {
    const data = { id: props.val._id };
    const response = await axios.post(API_URL + "getAllFood", data);
    if (response.status !== 200 && response.status !== 201) {
      console.log(response.status);
    } else if (response.data || response.status === 200) {
      // console.log(response.data,"view");
      if (response.data.data) {
        setitems(response.data.data);
        if (response.data.data.length > 0) {
          console.log(items);
          localStorage.setItem("products",JSON.stringify(items));
          setflag(true);
          noodlecategories();
          burgercategories();
          garlicbreadcategories();
          pizzacategories();
          subwaycategories();
        }
      } else if (response.data.message) {
        console.log(response.data.message);
      }
    }
    return response.data;
  };

  // const [itemdata]=useSelector((state)=>state.itemreducer);

  const noodlecategories = () => {
    const data = items.filter((val) => {
      return val.category === "Noodles";
    });
    console.log("noodle data ", data);
    setnoodledata(data);
    if (noodledata.length > 0) {
      setnflag(true);
    }
  };

  const burgercategories = () => {
    const data = items.filter((val) => {
      return val.category === "Burger";
    });

    setburgerdata(data);
    if (burgerdata.length > 0) {
      setbflag(true);
    }
  };

  const subwaycategories = () => {
    const data = items.filter((val) => {
      return val.category === "Subway";
    });
    setsubwaydata(data);
    if (subwaydata.length > 0) {
      setsflag(true);
    }
  };

  const garlicbreadcategories = () => {
    const data = items.filter((val) => {
      return val.category === "Garlic Bread";
    });
    setgarlicbreaddata(data);
    if (garlicbreaddata.length > 0) {
      setgflag(true);
    }
  };

  const pizzacategories = () => {
    const data = items.filter((val) => {
      return val.category === "Pizza";
    });
    setpizzadata(data);
    if (pizzadata.length > 0) {
      setpflag(true);
    }
  };

  const { cart, totalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

 
  useEffect(() => {
    fetchdata();
    if (flag) {
      noodlecategories();
      burgercategories();
      garlicbreadcategories();
      pizzacategories();
      subwaycategories();
    }
  }, []);

  useEffect(()=>{
    noodlecategories();
    burgercategories();
    garlicbreadcategories();
    pizzacategories();
    subwaycategories();
  },[items]);

  const handleload=()=>{
    console.log("handle load");
    fetchdata();
}

  return (
    <>

    <div className="cart_head">
      <div className="view_Menu_heading">
      <h1 className="heading"> View <span>Menu</span></h1>
      <div className="carticon_div">
      <Link to="/cart"><ShoppingCartCheckoutIcon style={{fontSize:'5rem','cursor':'pointer'}} /> <b>{totalQuantity} </b> </Link>
          
      </div>
      </div>
      
      
      </div>

      <div className="foodie_section">
        {flag ? (
          <>
            {/* noodle section */}

            {nflag ? (
              <>
                <div className="food_heading">
                  <h2>Noodles</h2>
                </div>
                <div className="noodle_section">
                  {noodledata.map((val) => {
                    return (
                      <>
                        <Noodles vals={val} />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <div className="food_heading">
              <h2>Noodle section is empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
              </>
            )}

            {/* burger section */}

            {bflag ? (
              <>
                <div className="food_heading">
                  <h2>Burger</h2>
                </div>
                <div className="noodle_section">
                  {burgerdata.map((val) => {
                    return (
                      <>
                        <Burgers vals={val}  />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <div className="food_heading">
              <h2>Burger section is empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
              </>
            )}

            {/* Pizza section */}

            {pflag ? (
              <>
                <div className="food_heading">
                  <h2>Pizza</h2>
                </div>
                <div className="noodle_section">
                  {pizzadata.map((val) => {
                    return (
                      <>
                        <Pizza vals={val}  />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <div className="food_heading">
              <h2>Pizza section is empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
              </>
            )}

            {/* subway section */}

            {sflag ? (
              <>
                <div className="food_heading">
                  <h2>Subway</h2>
                </div>
                <div className="noodle_section">
                  {subwaydata.map((val) => {
                    return (
                      <>
                        <Subway vals={val}  />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <div className="food_heading">
              <h2>Subway section is empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
              </>
            )}

            {/* Garlic bread section */}

            {gflag ? (
              <>
                <div className="food_heading">
                  <h2>Garlic Bread</h2>
                </div>
                <div className="noodle_section">
                  {garlicbreaddata.map((val) => {
                    return (
                      <>
                        <Gbread vals={val}  />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <div className="food_heading">
              <h2>Garlic section is empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
              </>
            )}
          </>
        ) : (
          <>
            {/* <h1>Menu is empty!!!</h1> */}
            <div className="food_heading">
              <h2>Menu is Empty!!</h2>
              </div>
                
                <div className="cookdiv">
                <CookingLoader />
                </div>
                <button onClick={handleload} className="loadbtn">click to Load...</button>
          </>
        )}
      </div>
    </>
  );
};

export default ViewMenuRes;
