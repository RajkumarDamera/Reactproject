import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const username = usernameref.current.value.trim();
    const password = passwordref.current.value.trim();

    if (!username) {
      newErrors.username = "⚠ Username is required";
    } else if (username.length < 3) {
      newErrors.username = "⚠ Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "⚠ Password is required";
    } else if (password.length < 6) {
      newErrors.password = "⚠ Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    if (validateForm()) {
      const username = usernameref.current.value.trim();
      const password = passwordref.current.value.trim();

      // ✅ Hardcoded login check
      if (username === "Rajkumar" && password === "123456") {
        setSuccess("✅ Login successful! Welcome Rajkumar 🎉");

        setTimeout(() => {
          navigate("/home");
        }, 1500);

        usernameref.current.value = "";
        passwordref.current.value = "";
      } else {
        setErrors({ auth: "❌ Invalid username or password" });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-light">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          width: "380px",
          background: "linear-gradient(135deg, #ffffff, #f1f5ff)",
          border: "none",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">🔐 Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">👤 Username</label>
            <input
              type="text"
              ref={usernameref}
              className={`form-control shadow-sm ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter your username"
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">🔑 Password</label>
            <input
              type="password"
              ref={passwordref}
              className={`form-control shadow-sm ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {errors.auth && (
            <p className="text-danger text-center fw-bold">{errors.auth}</p>
          )}

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary rounded-pill shadow-sm"
            >
              🚀 Login
            </button>
          </div>
        </form>

        {success && (
          <p className="text-success text-center mt-3 fw-bold">
            {success}
          </p>
        )}

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none text-primary fw-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
