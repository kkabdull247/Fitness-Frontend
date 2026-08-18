import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/Login");
    } else {
      const data = await response.json();
      alert(data.msg);
    }
  };

  return (
    /* 1. Added overflow: hidden and h-100 to the wrapper to kill all scroll */
    <div className="login-wrapper" style={{ height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
        }

        .fitness-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1;
        }

        .fitness-input::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--deep-navy);
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }

        /* 2. Changed min-height to height: 85vh to ensure it stays in view */
        .main-container {
          width: 100%;
          max-width: 1100px;
          height: 85vh; 
          display: flex;
          background: #112235;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          position: relative;
        }

        .image-side {
          flex: 1.2;
          position: relative;
          background: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat;
          display: none; 
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(12, 26, 43, 0.95), rgba(182, 255, 59, 0.1));
        }

        .image-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 50px;
          color: white;
        }

        .form-side {
          flex: 1;
          padding: 30px 50px; /* Reduced vertical padding slightly */
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #112235;
        }

        .brand-logo {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .brand-logo span { color: var(--electric-lime); }

        .fitness-input {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: white !important;
          padding: 8px 12px !important; /* Tighter inputs */
          font-size: 0.9rem;
        }

        .fitness-input:focus {
          border-color: var(--electric-lime) !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: none !important;
        }

        .btn-lime {
          background: var(--electric-lime) !important;
          color: black !important;
          font-weight: 800;
          border-radius: 0 !important;
          text-transform: uppercase;
          padding: 10px;
          border: none;
          letter-spacing: 1px;
          transition: 0.3s;
          margin-top: 5px;
        }

        .label-style {
          color: rgba(255,255,255,0.5);
          font-size: 0.65rem; /* Slightly smaller labels */
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 3px;
          display: block;
        }

        @media (min-width: 992px) {
          .image-side { display: block; }
        }

        @media (max-width: 768px) {
          .form-side { padding: 30px; }
          .main-container { height: 95vh; } /* Give more room on mobile */
        }
      `}</style>

      <div className="main-container">
        <div className="image-side">
          <div className="image-overlay"></div>
          <div className="image-content">
            <h2 className="display-4 fw-bold mb-3 heading-font" style={{ lineHeight: 1.1 }}>
              JOIN THE <br />
              <span style={{ color: 'var(--electric-lime)' }}>ELITE SQUAD</span>
            </h2>
            <p className="lead opacity-75 mb-4">Start your journey with the world's most advanced performance tracker.</p>
            <div className="d-flex gap-2 mt-auto">
              <div style={{ width: '60px', height: '4px', background: 'var(--electric-lime)' }}></div>
              <div style={{ width: '30px', height: '4px', background: 'rgba(255,255,255,0.2)' }}></div>
            </div>
          </div>
        </div>

        <div className="form-side">
          <div className="brand-logo">
            FITTRACK <span>PRO</span>
          </div>

          <div className="mb-3">
            <h3 className="fw-bold mb-1 text-white heading-font" style={{fontSize: '1.4rem'}}>CREATE PROFILE</h3>
            <p className="text-secondary small mb-0">Initialize your athlete credentials</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mb-2">
                <label className="label-style">Full Name</label>
                <input
                  type="text"
                  className="form-control fitness-input shadow-none"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-2">
                <label className="label-style">Athlete Email</label>
                <input
                  type="email"
                  className="form-control fitness-input shadow-none"
                  name="email"
                  placeholder="name@protocol.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label className="label-style">Security Key</label>
                <input
                  type="password"
                  className="form-control fitness-input shadow-none"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label className="label-style">Contact Phone</label>
                <input
                  type="tel"
                  className="form-control fitness-input shadow-none"
                  name="phone"
                  placeholder="+1 (555) 000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-lime w-100">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="mt-4 text-secondary small text-center mb-0">
            Already registered? <Link to="/Login" className="text-lime text-decoration-none fw-bold">LOGIN HERE</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;