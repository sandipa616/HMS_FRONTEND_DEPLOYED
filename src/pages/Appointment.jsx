import React from 'react';
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
     <div style={{ background: "#f5f7fa", minHeight: "100vh", padding: "2rem 1rem" }}>
     <div className="title-appointment-container">
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "#2c3e50",
          
        }}
      >
        Book Your Appointment
      </h1>
      <AppointmentForm />
    </div>
   </div>
  );
};

export default Appointment;






