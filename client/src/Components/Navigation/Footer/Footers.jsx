import React from "react";
import './style.css';
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
const Footers=()=>{
    return(
    <>
<div className="main_footer_div">
            <div className="sec_foot1">
                <div className="div1">
                       <h2>Company</h2>
                    <div className="link_foots">
                        <Link to='/'>Home</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='/'>About us</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='/'>FAQ's</Link>
                    </div>    
                </div>

                <div className="div2">
                <h2>Reach Us</h2>
                    <div className="link_foots">
                        <Link to='/'>Phone : +123456</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='https://mail.google.com/mail'>Email Id</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='/'>Contact us</Link>
                    </div>    
                </div>

                <div className="div3">
                <h2>Services</h2>
                    <div className="link_foots">
                        <Link to='/profile'>Add Resturant</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='/'>Add Tiffin Service</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='/'>Friend Zone</Link>
                    </div>  

                    <div className="link_foots">
                        <Link to='/'>Join US</Link>
                    </div>  

                    <div className="link_foots">
                        <Link to='/'>Advertise</Link>
                    </div>  
                </div>

                <div className="div4">
                <h2>Social</h2>
                    <div className="link_foots">
                        <Link to='https://www.instagram.com/abhi_s.he.k?r=nametag'>Instagram</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='https://www.linkedin.com/in/abhishek-1a9541205'>Facebook</Link>
                    </div>   

                    <div className="link_foots">
                        <Link to='https://www.linkedin.com/in/abhishek-1a9541205'>Linkedin</Link>
                    </div>  

                    <div className="link_foots">
                        <Link to='https://www.instagram.com/abhi_s.he.k?r=nametag'>Twitter</Link>
                    </div>   
                </div>
            </div>
            <Divider />
            <div className="sec_foot2">
            <div>
                <ul className="mbb">
                    <li>About   |</li>
                    <li>Privacy policy   |</li>
                    <li>Security   |</li>
                    <li>Legal info </li>
                </ul>
             </div>
                <Divider />
             <div className="bt">
             <h2 className="text-center text-warning">© 2023 FoodBite</h2>
             </div>
            </div>
    </div>
    </>
    )
}

export default Footers;