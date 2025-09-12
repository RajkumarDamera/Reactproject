import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Orders() {
  const orders = useSelector((state) => state.orders || []);

  // Generate Invoice PDF
  const handleDownloadInvoice = async (orderId) => {
    const input = document.getElementById(`invoice-${orderId}`);
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`MiniMart_Invoice_${orderId}.pdf`);
  };

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2 style={{ color: "red" }}>❌ No Orders Found</h2>
        <p style={{ color: "gray" }}>Looks like you haven’t placed any orders yet.</p>
      </div>
    );
  }

  // Show latest orders first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📦 Your Orders</h1>

      {sortedOrders.map((order, idx) => (
        <div
          key={order.orderId || idx}
          style={{
            background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Order Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ margin: 0, color: "#333" }}>
              🆔 Order ID:{" "}
              <span style={{ color: "#007bff" }}>#ORD-{order.orderId || idx + 1}</span>
            </h3>
            <span
              style={{
                background: "#28a745",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              ✅ Confirmed
            </span>
          </div>

          {/* Invoice Section */}
          <div
            id={`invoice-${order.orderId || idx}`}
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #007bff",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h1 style={{ margin: 0, color: "#007bff" }}>MiniMart 🛒</h1>
                <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                  Smart Shopping, Better Living
                </p>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                alt="MiniMart Logo"
                style={{ width: "60px", height: "60px" }}
              />
            </div>

            <h2 style={{ textAlign: "center", color: "#222" }}>🧾 Invoice</h2>
            <p>
              <strong>Customer:</strong> {order.email || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.date).toLocaleString()}
            </p>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "15px",
              }}
            >
              <thead>
                <tr style={{ background: "#007bff", color: "white" }}>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Image</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Qty</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(order.items) &&
                  order.items.map((item, i) => (
                    <tr
                      key={item.id || i}
                      style={{
                        background: i % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      }}
                    >
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {item.name || "N/A"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={item.Imageurl || ""}
                          alt={item.name || ""}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        ₹{item.price?.toFixed(2) || "0.00"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity || 0}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <h3 style={{ textAlign: "right", marginTop: "15px", color: "#000" }}>
              Grand Total: ₹{(order.total || 0).toFixed(2)}
            </h3>
          </div>

          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button
              onClick={() => handleDownloadInvoice(order.orderId || idx)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#007bff",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⬇️ Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
