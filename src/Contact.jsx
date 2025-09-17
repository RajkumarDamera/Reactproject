import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "50px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#2c3e50",
          fontWeight: "bold",
          fontSize: "36px",
        }}
      >
        📞 Contact Us
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                }}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 40px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2980b9")}
                onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaEnvelope
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 40px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2980b9")}
                onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaCommentDots
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "12px",
                  color: "#2980b9",
                }}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 40px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "8px",
                  fontSize: "16px",
                  resize: "none",
                  outline: "none",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2980b9")}
                onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: "14px 25px",
                backgroundColor: "#2980b9",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1c5980")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", color: "#27ae60" }}>
            <FaCheckCircle style={{ fontSize: "60px", marginBottom: "20px" }} />
            <h2>✅ Thank you for contacting us!</h2>
            <p>We will get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
