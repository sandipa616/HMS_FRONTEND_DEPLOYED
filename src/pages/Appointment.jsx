import React, { useContext } from "react";
import { Context } from "../main"; // your context
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  const { user } = useContext(Context); // get logged-in patient

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
        <AppointmentForm loggedInUser={user} /> {/* Pass user here */}
      </div>
    </div>
  );
};

export default Appointment;
