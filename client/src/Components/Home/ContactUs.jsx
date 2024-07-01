import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./NewHome.css";
import "./newHomemediaqueries.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactimg from "../NewHomeImages/contact-bg.jpg";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

let API_URL = "/api/msg/";

const ContactUs = () => {
  const { user } = useSelector((state) => state.auth);

  const [msgdata, setmsgdata] = useState({
    username: "",
    useremail: "",
    usersubject: "",
    usermessage: "",
  });

  const fetchdata = () => {
    console.log("fetch data user");
    if (user) {
      setmsgdata({
        ...msgdata,
        useremail: user.email,
        username: user.username,
      });
    }
  };

  const handlechange = (e) => {
    setmsgdata({ ...msgdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (
      !msgdata.username ||
      !msgdata.useremail ||
      !msgdata.usersubject ||
      !msgdata.usermessage
    ) {
      toast.error("please filled all data");
      return;
    } else {
      console.log("msgdata ", msgdata);
      const data = {
        userId: user._id,
        username: msgdata.username,
        useremail: msgdata.useremail,
        usersubject: msgdata.usersubject,
        usermessage: msgdata.usermessage,
      };
      const response = await axios.post(API_URL + "addmessage", data);
      if (response.data.message && response.status === 200) {
        toast.success(response.data.message);
        setmsgdata({...msgdata,
          username: "",
          useremail: "",
          usersubject: "",
          usermessage: "",
        });
        console.log(msgdata);
        // window.location.reload(false);
      } else if (response.data.message && response.status !== 200) {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    }
  };

  return (
    <>
      <section className="order" id="order">
        <h1 className="heading">
          {" "}
          Contact <span>Us</span>{" "}
        </h1>
        <MDBRow>
          <MDBCol lg="8">
            <form
              id="form"
              className="text-center col-12 formcontact modal_inpt"
              style={{ width: "100%", maxWidth: "500px" }}
              onSubmit={handlesubmit}
            >
              <MDBInput
                label="Name"
                v-model="name"
                wrapperClass="mb-4"
                className="inputcontact modal_inpt"
                name="username"
                onChange={handlechange}
              />

              <MDBInput
                type="email"
                label="Email address"
                v-model="email"
                wrapperClass="mb-4"
                className="inputcontact modal_inpt"
                name="useremail"
                onChange={handlechange}
              />

              <MDBInput
                label="Subject"
                v-model="subject"
                wrapperClass="mb-4"
                className="inputcontact modal_inpt"
                onChange={handlechange}
                name="usersubject"
              />

              <MDBTextArea
                wrapperClass="mb-4"
                label="Message"
                className="messagecontact modal_inpt"
                name="usermessage"
                onChange={handlechange}
              />

              <MDBBtn color="primary" block className="my-4">
                Send
              </MDBBtn>
              <ToastContainer />
            </form>
          </MDBCol>

          <MDBCol lg="4">
            <div className="image" data-aos="fade-left">
              <img src={contactimg} alt="" />
            </div>
          </MDBCol>
        </MDBRow>
      </section>
    </>
  );
};

export default ContactUs;
