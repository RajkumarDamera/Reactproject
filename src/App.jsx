import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaHome,
  FaAppleAlt,
  FaDrumstickBite,
  FaGlassWhiskey,
  FaHamburger,
  FaGift,
  FaPills,
  FaInfoCircle,
  FaPhone,
  FaBoxOpen,
  FaSignOutAlt,
  FaLock,
  FaUserPlus,
  FaBars,
} from "react-icons/fa";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Milk from "./Milk";
import Cart from "./Cart";
import Veg from "./Veg";
import Fastfood from "./fastfood";
import Nonveg from "./Nonveg";
import Wishlist from "./Wishlist";
import Perfumes from "./Perfumes";
import Medicen from "./Medicen";
import Notfound from "./Notfound";
import Orders from "./Orders";
import "./App.css";
import Account from "./Account";

// ✅ Active Link Helper
const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-decoration-none px-2 py-1 rounded"
      style={{
        color: isActive ? "#ffd700" : "#fff",
        fontWeight: isActive ? "bold" : "500",
        backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
        transition: "0.3s",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {children}
    </Link>
  );
};

// ✅ Auth Page (Login + Signup)
function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    if (isSignup) {
      const exists = users.find((u) => u.username === username);
      if (exists) {
        alert("User already exists!");
      } else {
        setUsers([...users, { username, password }]);
        alert("Signup successful! Please login.");
        setIsSignup(false);
      }
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        onLogin(username);
      } else {
        alert("Invalid credentials!");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0078ad, #00c6ff)",
        color: "#fff",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "380px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <h3 className="text-center mb-3 text-dark fw-bold">
          {isSignup ? (
            <>
              <FaUserPlus className="me-2 text-primary" />
              Create Account
            </>
          ) : (
            <>
              <FaLock className="me-2 text-primary" />
              Login
            </>
          )}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>
          <button
            className="btn btn-primary w-100 fw-bold"
            type="submit"
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const cartitems = useSelector((state) => state.cart || []);
  const CartCount = cartitems.reduce((sum, item) => sum + item.quantity, 0);
  const [search, setSearch] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  if (!loggedInUser) {
    return <AuthPage onLogin={setLoggedInUser} />;
  }

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav
        className="navbar fixed-top shadow-sm"
        style={{
          background: "#0078ad",
          backdropFilter: "blur(8px)",
          padding: "10px 15px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex w-100 align-items-center justify-content-between">
          {/* Logo */}
          <Link
            to="/Home"
            className="navbar-brand fw-bold d-flex align-items-center"
            style={{ color: "#fff", fontSize: "22px" }}
          >
            <FaShoppingCart className="me-2" /> MiniMart
          </Link>

          {/* Search Bar (always visible) */}
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mx-2"
            style={{
              borderRadius: "25px",
              padding: "6px 12px",
              border: "2px solid transparent",
              maxWidth: "300px",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          />

          {/* Right Side */}
          <div className="d-flex gap-2 align-items-center">
            <NavLink to="/Account">
              <FaUser /> {loggedInUser}
            </NavLink>
            <button
              className="btn btn-sm btn-danger d-flex align-items-center"
              onClick={() => setLoggedInUser(null)}
            >
              <FaSignOutAlt className="me-1" /> Logout
            </button>

            {/* ✅ Toggle Button (only mobile) */}
            <button
              className="btn btn-light d-md-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* ✅ Desktop Navbar Links (always visible on laptop/desktop) */}
        <div className="d-none d-md-flex gap-3 mt-2 flex-wrap">
          <NavLink to="/Home"><FaHome /> Home</NavLink>
          <NavLink to="/Veg"><FaAppleAlt /> Veg</NavLink>
          <NavLink to="/Nonveg"><FaDrumstickBite /> Nonveg</NavLink>
          <NavLink to="/Milk"><FaGlassWhiskey /> Milk</NavLink>
          <NavLink to="/Fastfood"><FaHamburger /> Fastfood</NavLink>
          <NavLink to="/Perfumes"><FaGift /> Perfumes</NavLink>
          <NavLink to="/Medicen"><FaPills /> Medicen</NavLink>
          <NavLink to="/AboutUs"><FaInfoCircle /> About Us</NavLink>
          <NavLink to="/Contact"><FaPhone /> Contact</NavLink>
          <NavLink to="/Orders"><FaBoxOpen /> Orders</NavLink>
          <NavLink to="/Wishlist"><FaHeart /> Wishlist</NavLink>
          <NavLink to="/Cart"><FaShoppingCart /> Cart ({CartCount})</NavLink>
        </div>

        {/* ✅ Mobile Collapsible Menu (toggle) */}
        {menuOpen && (
          <div className="d-flex flex-column mt-2 d-md-none gap-2">
            <NavLink to="/Home" onClick={handleCloseMenu}><FaHome /> Home</NavLink>
            <NavLink to="/Veg" onClick={handleCloseMenu}><FaAppleAlt /> Veg</NavLink>
            <NavLink to="/Nonveg" onClick={handleCloseMenu}><FaDrumstickBite /> Nonveg</NavLink>
            <NavLink to="/Milk" onClick={handleCloseMenu}><FaGlassWhiskey /> Milk</NavLink>
            <NavLink to="/Fastfood" onClick={handleCloseMenu}><FaHamburger /> Fastfood</NavLink>
            <NavLink to="/Perfumes" onClick={handleCloseMenu}><FaGift /> Perfumes</NavLink>
            <NavLink to="/Medicen" onClick={handleCloseMenu}><FaPills /> Medicen</NavLink>
            <NavLink to="/AboutUs" onClick={handleCloseMenu}><FaInfoCircle /> About Us</NavLink>
            <NavLink to="/Contact" onClick={handleCloseMenu}><FaPhone /> Contact</NavLink>
            <NavLink to="/Orders" onClick={handleCloseMenu}><FaBoxOpen /> Orders</NavLink>
            <NavLink to="/Wishlist" onClick={handleCloseMenu}><FaHeart /> Wishlist</NavLink>
            <NavLink to="/Cart" onClick={handleCloseMenu}><FaShoppingCart /> Cart ({CartCount})</NavLink>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-5 mt-5" style={{ paddingTop: "80px" }}>
        <h4 className="text-center mb-3">
          👋 Welcome, <span className="text-primary">{loggedInUser}</span>!
        </h4>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Fastfood" element={<Fastfood />} />
          <Route path="/Milk" element={<Milk />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/Nonveg" element={<Nonveg />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Perfumes" element={<Perfumes />} />
          <Route path="/Medicen" element={<Medicen />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
