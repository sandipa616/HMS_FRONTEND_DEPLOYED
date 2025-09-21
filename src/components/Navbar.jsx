import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import './Navbar.css';
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user,setUser,isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
  try {
    const res = await axios.get(
      "https://hms-backend-deployed-f9l0.onrender.com/api/v1/user/patient/logout",
      { withCredentials: true }
    );
    toast.success(res.data.message);
    setIsAuthenticated(false); // update auth state
    setUser(null);             // clear user data
    // <-- REMOVE navigate("/login")
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    
      <nav className={"navcontainer"}>
        <div className="nav-logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="nav-links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              AboutUs
            </Link>
            <Link to={"/contact"} onClick={() => setShow(!show)}>
              Contact
            </Link>
          
          
          {isAuthenticated ? (
            <button className="nav-logoutBtn navbtn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="nav-loginBtn navbtn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
         
          </div>
        </div>
       <div className="nav-hamburger" onClick={() => setShow(!show)}>
  {show ? <IoMdClose /> : <GiHamburgerMenu />}
          
        </div>
      </nav>
    
  );
};

export default Navbar;  