import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AppointmentForm.css";

const AppointmentForm = ({ loggedInUser }) => {
  // ✅ Initialize state with loggedInUser values to avoid flicker
  const [firstName] = useState(loggedInUser?.firstName || "");
  const [lastName] = useState(loggedInUser?.lastName || "");
  const [email] = useState(loggedInUser?.email || "");
  const [phone] = useState(loggedInUser?.phone || "");
  const [dob] = useState(loggedInUser?.dob ? loggedInUser.dob.slice(0, 10) : "");
  const [gender] = useState(loggedInUser?.gender || "");
  const [address, setAddress] = useState(loggedInUser?.address || "");

  // Editable fields
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physiotherapy",
    "Dermatology",
    "Opthalmology",
    "Gynecology",
    "Odontology",
  ];

  // ✅ Only fetch doctors in useEffect
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hms-backend-deployed-f9l0.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hms-backend-deployed-f9l0.onrender.com/api/v1/appointment/post",
        {
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);

      // Reset only editable fields
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="appointment-container appointment-form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input type="text" value={firstName} readOnly />
          <input type="text" value={lastName} readOnly />
        </div>

        <div>
          <input type="email" value={email} readOnly />
          <input type="tel" value={phone} readOnly />
        </div>

        <div>
          <input type="date" value={dob} readOnly />
          <select value={gender} disabled>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
            required
          >
            {departmentsArray.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={JSON.stringify({ firstName: doctorFirstName, lastName: doctorLastName })}
            onChange={(e) => {
              const { firstName, lastName } = JSON.parse(e.target.value);
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department}
            required
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  key={index}
                  value={JSON.stringify({ firstName: doctor.firstName, lastName: doctor.lastName })}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="5"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div className="appointment-checkbox-row">
            <label htmlFor="hasVisited">
              Have you visited before?
              <input
                id="hasVisited"
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="appointment-button">
          <button type="submit" style={{ marginTop: "20px" }}>
            GET APPOINTMENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
