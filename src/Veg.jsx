import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "./store";
import "./Veg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Veg() {
  const dispatch = useDispatch();
  const Vegitems = useSelector((state) => state.Products.Veg);

  // ✅ Price filter state (null = all products)
  const [priceFilter, setPriceFilter] = useState(null);

  // ✅ Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading for effect
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Apply filter if selected
  const filteredItems = priceFilter
    ? Vegitems.filter(
        (item) => item.price >= priceFilter[0] && item.price <= priceFilter[1]
      )
    : Vegitems;

  // ✅ Pagination
  const itemsPerPage = 8; // show 8 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Handlers
  const handleAddToCart = (Vegitem) => {
    dispatch(addToCart(Vegitem));
    toast.success(`${Vegitem.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (Vegitem) => {
    dispatch(addToWishlist(Vegitem));
    toast.info(`${Vegitem.name} added to wishlist ❤️`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handlePriceFilter = (min, max) => {
    setPriceFilter([min, max]);
    setCurrentPage(1); // reset page
  };

  const clearFilter = () => {
    setPriceFilter(null);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="text-center text-success mb-4 fw-bold">
          🥦 Fresh Vegetables
        </h2>

        {/* ✅ Custom Stylish Spinner */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div className="custom-spinner"></div>
          </div>
        ) : (
          <>
            {/* Price Filter Buttons */}
            <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
              <button
                className="btn btn-outline-success"
                onClick={() => handlePriceFilter(0, 100)}
              >
                0–100 Rs
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => handlePriceFilter(101, 200)}
              >
                101–200 Rs
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => handlePriceFilter(201, 500)}
              >
                201–500 Rs
              </button>
              {priceFilter && (
                <button className="btn btn-danger" onClick={clearFilter}>
                  ❌ Clear Filter
                </button>
              )}
            </div>

            {/* Product Grid */}
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {currentItems.map((Vegitem) => (
                <div key={Vegitem.id} className="col">
                  <div className="card veg-card h-100 position-relative shadow-sm hover-card">
                    {/* Wishlist Icon */}
                    <button
                      className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                      onClick={() => handleAddToWishlist(Vegitem)}
                    >
                      ❤️
                    </button>

                    <img
                      src={Vegitem.Imageurl}
                      className="card-img-top veg-img rounded-top"
                      alt={Vegitem.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{Vegitem.name}</h5>
                      <p className="card-text text-muted small">
                        {Vegitem.Discription}
                      </p>
                      <h6 className="text-danger fw-bold mb-3">
                        ₹ {Vegitem.price}
                      </h6>
                      <button
                        className="btn btn-success mt-auto rounded-pill shadow-sm"
                        onClick={() => handleAddToCart(Vegitem)}
                      >
                        Add To Cart 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        ⬅ Prev
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        Next ➡
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}

        <ToastContainer />

        {/* Extra CSS */}
        <style>{`
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
          }
          .veg-img {
            height: 180px;
            object-fit: cover;
          }

          /* ✅ Custom Stylish Spinner */
          .custom-spinner {
            width: 70px;
            height: 70px;
            border: 6px solid transparent;
            border-top: 6px solid #28a745;
            border-right: 6px solid #ffc107;
            border-bottom: 6px solid #dc3545;
            border-left: 6px solid #0d6efd;
            border-radius: 50%;
            animation: spin 1s linear infinite, glow 1.5s ease-in-out infinite alternate;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes glow {
            0% {
              box-shadow: 0 0 10px #28a745, 0 0 20px #ffc107, 0 0 30px #dc3545, 0 0 40px #0d6efd;
            }
            100% {
              box-shadow: 0 0 20px #0d6efd, 0 0 30px #28a745, 0 0 40px #ffc107, 0 0 50px #dc3545;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default Veg;
