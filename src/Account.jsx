import React, { useState, useRef } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import "./Account.css";

function Account() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const loginUsernameRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const clearMessages = () => {
    setTimeout(() => {
      setErrors("");
      setSuccess("");
    }, 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = loginUsernameRef.current.value.trim();
    const password = loginPasswordRef.current.value.trim();
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      setSuccess("✅ Login successful!");
      setErrors("");
      setTimeout(() => setCurrentUser(foundUser), 1200);
    } else {
      setErrors("❌ Invalid username or password");
      setSuccess("");
    }
    clearMessages();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirm = confirmRef.current.value.trim();

    if (!username || !email || !password) {
      setErrors("⚠️ All fields are required");
      clearMessages();
      return;
    }
    if (password !== confirm) {
      setErrors("⚠️ Passwords do not match");
      clearMessages();
      return;
    }
    if (users.find(u => u.username === username)) {
      setErrors("⚠️ Username is already taken");
      clearMessages();
      return;
    }

    const newUser = { username, email, password };
    setUsers([...users, newUser]);
    setSuccess("🎉 Signup successful! You can now log in.");
    setIsRightPanelActive(false);
    clearMessages();
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="main-container">
        <div className="logged-in-container">
          <h3>Welcome, {currentUser.username}! 🎉</h3>
          <button onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className={`account-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>

        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <div className="input-group">
              <span className="icon"><FaUser /></span>
              <input type="text" placeholder="Username" ref={usernameRef} />
            </div>
            <div className="input-group">
              <span className="icon"><FaEnvelope /></span>
              <input type="email" placeholder="Email" ref={emailRef} />
            </div>
            <div className="input-group">
              <span className="icon"><FaLock /></span>
              <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <div className="input-group">
              <span className="icon"><FaLock /></span>
              <input type="password" placeholder="Confirm Password" ref={confirmRef} />
            </div>
            {errors && <p className="message error">{errors}</p>}
            {success && <p className="message success">{success}</p>}
            <button type="submit"><FaUserPlus style={{ marginRight: '8px' }}/>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="input-group">
              <span className="icon"><FaUser /></span>
              <input type="text" placeholder="Username" ref={loginUsernameRef} />
            </div>
            <div className="input-group">
              <span className="icon"><FaLock /></span>
              <input type="password" placeholder="Password" ref={loginPasswordRef} />
            </div>
            {errors && <p className="message error">{errors}</p>}
            {success && <p className="message success">{success}</p>}
            <button type="submit"><FaSignInAlt style={{ marginRight: '8px' }}/>Sign In</button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                <FaSignInAlt style={{ marginRight: '8px' }}/>Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                <FaUserPlus style={{ marginRight: '8px' }}/>Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;
