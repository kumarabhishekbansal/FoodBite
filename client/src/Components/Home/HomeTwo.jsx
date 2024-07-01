import React from 'react'
import "./NewHome.css"
import "./newHomemediaqueries.css"
import menu1 from "../NewHomeImages/menu1.jpg"
import menu2 from "../NewHomeImages/menu2.jpg"
import menu3 from "../NewHomeImages/menu3.jpg"
import menu4 from "../NewHomeImages/menu4.jpg"


const HomeTwo = () => {
  return (
    <>
        <section className="menu" id="menu">
          <h1 className="heading"> our delicious <span>menu</span> </h1>
          <ul className="list" data-aos="fade-down">
            <li className="btn active" data-src="../NewHomeImages/menu1.jpg">breakfast</li>
            <li className="btn " data-src="../NewHomeImages/menu2.jpg">lunch</li>
            <li className="btn  " data-src="../NewHomeImages/menu3.jpg">dinner</li>
            <li className="btn " data-src="../NewHomeImages/menu4.jpg">dessert</li>
          </ul>
          <div className="row" id="row" data-aos="fade-right">
            <div className="image" data-aos="fade-left">
              <img src={menu1} id="menu-img" alt="img" />
            </div>
            <div className="image" data-aos="fade-right">
              <img src={menu2} id="menu-img" alt="img" />
            </div>
            <div className="image" data-aos="fade-left">
              <img src={menu3} id="menu-img" alt="img" />
            </div>
            <div className="image" data-aos="fade-right">
              <img src={menu4} id="menu-img" alt="img" />
            </div>
            <div className="content">
              <div className="info">
                <h3 id="heading" onmouseover="document.getElementById('heading').style.fontFamily='Arial'" onmouseenter="document.getElementById('heading').style.color='blue'" onmouseleave="document.getElementById('heading').style.color='black'" onmouseout="document.getElementById('heading').style.fontFamily='Oswald'"> <span>01.</span> BEST BREAKFAST DISHES WE SERVE</h3>
                <p>Scrambled eggs on meat with fried potatoes and toast,Omelette with radish, green arugula and sandwich with salmon,Grilled club sandwich panini with ham, tomato, cheese, avocado and cup of coffee. </p>
              </div>
              <div className="info">
                <h3 id="heading2" onmouseover="document.getElementById('heading2').style.fontFamily='Arial'" onmouseenter="document.getElementById('heading2').style.color='blue'" onmouseleave="document.getElementById('heading2').style.color='black'" onmouseout="document.getElementById('heading2').style.fontFamily='Oswald'"> <span>02.</span> BEST LUNCH  DISHES WE SERVE</h3>
                <p>Grilled chicken breast and fresh vegetable salad,Baked salmon garnished with asparagus and tomatoes with herbs. </p>
              </div>
              <div className="info">
                <h3 id="heading3" onmouseover="document.getElementById('heading3').style.fontFamily='Arial'" onmouseenter="document.getElementById('heading3').style.color='blue'" onmouseleave="document.getElementById('heading3').style.color='black'" onmouseout="document.getElementById('heading3').style.fontFamily='Oswald'"> <span>03.</span>BEST DINNER DISHES WE SERVE</h3>
                <p>Traditional uzbek oriental cuisine, Indian dhal spicy curry in bowl, spices, herbs. </p>
              </div>
              <div className="info">
                <h3 id="heading4" onmouseover="document.getElementById('heading4').style.fontFamily='Arial'" onmouseenter="document.getElementById('heading4').style.color='blue'" onmouseleave="document.getElementById('heading4').style.color='black'" onmouseout="document.getElementById('heading4').style.fontFamily='Oswald'"> <span>04.</span> BEST DESSERT WE SERVE </h3>
                <p>Delicious tiramisu cake with fresh berries and mint,Pancakes with strawberries and chocolate decorated with mint leaf. </p>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default HomeTwo