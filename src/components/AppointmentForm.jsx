import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

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

  const [doctors, setDoctors] = useState([]);

  const nameRegex = /^[A-Za-z ]+$/; // Only letters and spaces

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

    // Frontend name validation
    if (!nameRegex.test(firstName) || firstName.length < 3) {
      toast.error(
        "First Name must be at least 3 characters and contain only letters."
      );
      return;
    }

    if (!nameRegex.test(lastName) || lastName.length < 3) {
      toast.error(
        "Last Name must be at least 3 characters and contain only letters."
      );
      return;
    }

    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://hms-backend-deployed-f9l0.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);

      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="appointment-container appointment-form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type={dob ? "date" : "text"}
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!dob) e.target.type = "text";
            }}
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input
            type={appointmentDate ? "date" : "text"}
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!appointmentDate) e.target.type = "text";
            }}
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
          required
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
