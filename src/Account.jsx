import React, { useState, useRef } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

// The CSS is now included directly in the component via a <style> tag.
// This makes the component self-contained.
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

    :root {
      --primary-color: #6B4DE6;
      --secondary-color: #48329E;
      --white-color: #FFFFFF;
      --light-gray-color: #F6F5F7;
      --dark-gray-color: #333;
      --error-color: #e74c3c;
      --success-color: #2ecc71;
      --border-radius: 10px;
      --box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background: var(--light-gray-color);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      margin: -20px 0 50px;
    }

    .main-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    
    .logged-in-container {
        background-color: var(--white-color);
        padding: 40px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        text-align: center;
        width: 100%;
        max-width: 400px;
    }

    .logged-in-container h3 {
        color: var(--dark-gray-color);
        margin-bottom: 20px;
    }

    .account-container {
      background-color: var(--white-color);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      position: relative;
      overflow: hidden;
      width: 768px;
      max-width: 100%;
      min-height: 480px;
    }

    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
    }
    
    .form-container form {
      background-color: var(--white-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 50px;
      height: 100%;
      text-align: center;
    }

    h1 {
      font-weight: bold;
      margin: 0;
      color: var(--dark-gray-color);
    }
    
    p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }

    .input-group {
      position: relative;
      margin: 8px 0;
      width: 100%;
    }

    .input-group input {
      background-color: #eee;
      border: none;
      padding: 12px 15px 12px 40px;
      margin: 8px 0;
      width: 100%;
      border-radius: 8px;
    }
    
    .input-group .icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }

    button {
      border-radius: 20px;
      border: 1px solid var(--primary-color);
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      color: var(--white-color);
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    button:active {
      transform: scale(0.95);
    }

    button:focus {
      outline: none;
    }

    button.ghost {
      background-color: transparent;
      border-color: var(--white-color);
      background: none;
    }
    
    .message {
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 14px;
        width: 100%;
    }

    .message.error {
        background-color: #f8d7da;
        color: #721c24;
    }

    .message.success {
        background-color: #d4edda;
        color: #155724;
    }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
    }

    .overlay {
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color)) no-repeat 0 0 / cover;
      color: var(--white-color);
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 40px;
      text-align: center;
      top: 0;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-left {
      transform: translateX(-20%);
    }

    .overlay-right {
      right: 0;
      transform: translateX(0);
    }
    
    /* Animation */
    .account-container.right-panel-active .sign-in-container {
      transform: translateX(100%);
    }

    .account-container.right-panel-active .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.6s;
    }
    
    @keyframes show {
      0%, 49.99% {
        opacity: 0;
        z-index: 1;
      }
      50%, 100% {
        opacity: 1;
        z-index: 5;
      }
    }

    .account-container.right-panel-active .overlay-container {
      transform: translateX(-100%);
    }
    
    .account-container.right-panel-active .overlay {
      transform: translateX(50%);
    }
    
    .account-container.right-panel-active .overlay-left {
      transform: translateX(0);
    }

    .account-container.right-panel-active .overlay-right {
      transform: translateX(20%);
    }

  `}</style>
);


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

    if (!username || !email || !password || !confirm) {
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
    setErrors("");
    // After successful signup, switch to the login panel
    setTimeout(() => {
        setIsRightPanelActive(false);
    }, 1000);
    clearMessages();
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="main-container">
        <GlobalStyles />
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
      <GlobalStyles />
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
