import React, { useState } from "react";
import Rescards from "../rescards/Rescards";
import "./style.css";
import { Link } from "react-router-dom";
const ViewMenu = () => {
  return (
    <>
      <div className="mainsection">
        {/* heading  */}
        
        <h1 className="memuhead text-center mt-4">
          <Link to='/viewadminres'>
          View Resturants
          </Link>
        </h1>
       




        <div className="carddiv">
          <Rescards />

        </div>
      </div>
    </>
  );
};

export default ViewMenu;
