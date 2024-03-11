import React, { useState } from "react";
import "./RegisterForm.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';


const RegisterForm = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token',user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <Link to="/todo"><button type="submit" className="submit">Sign Up</button></Link>
        
      </form>
      <div className="register-link">
          <p>
            Already have an account?<Link to="/"> Log in here</Link>
          </p>
        </div>
    </div>
  );
};

export default RegisterForm;
