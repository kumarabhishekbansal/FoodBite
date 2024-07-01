import React,{useRef} from "react";

function PersonalInfo({ formData, setFormData }) {
  const ref = useRef()
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="Name..."
        name="fullName"
        value={formData.fullName}
        onChange={(e) => {
          setFormData({ ...formData, fullName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="User Name..."
        name="username"
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Date Of Birth..."
        value={formData.dob}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        name="dob"
        onChange={(e) => {
          setFormData({ ...formData, dob: e.target.value });
        }}
      />
      <input
        type="number"
        max={10}
        placeholder="Contact..."
        name="phone"
        value={formData.phone}
        onChange={(e) => {
          setFormData({ ...formData, phone: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;