import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./Footer.css"; // Optional: if you want to add styling here

const Footer = () => {
  const hours = [
    { id: 1, day: "Sunday – Friday", time: "9:00 AM – 5:00 PM (OPD)" },
    { id: 2, day: "Emergency", time: "Available 24/7" },
  ];

  return (
    <footer className="footer-container">
      <hr />
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src="/logo.png" alt="Medora Logo" className="logo-img" />
         
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div className="footer-hours">
          <h4>Hours</h4>
          <ul>
            {hours.map((element) => (
              <li key={element.id}>
                <span>{element.day}</span>
                <br />
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p><FaPhone /> +977-57-520000</p>
          <p><MdEmail /> contact@medora.com</p>
          <p><FaLocationArrow /> Hetauda, Makwanpur, Nepal</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Medora Hospital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
