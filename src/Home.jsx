import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import {
  FaShoppingCart,
  FaLeaf,
  FaGift,
  FaTruck,
  FaUserFriends,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Navigate = useNavigate();

  return (
    <div className="bg-body-tertiary text-dark d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-0 m-0">
        {/* Hero Video Section */}
        <section className="hero-section position-relative m-0 p-0">
          <video
            className="w-100 hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="imaes/picks/videozomatobackground.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="hero-overlay position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1 className="mini-mart-title d-flex align-items-center justify-content-center gap-3">
              <FaLeaf className="text-success" size={60} />
              <span className="fs-1 fw-bold text-white">MINI MART</span>
              <FaLeaf className="text-success" size={60} />
            </h1>
            <p className="fs-3 fw-light fst-italic mt-3">
              Fresh • Pure • Affordable • Local
            </p>
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-success btn-lg rounded-pill shadow-lg d-flex align-items-center gap-2 px-4 py-2"
                onClick={() => Navigate("/Veg")}
              >
                <FaShoppingCart /> Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Offer Banner */}
        <div className="bg-warning text-dark text-center py-2 fw-bold fs-5 shadow-sm d-flex align-items-center justify-content-center gap-2">
          <FaGift className="text-danger" size={24} />
          Special Offer: Get <span className="text-danger">20% OFF</span> on your
          first order! Use code <b>WELCOME20</b>
          <FaGift className="text-danger" size={24} />
        </div>

        {/* Shop by Category */}
        <section className="container my-5">
          <h2 className="text-center mb-4 fw-bold text-primary">
            <FaShoppingCart className="text-danger me-2" /> Shop by Category
          </h2>

          <div className="row g-4">
            {[
              {
                img: "imaes/picks/front-view-burgers-cutting-board.jpg",
                name: "Fastfood",
                description: "Tasty burgers & snacks ready to order",
              },
              {
                img: "imaes/picks/top-view-fresh-vegetables-with-greens-dark-background.jpg",
                name: "Organic Veg",
                description: "Fresh and healthy organic vegetables",
              },
              {
                img: "imaes/picks/cup-cappuccino-milkshake-with-whipped-cream-chocolate.jpg",
                name: "Milk Shakes",
                description: "Delicious milkshakes with cream & chocolate",
              },
              {
                img: "imaes/picks/stacked-aesthetic-objects-still-life.jpg",
                name: "Luxury Perfume",
                description: "Premium perfumes for a luxurious feel",
              },
            ].map((item, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="card product-card h-100 shadow-sm border-0 hover-card">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="card-img-top category-img"
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="text-muted small mb-3">{item.description}</p>
                    <button className="btn btn-outline-success btn-sm mt-auto d-flex align-items-center justify-content-center gap-2 mx-auto">
                      <FaShoppingCart /> Explore Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="container my-5">
          <div className="row text-center g-4">
            {[
              {
                icon: <FaLeaf size={50} className="text-success" />,
                title: "Fresh Products",
                desc: "Only the freshest products delivered to your door.",
              },
              {
                icon: <FaTruck size={50} className="text-primary" />,
                title: "Fast Delivery",
                desc: "Quick and reliable delivery at your convenience.",
              },
              {
                icon: <FaCheckCircle size={50} className="text-success" />,
                title: "Quality Guaranteed",
                desc: "Premium products with guaranteed quality.",
              },
              {
                icon: <FaStar size={50} className="text-warning" />,
                title: "Customer Satisfaction",
                desc: "Thousands of happy customers trust us.",
              },
            ].map((feat, i) => (
              <div className="col-12 col-md-3" key={i}>
                <div className="p-3 shadow-sm rounded bg-white h-100 d-flex flex-column align-items-center">
                  {feat.icon}
                  <h5 className="fw-bold mt-2">{feat.title}</h5>
                  <p className="small text-muted text-center">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-success text-white py-5">
          <div className="container text-center">
            <div className="row g-4">
              {[
                {
                  icon: <FaShoppingCart size={40} />,
                  value: "500+",
                  label: "Products",
                },
                {
                  icon: <FaUserFriends size={40} />,
                  value: "10,000+",
                  label: "Happy Customers",
                },
                {
                  icon: <FaTruck size={40} />,
                  value: "5,000+",
                  label: "Orders Delivered",
                },
              ].map((stat, i) => (
                <div className="col-12 col-md-4" key={i}>
                  {stat.icon}
                  <h3 className="fw-bold">{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container text-center my-5">
          <h2 className="fw-bold">Subscribe for Updates</h2>
          <p>Get the latest offers & discounts directly in your inbox.</p>
          <div className="d-flex justify-content-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control w-50"
            />
            <button className="btn btn-success">Subscribe</button>
          </div>
        </section>
      </main>

      {/* Styling */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
        }
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
        }
        .category-img {
          height: 180px;
          object-fit: cover;
        }
        .hero-video {
          height: 100vh;
          object-fit: cover;
        }
        .hero-overlay {
          text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
}