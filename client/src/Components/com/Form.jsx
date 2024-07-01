import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpInfo from "../com/signupInfo";
import PersonalInfo from "../com/PersonalInfo";
import OtherInfo from "../com/OtherInfo";
import Login from "./Login";
import Info from "../com/Info";
import "../new.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../Reducers/Auth/AuthSlice";
function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    fullName: "",
    username: "",
    phone: "",
    street: "",
    state: "",
    city: "",
    dob: "",
    profile: "",
    zipcode: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    token,
    username,
    isAdmin,
    Address,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log("message : ", message);
      toast.error(message);
      // notify(message);
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    } else if (isSuccess || user) {
      console.log(message);
      toast.success("Registering.. Please check your mail");
      setTimeout(() => {
        navigate("/");
        dispatch(reset());
      }, 5000);
    } else {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!formData.profile) {
      toast.error("Provide profile image.....");
      return;
    } else if (
      (!formData.email,
      !formData.password,
      !formData.confirmpassword,
      !formData.fullName,
      !formData.username,
      !formData.phone,
      !formData.street,
      !formData.state,
      !formData.city,
      !formData.Dob,
      !formData.profile,
      !formData.zipcode)
    ) {
      toast.warning("please filled all data");
      return;
    } else if (formData.password !== formData.confirmpassword) {
      toast.error("password not matched");
      return;
    } else {
      return dispatch(register(formData));
    }
  };

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  const FormTitles = ["Sign Up", "Personal Info", "Other", "Add Profile Pic"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <Info formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="body">
      <div className="box">
        <div className="form-container">
          <div className="progressbar">
            <div
              style={{
                width:
                  page === 0
                    ? "0%"
                    : page === 1
                    ? "25%"
                    : page === 2
                    ? "50%"
                    : "100%",
              }}
            ></div>
          </div>

          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="bodyy">{PageDisplay()}</div>
          <div className="footer">
            {page > 0 ? (
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
            ) : null}
            <button
              type="submit"
              onClick={() => {
                if (page === FormTitles.length - 1) {
                  handleSubmit();
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
          <div className="login-register">
            <p>
              Existing Customer?{" "}
              <Link
                to="/login"
                onClick={() => {
                  <Login />;
                }}
                className="register-link"
              >
                Sign in
              </Link>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Form;
