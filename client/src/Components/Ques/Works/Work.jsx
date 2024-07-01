import React from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { SendToMobile } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MDBCardText,
} from "mdb-react-ui-kit";
import "./style.css";
const Work = () => {
  return (
    <>
      <h2 className="Workhead"> How It Works ?</h2>
      <p className="workpara">It is just a 4 step process to use this website or get amazing benefits and offers</p>
    <div className="cardswork">

    {/* card1 */}


      <Card className="cardwork">
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Step 1
          </Typography>
          <Divider />
          <MDBCardText color="text.secondary" className="carddesbody">
            Create Your account with FoodBite
          </MDBCardText>
          <Divider />
        </CardContent>
        <CardActions>
        <Link to='/register' ><Button variant="contained" endIcon={<SendToMobile className="card_link_icon"/> } color="primary" className="cardbtn">Register</Button></Link>
        <Link to='/login'><Button variant="contained" endIcon={<SendToMobile className="card_link_icon" />} color="secondary" className="cardbtn">Login</Button></Link>
        
        </CardActions>
      </Card>



      {/* card2 */}



      <Card  className="cardwork">
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Step 2
          </Typography>
          <Divider />
          <MDBCardText  color="text.secondary" className="carddesbody">
            View Your Resturant and add order in your cart
          </MDBCardText>
          <Divider />
        </CardContent>
        <CardActions>
        <Link to='/'><Button variant="contained" endIcon={<HomeIcon className="card_link_icon" />} color="success" className="cardbtn">Home</Button></Link>
        <Link to='/cart'><Button variant="contained" endIcon={<ShoppingCartIcon className="card_link_icon" />} color="warning" className="cardbtn" >Cart</Button></Link>
        </CardActions>
      </Card>

{/* card3 */}

    
<Card  className="cardwork">
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Step 3
          </Typography>
          <Divider />
          <MDBCardText  color="text.secondary" className="carddesbody">
            Done your payment via online transactions or you can use your wallet with amazing offers and cashback points.
          </MDBCardText>
          <Divider />
        </CardContent>
        <CardActions>
        <Link to='/cart'><Button variant="contained" endIcon={<ShoppingCartIcon className="card_link_icon" />} color="warning" className="cardbtn">Cart</Button></Link>
        </CardActions>
      </Card>



      {/* card4 */}



      <Card  className="cardwork">
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Step 4
          </Typography>
          <Divider />
          <MDBCardText  color="text.secondary" className="carddesbody">
            Get your order at your home with 5 star rating delivery Person
          </MDBCardText>
          <Divider />
        </CardContent>
        <CardActions>
        
        <Link to='/menu'><Button variant="contained" endIcon={<RestaurantMenuIcon className="card_link_icon" />} color="success" className="cardbtn">Menu</Button></Link>
          
        </CardActions>
      </Card>


      </div>
    </>
  );
};

export default Work;
