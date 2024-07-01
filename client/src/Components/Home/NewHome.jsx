import React from "react";
import "./NewHome.css";
import "./newHomemediaqueries.css";
import { Link } from "react-router-dom";
// import home1 from "../NewHomeImages/home-img.jpg";
const NewHome = () => {
  return (
    <>
      {/* home section starts  */}
      <section className="home" id="home">
        <div className="content" data-aos="fade-right">
          <h3 id="content_heading">SAY GOODBYE TO PLANNING AND COOKING</h3>
          <p
            id="p1"
            onmouseenter="document.getElementById('p1').style.color='green'"
            onmouseleave="document.getElementById('p1').style.color='darkgrey'"
          >
            Because we're delievering fresh chef prepared, glutten free meals,
            made with the cleanest ingredients on earth right to your door.
          </p>
          <Link to="/menu">
            <button
              onmouseover="this.innerHTML='Welcome to my website'"
              onmouseleave="this.innerHTML='Get Started'"
              className="linkbtn btn"
            >
              get started
            </button>
          </Link>
        </div>
        <div className="image" data-aos="fade-up">
          {/* <img src={home1} alt="" /> */}
        </div>
      </section>
      {/* home section ends */}

      {/* about section starts  */}
      <section className="about" id="about">
        <div className="image" data-aos="fade-right" />
        <div className="content" data-aos="fade-left">
          <h3
            id="head-ing"
            onmouseenter="document.getElementById('head-ing').style.fontFamily='Verdana'"
            onmouseleave="document.getElementById('head-ing').style.color='Black'"
          >
            A WORD ABOUT US
          </h3>
          <p
            id="p2"
            onmouseover="document.getElementById('p2').style.color='green'"
            onmouseleave="document.getElementById('p2').style.color='grey'"
          >
            This is a family friendly casual website serving fresh authentic
            cuisine representing the traditional comfort foods at Caribbean and
            Mexico, many of which are not currently available in the Central New
            York region. We offer a unique menu with food and drink selections
            from the Carribbean will be offered with daily specials so focus on
            specific national fireflies . We offer an extensive take-out menu
            and coding for special events and parties.{" "}
          </p>
          <p
            id="p3"
            onmouseenter=" document.getElementById('p3').style.color='orange'"
          >
            We love how food brings people together and are passionate about
            cooking for our customers.You are our Boss! Our job is to make you
            happy, and we look forward for sharing our food with you soon.
          </p>
          <Link to="/">
            <button
              className=" linkbtn btn"
              onmouseover="this.innerHTML='A Word About Us'"
              onmouseleave="this.innerHTML='learn more'"
            >
              learn more
            </button>
          </Link>
        </div>
      </section>
      {/* about section ends */}
    </>
  );
};

export default NewHome;
