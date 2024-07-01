import React from "react";
import "./style.css";
import "./newHomemediaqueries.css"
import Work from "../Ques/Works/Work";
import SideBar from "./SideBar";
import NewHome from "./NewHome";
import HomeTwo from "./HomeTwo";
import GallerySection from "./GallerySection";
import ContactUs from "./ContactUs";
const Home = () => {
  return (
    <>
    <NewHome />
    
      {/* <div className="image-container mt-4">
        <h1 className="image-text">
          Part of the secret of a success in life is to eat what you like and
          let the food fight it out inside.
        </h1>
      </div> */}
        
      

      <div className="works">
        <Work />
      </div>

      <HomeTwo />
      <div className="sidebar">
        <SideBar />
      </div>
      
      <GallerySection />

      <ContactUs />
    </>
  );
};

export default Home;
