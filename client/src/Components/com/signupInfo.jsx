import React from "react";
import { useState } from "react";
import PWDReq from "./PWDReq";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

function SignUpInfo({ formData, setFormData }) {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const [password, setPassword] = useState("");
  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  // const handleOnChange = (e) => {
  //   setPassword(e.target.value);
  // };

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

  return (
    <div className="sign-up-container">
      <input
        required
        type="email"
        name="email"
        placeholder="Email..."
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />

      <input
        type={type}
        placeholder="Password..."
        name="password"
        value={formData.password}
        className="pass"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyUp={handleOnKeyUp}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
        required
      />
      <span onClick={handleToggle} className="toggle">
        <Icon icon={icon} size={20} />
      </span>

      {pwdRequiste ? (
        <PWDReq
          capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
          numberFlag={checks.numberCheck ? "valid" : "invalid"}
          pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
          specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
        />
      ) : null}

      <input
        type={type}
        placeholder="Confirm Password..."
        name="confirmpassword"
        value={formData.confirmpassword}
        className="pass"
        onChange={(event) =>
          setFormData({ ...formData, confirmpassword: event.target.value })
        }
      />
      <span onClick={handleToggle} className="toggle">
        <Icon icon={icon} size={20} />
      </span>
    </div>
  );
}

export default SignUpInfo;
