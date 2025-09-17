import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiHamburger } from "react-icons/gi"; // React icon for Fastfood
import "./fastfood.css";

function Fastfood() {
  const dispatch = useDispatch();
  const FastfoodItems = useSelector((state) => state.Products.Fastfood);

  const [priceFilter, setPriceFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = priceFilter
    ? FastfoodItems.filter(
        (item) => item.price >= priceFilter[0] && item.price <= priceFilter[1]
      )
    : FastfoodItems;

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart 🛒`, { position: "top-right", autoClose: 2000 });
  };

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(item));
    toast.info(`${item.name} added to wishlist ❤️`, { position: "top-right", autoClose: 2000 });
  };

  const handlePriceFilter = (min, max) => {
    setPriceFilter([min, max]);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setPriceFilter(null);
    setCurrentPage(1);
  };

  return (
    <div className="container my-4">
      {/* Heading with React Icon */}
      <h2 className="text-center text-danger mb-4 fw-bold d-flex justify-content-center align-items-center gap-2">
        <GiHamburger size={36} /> Fast Food Items
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {/* Price Filter Buttons */}
          <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
            <button className="btn btn-outline-danger" onClick={() => handlePriceFilter(0, 100)}>0–100 Rs</button>
            <button className="btn btn-outline-danger" onClick={() => handlePriceFilter(101, 200)}>101–200 Rs</button>
            <button className="btn btn-outline-danger" onClick={() => handlePriceFilter(201, 500)}>201–500 Rs</button>
            {priceFilter && <button className="btn btn-secondary" onClick={clearFilter}>❌ Clear Filter</button>}
          </div>

          {/* Product Grid */}
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {currentItems.map((item) => (
              <div key={item.id} className="col">
                <div className="card fastfood-card h-100 position-relative shadow-sm hover-card">
                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm wishlist-btn"
                    onClick={() => handleAddToWishlist(item)}
                  >
                    ❤️
                  </button>

                  <img src={item.Imageurl} className="card-img-top fastfood-img rounded-top" alt={item.name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text text-muted small">{item.Discription}</p>
                    <h6 className="text-danger fw-bold mb-3">₹ {item.price}</h6>
                    <button className="btn btn-danger mt-auto rounded-pill shadow-sm" onClick={() => handleAddToCart(item)}>
                      Add To Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>⬅ Prev</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>Next ➡</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      <ToastContainer />

      <style>{`
        .spinner {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .spinner div {
          position: absolute;
          border: 4px solid #dc3545;
          opacity: 1;
          border-radius: 50%;
          animation: spinnerAnim 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .spinner div:nth-child(2) { animation-delay: -0.5s; }
        @keyframes spinnerAnim {
          0% { top: 36px; left: 36px; width: 0; height: 0; opacity: 0; }
          50% { width: 72px; height: 72px; top: 4px; left: 4px; opacity: 1; }
          100% { top: 36px; left: 36px; width: 0; height: 0; opacity: 0; }
        }
        .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-card:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0px 8px 20px rgba(0,0,0,0.15); }
        .fastfood-img { height: 180px; object-fit: cover; }
        .wishlist-btn { background: white; border: none; transition: transform 0.2s ease; }
        .wishlist-btn:hover { transform: scale(1.2); color: red; }
      `}</style>
    </div>
  );
}

export default Fastfood;
