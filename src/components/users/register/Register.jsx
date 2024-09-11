import React, { useContext, useEffect, useState } from "react";
import "../register/register.css";
import { handleLogin, handleRegister } from "../../services/Service";
import { useNavigate } from "react-router-dom";

function Register() { 

  const [formData, setFormData] = useState({ userName: "", email: "", password: "",});
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [alertMessage,setAlertMessage] = useState('')
  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleLoginFunction = async()=>{
    const data = await handleLogin(formData);
    setAlertMessage(data.message);
    console.log(data,'DaTAAAAAAAAAAAAAAAAAAAaaaa');
    
    if(data.status){
      localStorage.setItem('userName',data?.name)
      localStorage.setItem('isLoggedIn',data?.status)
      localStorage.setItem('userId',data?.userId)
      document.cookie = `email=${formData.email}`
      
      setTimeout(()=>{
        navigate('/')
      },1000)
    }
    
    
  }
  const handleRegisterFunction = async()=>{
    const data = await handleRegister(formData)
    console.log(data);
    
    setAlertMessage(data)
  }

  function handleSubmit(e) {
    e.preventDefault();
    isLoginForm ? handleLoginFunction() : handleRegisterFunction();  
    if(alertMessage === "User Registered Successfully!") {
      setFormData({ userName: "", email: "", password: "" });
    }
    setTimeout(()=>{
      setAlertMessage('')
    },1000)
  }

  return (
    <>
      <div className="register-form-main-container">
        <div className="register-form-sub-container">
          <form action="" onSubmit={handleSubmit}>
            <div className="register-form-inner-container">
              <h1 className="register-tagline">
                {isLoginForm ? "Login" : "Signup Here"}
              </h1>
              {isLoginForm ? '' : <input type="text" placeholder="Enter your username" onChange={(e) => handleChange(e)} value={formData.userName} name="userName" required />}
              <input type="email" placeholder="Enter Your email" onChange={(e) => handleChange(e)} value={formData.email} name="email" required />
              <input type="password" placeholder={isLoginForm ? "Enter Your password" : "Create a password"} onChange={(e) => handleChange(e)} value={formData.password} name="password" required/>
              <button id="register-form-btn">Submit</button>
              <p id="login-message">{alertMessage}</p>
            </div>
          </form>
          <span>Click here to Sigup{" "} <button className="is-login-btn" onClick={() => setIsLoginForm(!isLoginForm)} > Signup </button></span>
        </div>
      </div>
    </>
  );
}

export default Register;
