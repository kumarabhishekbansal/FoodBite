import React from 'react'
import "./NewHome.css"
import "./newHomemediaqueries.css"
import img1 from "../NewHomeImages/img1.jpg"
import img2 from "../NewHomeImages/img2.jpg"
import img3 from "../NewHomeImages/img3.jpg"
import img4 from "../NewHomeImages/img4.jpg"
import img5 from "../NewHomeImages/img5.jpg"
import img6 from "../NewHomeImages/img6.jpg"
const GallerySection = () => {
  return (
    <>
              {/* gallery section starts  */}
      <section className="gallery" id="gallery">
        <h1 className="heading">
          {" "}
          our food <span>gallery</span>{" "}
        </h1>
        <div className="box-container">
          <div className="box" data-aos="fade-up">
            <img src={img1} alt="" />
            <h3>delicious food</h3>
          </div>
          <div className="box" data-aos="fade-up">
            <img src={img2} alt="" />
            <h3>tasteful food</h3>
          </div>
          <div className="box" data-aos="fade-up">
            <img src={img3} alt="" />
            <h3>flavorful food</h3>
          </div>
          <div className="box" data-aos="fade-up">
            <img src={img4} alt="" />
            <h3>edible food</h3>
          </div>
          <div className="box" data-aos="fade-up">
            <img src={img5} alt="" />
            <h3>spicy food</h3>
          </div>
          <div className="box" data-aos="fade-up">
            <img src={img6} alt="" />
            <h3>sweet food</h3>
          </div>
        </div>
      </section>
      {/* gallery section ends */}
    </>
  )
}

export default GallerySection