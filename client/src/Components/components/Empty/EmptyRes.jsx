import React, { useEffect } from "react";
import "./EmptyCart.css";
import { useNavigate } from "react-router-dom";
import { getuser } from "../../../Reducers/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const EmptyRes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleadminnavi = () => {
    navigate("/viewres");
  };

  const handleclientnavi = () => {
    navigate("/viewadminres");
  };

  useEffect(() => {
    if (user) {
      dispatch(getuser(user._id));
    }
  }, []);

  return (
    <>
      <div className="container_empty_res">
        <h1 className="empty_res_h1">Nothing to Show</h1>
        <p className="empty_res_p">Sorry, there is nothing to show here Or you can try to click on below button</p>
        {user.isAdmin?(<>
            <button onClick={handleadminnavi} className="hc_btn">
          View Restuarant
        </button>
        </>):(<>
            <button onClick={handleclientnavi} className="hc_btn">
          View Restuarant
        </button>
        </>)}


      </div>
    </>
  );
};

export default EmptyRes;
