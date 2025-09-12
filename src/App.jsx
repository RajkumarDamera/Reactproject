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
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
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
      <span style={{ fontSize: "16px", display: "flex", alignItems: "center", gap: "4px" }}>
        {children}
      </span>
    </Link>
  );
};

function App() {
  const cartitems = useSelector((state) => state.cart || []);
  const CartCount = cartitems.reduce((sum, item) => sum + item.quantity, 0);
  const [search, setSearch] = useState("");

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
          gap: "5px",
        }}
      >
        {/* Top Row */}
        <div
          className="d-flex w-100 align-items-center justify-content-between"
          style={{ gap: "10px", flexWrap: "wrap" }}
        >
          {/* Logo */}
          <Link
            to="/Home"
            className="navbar-brand fw-bold d-flex align-items-center"
            style={{
              color: "#fff",
              fontSize: "20px",
              textShadow: "1px 1px 5px rgba(0,0,0,0.3)",
            }}
          >
            <FaShoppingCart /> MiniMart
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{
              borderRadius: "25px",
              padding: "6px 12px",
              border: "2px solid transparent",
              transition: "0.3s",
              flex: "1 1 200px",
              maxWidth: "350px",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          {/* Wishlist, Cart, Account */}
          <div className="d-flex gap-2 flex-wrap">
            <NavLink to="/Wishlist"><FaHeart /> Wishlist</NavLink>
            <NavLink to="/Cart"><FaShoppingCart /> Cart ({CartCount})</NavLink>
            <NavLink to="/Account"><FaUser /> Account</NavLink>
          </div>
        </div>

        {/* Bottom Row: Categories */}
        <div
          className="d-flex flex-wrap gap-2"
          style={{ alignItems: "center", marginTop: "5px" }}
        >
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
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-5 mt-5" style={{ paddingTop: "80px" }}>
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
