import React, { useState } from "react";

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
        background: "linear-gradient(135deg, #f9f9f9, #e8f0f7)",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
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
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#34495e" }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#34495e" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#34495e" }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "6px",
                  fontSize: "16px",
                  resize: "none",
                }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: "12px 25px",
                backgroundColor: "#2980b9",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1c5980")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2980b9")}
            >
              Send Message
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", color: "#27ae60" }}>
            <h2>✅ Thank you for contacting us!</h2>
            <p>We will get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
