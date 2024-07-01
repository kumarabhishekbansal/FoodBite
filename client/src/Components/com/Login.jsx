import React,{useState,useEffect} from "react";
import "../com/Login.css";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { login,reset } from "../../Reducers/Auth/AuthSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [page, setPage] = useState(1);
  const [userdata,setuserdata] = useState({
    username: "",
    password: "",
  })
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
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

  const handleform=(e)=>{
    setuserdata((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }

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
      toast.success("Logging..");
      setTimeout(() => {
        navigate("/");
        dispatch(reset());
      }, 5000);
    } else {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const show = (e) => {
    e.preventDefault()
    if(!userdata.email || !userdata.password)
    {
      toast.error("please filled all data");
      return;
    }
    dispatch(login(userdata));
  }

  if (isLoading) {
    return <h1>loading.....</h1>
  }

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="image"></div>
          <div className="login-box">
            <div className="form-box">
              <form onSubmit={show}>
                <h2>Sign In</h2>
                <div className="input-box">
                  <span className="icon"></span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                    onChange={handleform}
                  />
                  <label>Enter Your Email</label>
                  <br />
                </div>
                <div className="input-box">
                  <span className="icon"></span>
                  <input type="password" name="password" required onChange={handleform}/>
                  <label>Password</label>
                  <br />
                </div>
                <div className="remember-forget">
                  <p>
                    <input type="checkbox" />
                    Remember me
                  </p>
                  <Link href="">Forgot Password?</Link>
                </div>
                <button type="submit" className="btn">
                  Login
                </button>

                <div className="login-register">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="#"
                      onClick={() => {
                        const next = 2;
                        setPage(next);
                      }}
                      className="register-link"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
        {page == 2 ? <Form /> : null}
      </div>
    </>
  );
};

export default Login;
