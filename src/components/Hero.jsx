import React from "react";
import "./Hero.css";
const Hero = ({ title }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p>
          Medora is a trusted healthcare application developed in association
          with Hetauda Hospital, committed to delivering advanced medical
          services with heartfelt compassion and professional expertise. Our
          dedicated team collaborates closely with every patient to provide
          personalized care, ensuring comfort, confidence, and support
          throughout your healing journey. From diagnosis to recovery, Medora is
          here to guide and nurture your health and well-being—every step of the
          way.
        </p>
      </div>
    </div>
  );
};

export default Hero;
