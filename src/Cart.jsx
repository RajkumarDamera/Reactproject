import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  placeOrder,
} from "./store";
import {
  caluculateTotal,
  caluculateButtonDiscount,
  applyCoupon,
} from "./discountUtils";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart || []);

  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponType, setCouponType] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [blast, setBlast] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // --- Price Calculations ---
  const totalPrice = caluculateTotal(cartItems);
  const discountAmount = caluculateButtonDiscount(totalPrice, discount);
  const finalPrice = totalPrice - discountAmount - couponDiscount;

  // --- Coupon ---
  const handleApplyCoupon = () => {
    const discountValue = applyCoupon(totalPrice, coupon);
    if (discountValue > 0) {
      setCouponDiscount(discountValue);
      setCouponMessage(`🎉 Coupon "${coupon.toUpperCase()}" applied successfully!`);
      setCouponType("success");
      setShowConfetti(true);
      setBlast(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setBlast(false), 800);
    } else {
      setCouponDiscount(0);
      setCouponMessage("⚠️ Invalid coupon ❌. Try RAJU10, RAJU20, RAJU30.");
      setCouponType("error");
      setBlast(false);
    }
  };

  // --- Checkout ---
  const handleCheckout = () => {
    if (!customerEmail) {
      alert("Please enter your email.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderId = Date.now();

    // EmailJS order summary
    const orderSummary = cartItems
      .map(
        (item) => `
        <div style="margin-bottom:15px;">
          <p><b>${item.name}</b></p>
          <p>Price: ₹${item.price} × ${item.quantity} = <b>₹${(
          item.price * item.quantity
        ).toFixed(2)}</b></p>
          <img src="${item.Imageurl}" alt="${item.name}" width="100" height="100" style="border-radius:8px;"/>
        </div>
        `
      )
      .join("");

    const templateParams = {
      order_id: orderId,
      orders: orderSummary,
      total: finalPrice.toFixed(2),
      shipping: 50,
      email: customerEmail,
    };

    emailjs
      .send("service_x1g48bn", "template_106atqs", templateParams, "o9aP_X4BuLuYjQDfo")
      .then(() => {
        alert("✅ Order confirmed! Confirmation email has been sent.");

        // Add order to Redux store
        dispatch(
          placeOrder({
            orderId,
            items: cartItems,
            total: finalPrice,
            email: customerEmail,
            paymentMethod,
            date: new Date().toISOString(),
          })
        );

        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("❌ Email sending failed:", error);
        alert("❌ Failed to send confirmation email.");
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f9f9, #e8f0f7)",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#2c3e50" }}>
        🛒 Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: "#7f8c8d" }}>
          Your cart is empty... Add some products!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  marginBottom: "20px",
                  padding: "15px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={item.Imageurl}
                  alt={item.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginRight: "20px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px", color: "#34495e" }}>{item.name}</h3>
                  <p style={{ margin: 0, color: "#e67e22", fontWeight: "600" }}>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    style={{
                      backgroundColor: "#ecf0f1",
                      border: "none",
                      padding: "8px 12px",
                      margin: "0 5px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    style={{
                      backgroundColor: "#ecf0f1",
                      border: "none",
                      padding: "8px 12px",
                      margin: "0 5px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      marginLeft: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Order Summary</h2>
              <p>Subtotal: <strong>₹{totalPrice.toFixed(2)}</strong></p>
              {discount > 0 && <p>Discount ({discount}%): -₹{discountAmount.toFixed(2)}</p>}
              {couponDiscount > 0 && <p>Coupon Discount: -₹{couponDiscount.toFixed(2)}</p>}
              <h2 style={{ marginTop: "20px", color: "#c0392b" }}>Total: ₹{finalPrice.toFixed(2)}</h2>

              {/* Discount Buttons */}
              <div style={{ marginTop: "20px" }}>
                <h3>Apply Discount</h3>
                {[10, 20, 30].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setDiscount(percent)}
                    style={{
                      backgroundColor: "#3498db",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      marginRight: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {percent}%
                  </button>
                ))}
                <button
                  onClick={() => setDiscount(0)}
                  style={{
                    backgroundColor: "#95a5a6",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Coupon */}
              <div style={{ marginTop: "20px" }}>
                <h3>Apply Coupon</h3>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #bdc3c7",
                    marginRight: "10px",
                  }}
                />
                <button
                  onClick={handleApplyCoupon}
                  style={{
                    backgroundColor: "#27ae60",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
                {couponMessage && (
                  <p
                    className={blast ? "blast-effect" : ""}
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      borderRadius: "10px",
                      fontWeight: "600",
                      backgroundColor: couponType === "success" ? "#d4efdf" : "#fdecea",
                      color: couponType === "success" ? "#1e8449" : "#c0392b",
                      border: `2px solid ${couponType === "success" ? "#27ae60" : "#e74c3c"}`,
                    }}
                  >
                    {couponMessage}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div style={{ marginTop: "20px" }}>
                <label>Enter your Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #bdc3c7",
                    width: "100%",
                  }}
                />
              </div>

              {/* Payment Method */}
              <div style={{ marginTop: "20px" }}>
                <h3>Select Payment Method:</h3>
                <button
                  onClick={() => setPaymentMethod("qr")}
                  style={{
                    padding: "10px 15px",
                    marginRight: "10px",
                    borderRadius: "8px",
                    border: paymentMethod === "qr" ? "2px solid #27ae60" : "1px solid #ccc",
                  }}
                >
                  QR Code
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: paymentMethod === "card" ? "2px solid #27ae60" : "1px solid #ccc",
                  }}
                >
                  Card
                </button>
              </div>

              {paymentMethod === "qr" && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h4>Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
                  <QRCode
                    value={`upi://pay?pa=6305627155-2@axl&pn=MiniMart&am=${finalPrice.toFixed(
                      2
                    )}&cu=INR`}
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h4>Enter Card Details</h4>
                  <p>👉 (Integrate Stripe / Razorpay here later)</p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                style={{
                  marginTop: "25px",
                  width: "100%",
                  padding: "15px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #27ae60, #2ecc71)",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(39,174,96,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🚀 Checkout & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Blast */}
      {showConfetti &&
        Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderRadius: "50%",
              animation: "confetti-fall 2.5s ease-out forwards",
            }}
          ></div>
        ))}

      <style>
        {`
          @keyframes confetti-fall {
            from { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .blast-effect {
            animation: blast 0.6s ease-in-out;
          }
          @keyframes blast {
            0% { transform: scale(0.7); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Cart;
