import React from "react";
import { 
  FaLeaf, FaTruck, FaSmile, FaSeedling, FaHandsHelping, FaStar 
} from "react-icons/fa";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">About Mini Mart</h1>
        <p className="about-subtitle">
          Welcome to <span className="highlight">Mini Mart</span>, your trusted neighborhood store where freshness meets affordability.
        </p>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="story-image">
          <img src="images/picks/minimart.jpg" alt="Mini Mart Store" />
        </div>
        <div className="story-content">
          <h2><FaLeaf className="icon"/> Our Story</h2>
          <p>
            Mini Mart was founded to bring fresh groceries, dairy, and essentials directly from farmers to your home. Every product is carefully sourced for quality and freshness.
          </p>
          <h2><FaHandsHelping className="icon"/> Our Mission</h2>
          <p>
            We aim to provide healthy, affordable products while supporting local farmers and building lasting relationships with our customers.
          </p>
        </div>
      </section>

      {/* Why Choose Mini Mart */}
      <section className="about-why">
        <h2 className="section-title"><FaStar className="icon"/> Why Choose Mini Mart?</h2>
        <div className="cards">
          <div className="card">
            <FaSeedling className="card-icon"/>
            <img src="images/picks/fressh.jpg" alt="Fresh" />
            <h3>Fresh & Quality</h3>
            <p>We deliver the freshest fruits, vegetables, dairy, and groceries for your family.</p>
          </div>

          <div className="card">
            <FaTruck className="card-icon"/>
            <img src="images/picks/fastdelivery.jpg" alt="Fast Delivery" />
            <h3>Fast Delivery</h3>
            <p>Quick and reliable doorstep delivery at your convenience.</p>
          </div>

          <div className="card">
            <FaSmile className="card-icon"/>
            <img src="images/picks/coustmer.jpg" alt="Customer First" />
            <h3>Customer First</h3>
            <p>We prioritize customer satisfaction with affordable pricing and excellent service.</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values">
        <h2 className="section-title"><FaHandsHelping className="icon"/> Our Values</h2>
        <div className="values-list">
          <div className="value">
            <FaLeaf className="value-icon"/> Sustainability
          </div>
          <div className="value">
            <FaSeedling className="value-icon"/> Freshness
          </div>
          <div className="value">
            <FaStar className="value-icon"/> Quality
          </div>
          <div className="value">
            <FaSmile className="value-icon"/> Customer Happiness
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="about-closing">
        <h2>“Your Family’s Everyday Store”</h2>
        <p>
          Thank you for choosing Mini Mart. We’re committed to making your shopping easier, healthier, and happier every day!
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
