import React from "react";

function AboutUs() {
  return (
    <div className="container my-5">
    
      <h2 className="text-center text-success fw-bold mb-4">About Mini Mart</h2>
      <p className="text-center text-muted mb-5">
        Welcome to <span className="fw-bold">Mini Mart</span>, your trusted
        neighborhood store where freshness meets affordability.
      </p>

      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4">
          <img
            src="imaes/picks/minimart.jpg"
            alt="Mini Mart Store"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-primary fw-bold">Our Story</h4>
          <p className="text-muted">
            Mini Mart was founded with a vision to bring farm-fresh groceries,
            dairy, and everyday essentials closer to your home. From fresh
            vegetables to quality non-veg items, we ensure that every product is
            sourced directly from farmers and trusted suppliers.
          </p>
          <h4 className="text-primary fw-bold mt-4">Our Mission</h4>
          <p className="text-muted">
            To provide healthy, affordable, and fresh products while building
            strong connections with our customers and local farmers. Your trust
            is our strength.
          </p>
        </div>
      </div>

   
      <h3 className="text-center text-danger fw-bold mb-4">Why Choose Mini Mart?</h3>
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0 rounded-3 h-100">
            <div className="card-body">
              <i className="bi bi-bag-check-fill text-success fs-1 mb-3"></i>
               <img
            src="imaes/picks/fressh.jpg" height="200" width="300"></img>
              <h5 className="fw-bold">Fresh & Quality</h5>
              <p className="text-muted">
                We deliver only the freshest fruits, vegetables, dairy, and
                groceries.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0 rounded-3 h-100">
            <div className="card-body">
              <i className="bi bi-truck text-primary fs-1 mb-3"></i>
               <img
            src="imaes/picks/fastdelivery.jpg" height="300" width="300"></img>
              <h5 className="fw-bold">Fast Delivery</h5>
              <p className="text-muted">
                Quick and reliable doorstep delivery at your convenience.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0 rounded-3 h-100">
            <div className="card-body">
              <i className="bi bi-people-fill text-warning fs-1 mb-3"></i>
               <img
            src="imaes/picks/coustmer.jpg" height="300" width="300"></img>
              <h5 className="fw-bold">Customer First</h5>
              <p className="text-muted">
                We prioritize customer satisfaction with affordable pricing and
                top service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Note */}
      <div className="text-center mt-5">
        <h4 className="text-success fw-bold">“Your Family’s Everyday Store”</h4>
        <p className="text-muted">
          Thank you for choosing Mini Mart. We’re committed to making your
          shopping easier and healthier every day!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
