import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Details</h2>

      <div className="contact-info">
        <p>
          <strong>📍 Address:</strong> Hetauda, Makwanpur, Nepal
        </p>
        <p>
          <strong>📞 Phone:</strong> +977-57-520000
        </p>
        <p>
          <strong>📧 Email:</strong> contact@medora.com
        </p>
        <p>
          <strong>🏥 OPD Hours:</strong> Sunday – Friday | 9:00 AM – 5:00 PM
        </p>
        <p>
          <strong>⏰ Emergency Services:</strong> Available 24/7
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.412935809857!2d85.02926591453799!3d27.43068888290186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ebfddf2b9e89b9%3A0x7aab13d3eb9ec14!2sHetauda%20Hospital!5e0!3m2!1sen!2snp!4v1686138450722!5m2!1sen!2snp"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
