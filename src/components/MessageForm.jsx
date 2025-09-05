import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import './MessageForm.css';

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Regex patterns same as backend
  const nameRegex = /^[A-Za-z ]+$/;
  const phoneRegex = /^\d{10}$/;

  const handleMessage = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (!nameRegex.test(firstName) || firstName.length < 3) {
      toast.error("First Name must have at least 3 letters and only alphabets.");
      return;
    }
    if (!nameRegex.test(lastName) || lastName.length < 3) {
      toast.error("Last Name must have at least 3 letters and only alphabets.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    if (message.length < 10) {
      toast.error("Message must contain at least 10 characters.");
      return;
    }

    try {
      const res = await axios.post(
        "https://hms-backend-deployed-f9l0.onrender.com/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(res.data.message || "Message sent successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please check your connection and try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Send Message</h2>
      <form onSubmit={handleMessage}>
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
        <div className="text-message">
          <textarea
            rows={6}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
