import React, { useState } from "react";
import profileimage from "./components/profileimage.jpg";
import "./Account.css";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function AccountPage() {
  const [userName, setUserName] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async() => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/");
  }
  const handleEditName = () => {
    const newName = prompt("Enter your new name:");
    if (newName) {
      setUserName(newName); 
    }
  };
  return (
    <>
      <div className="wrapper">
        <Link to="/todo">
          <button>Back</button>
        </Link>
        <h1>Account Details</h1>
        <img src={profileimage} alt="Profile Image" width="150" height="150" />
        <div className="details-container">
          <div className="label">
            <h3>Name:</h3>
            <br></br>
            <h3>Email:</h3>
          </div>

          <div className="value">
            <div className="value-name">
              <h3>{userName} <button onClick={handleEditName} className="edit-button"><FaEdit /></button></h3> 
              
            </div>
            <br></br>
            <div className="value-email">
              <h3>{user && user.email}</h3>
            </div>
            <br></br>
          </div>
        </div>
        
        <button onClick={handleLogout} className="sign-out-button">Sign Out</button>
      </div>
    </>
  );
}

export default AccountPage;
