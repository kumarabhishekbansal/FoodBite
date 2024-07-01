import React from "react";

import { useState } from "react";

import PWDReq from "./com/PWDReq";

const Regis = () => {
  const [page, setPage] = useState(0);

  const [password, setPassword] = useState("");
  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnFocus = () => {
    setPWDRquisite(true);
  };

  const handleOnBlur = () => {
    setPWDRquisite(false);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const show = (object) => {
    object.preventDefault();
  };

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
                    type="text"
                    name="fullname"
                    required
                    autoComplete="off"
                  />
                  <label>Enter Your Name</label>
                  <br />
                </div>
                <div className="input-box">
                  <span className="icon"></span>
                  <input
                    type="text"
                    name="username"
                    required
                    autoComplete="off"
                  />
                  <label>Enter User Name</label>
                  <br />
                </div>
                <div className="input-box">
                  <span className="icon"></span>
                  <input
                    type="number"
                    name="phone"
                    required
                    autoComplete="off"
                  />
                  <label>Enter Your Contact number</label>
                  <br />
                </div>
                <div className="input-box">
                  <span className="icon"></span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                  />
                  <label>Enter Your Email</label>
                  <br />
                </div>
                <div className="input-box">
                  <span className="icon"></span>
                  <input
                    type="password"
                    name="password"
                    required
                    className="input-field"
                    id="password"
                    value={password}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyUp={handleOnKeyUp}
                  />
                  <label>Password</label>
                  {pwdRequiste ? (
                    <PWDReq
                      capsLetterFlag={
                        checks.capsLetterCheck ? "valid" : "invalid"
                      }
                      numberFlag={checks.numberCheck ? "valid" : "invalid"}
                      pwdLengthFlag={
                        checks.pwdLengthCheck ? "valid" : "invalid"
                      }
                      specialCharFlag={
                        checks.specialCharCheck ? "valid" : "invalid"
                      }
                    />
                  ) : null}
                </div>

                <div className="remember-forget">
                  <p>
                    <input type="checkbox" />
                    Remember me
                  </p>
                  <a href="">Forgot Password?</a>
                </div>
                <button
                  type="submit"
                  className="btn"
                  onClick={() => {
                    const next = 2;
                    setPage(next);
                  }}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regis;
