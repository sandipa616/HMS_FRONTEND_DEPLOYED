import React from 'react'
import './Biography.css';
const Biography = ({imageUrl}) => {
  return (
  
   <div className="biography-container">
      <div className="biography-content">
        
        <img src={"./about.jpg"} alt="Our Hospital Team" />
        </div>
        
        <div className="biography-text">
          <p className="title">Biography</p>
          <h3 className="subtitle">Who We Are</h3>
          <p>
            Our Hospital Management System is designed to simplify hospital operations and improve patient outcomes.
            The platform includes features like patient records, doctor scheduling,online appointment — all in one place.
          Built using modern web technologies, it ensures speed, security, and scalability in hospital administration.
         We're a team of passionate developers focused on creating digital tools for better healthcare.
          </p>
        </div>

      </div>

  );
};

export default Biography;