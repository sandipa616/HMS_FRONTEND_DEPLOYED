import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AppointmentForm.css";

const AppointmentForm = ({ loggedInUser }) => {
  // Patient details (prefilled)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

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

  // Prefill patient details whenever loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setFirstName(loggedInUser.firstName || "");
      setLastName(loggedInUser.lastName || "");
      setEmail(loggedInUser.email || "");
      setPhone(loggedInUser.phone || "");
      setDob(loggedInUser.dob ? loggedInUser.dob.slice(0, 10) : "");
      setGender(loggedInUser.gender || "");
      setAddress(loggedInUser.address || "");
    }
  }, [loggedInUser]);

  // Fetch doctors
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
          address,
          hasVisited,
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
            type="text" // start as text to show placeholder
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")} // change to date picker on click
            onBlur={(e) => !appointmentDate && (e.target.type = "text")} // revert if empty
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
            value={JSON.stringify({
              firstName: doctorFirstName,
              lastName: doctorLastName,
            })}
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
                  value={JSON.stringify({
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                  })}
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
