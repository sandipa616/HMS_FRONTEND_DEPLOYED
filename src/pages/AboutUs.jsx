import React from "react";
import "./AboutUs.css";

const testimonials = [
  {
    name: "Anjali Thapa",
    photo: "/test1.png",
    feedback: "The care I received was outstanding. The staff were kind and attentive throughout my treatment."
  },
  {
    name: "Rajesh Shrestha",
    photo: "/test2.png",
    feedback: "Modern facilities and expert doctors made my recovery smooth and stress-free."
  },
  {
    name: "Mina Gurung",
    photo: "/test3.png",
    feedback: "I appreciated the digital updates and easy communication with the medical team."
  }
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="intro-section">
        <h2>About Us</h2>
       <p>
  Welcome to <strong>Medora</strong>, the digital healthcare platform of <strong>Hetauda Hospital</strong>, 
  where compassion meets cutting-edge medical care. We are dedicated to delivering exceptional health services 
  through modern technology and human-centered values.
</p>
<p>
  At Medora, our team of experienced doctors, nurses, and healthcare professionals work tirelessly to provide personalized care 
  in a comfortable, safe, and respectful environment. From emergency support to specialized treatments, we ensure each patient receives timely, 
  efficient, and quality medical attention.
</p>
<p>
  Our facilities include state-of-the-art diagnostic labs, fully equipped operation theaters, digital patient records,
   24/7 pharmacy access, and specialized departments like cardiology, neurology, pediatrics, orthopedics, and more.
    With Medora, patients and families can easily book appointments, access reports, and communicate with their care teams from
     the comfort of their homes.
</p>
<p>
  Your health is our highest priority—and at Medora, we walk with you every step of the way on your healing journey.
</p>

      </div>

      <div className="testimonials-section">
        <h3>What Our Patients Say</h3>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonial.photo} alt={testimonial.name} className="testimonial-photo" />
              <p className="testimonial-feedback">"{testimonial.feedback}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
