import React from "react";

function OtherInfo({ formData, setFormData }) {
  return (
    <div className="other-info-container">
      <input
        type="text"
        placeholder="Street..."
        name="street"
        value={formData.street}
        onChange={(e) => {
          setFormData({ ...formData, street: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="State..."
        name="state"
        value={formData.state}
        onChange={(e) => {
          setFormData({ ...formData, state: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="City..."
        name="city"
        value={formData.city}
        onChange={(e) => {
          setFormData({ ...formData, city: e.target.value });
        }}
      />
        <input
        type="text"
        placeholder="Zip Code..."
        name="zipcode"
        value={formData.zipcode}
        onChange={(e) => {
          setFormData({ ...formData, zipcode: e.target.value });
        }}
      />

    </div>
  );
}

export default OtherInfo;