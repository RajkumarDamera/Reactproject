import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="text-success mb-3">📝 This is the SignUp Page</h1>
      <Link to="/login" className="btn btn-primary rounded-pill">
        🔙 Back to Login
      </Link>
    </div>
  );
}

export default SignUp;
