import React,{useState} from "react";
import "./info.css"
import si1 from "../Images/ui.jpg"
import convertToBase64 from "./helper/convert";
function Info({ formData, setFormData }) {
  const [img, setimg] = useState(null);
  
  const handleimage = async (e) => {
    const data = new FormData();
    const file=e.target.files[0];
    setimg(file);
    data.append("file", file);
    data.append("upload_preset", "FoodBite");
    data.append("cloud_name", "dbhnxaw3m");
    try {
      fetch("https://api.cloudinary.com/v1_1/dbhnxaw3m/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setimg(data.url);
          setFormData({ ...formData, profile: data.url })
        })
        .catch((err) => console.log("error"));
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="other-info-container">
      
      <div className="signup_profile_container">
                <img
                  src={img || si1}
                  alt=""
                  className="signup_profile_pic"
                />
                <label htmlFor="profile" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input
                 onChange={handleimage}
                  type="file"
                  id="profile"
                  hidden
                  name="profile"

                />
              </div>
      
    
    </div>
  );
}

export default Info;