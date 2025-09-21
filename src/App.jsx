import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Context } from "./main";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App = () => {
  const {  user,setUser ,isAuthenticated, setIsAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hms-backend-deployed-f9l0.onrender.com/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, []);  

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />}/>
        </Routes>
         <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
