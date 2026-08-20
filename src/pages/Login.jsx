import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("users", JSON.stringify(data.userData));
      data.userData.isAdmin ? navigate("/admin/users") : navigate("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
        }
/* PLACEHOLDER COLOR FIX */
.fitness-input::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
  opacity: 1; /* Required for Firefox */
}

.fitness-input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

.fitness-input::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Ensure the typing text is also pure white */
.fitness-input {
  color: #ffffff !important;
}
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--deep-navy);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .main-container {
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          display: flex;
          background: #112235;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          position: relative;
        }

        /* Image Side */
        .image-side {
          flex: 1.2;
          position: relative;
          background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat;
          display: none; /* Hidden on mobile */
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(12, 26, 43, 0.9), rgba(182, 255, 59, 0.2));
        }

        .image-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          color: white;
        }

        /* Form Side */
        .form-side {
          flex: 1;
          padding: 50px;
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
          margin-bottom: 30px;
        }

        .brand-logo span { color: var(--electric-lime); }

        .fitness-input {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: white !important;
          padding: 12px !important;
        }

        .fitness-input:focus {
          border-color: var(--electric-lime) !important;
          box-shadow: none !important;
        }

        .btn-lime {
          background: var(--electric-lime) !important;
          color: black !important;
          font-weight: 700;
          border-radius: 0 !important;
          text-transform: uppercase;
          padding: 12px;
          border: none;
          transition: 0.3s;
        }

        .btn-lime:hover {
          background: #a4e635 !important;
          transform: scale(1.02);
        }

        @media (min-width: 992px) {
          .image-side { display: block; }
        }

        @media (max-width: 576px) {
          .form-side { padding: 30px; }
        }
      `}</style>

      <div className="main-container">
        {/* Left Side: Interactive Image */}
        <div className="image-side">
          <div className="image-overlay"></div>
          <div className="image-content">
            <h2 className="display-5 fw-bold mb-3 heading-font">PUSH YOUR <span className="text-lime">LIMITS</span></h2>
            <p className="lead opacity-75">Connect to your personal training protocol and track your evolution.</p>
            <div className="mt-4 d-flex gap-2">
              <div style={{ width: '40px', height: '4px', background: 'var(--electric-lime)' }}></div>
              <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ width: '10px', height: '4px', background: 'rgba(255,255,255,0.3)' }}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="form-side">
          <div className="brand-logo">
            FITTRACK <span>PRO</span>
          </div>

          <h3 className="fw-bold mb-1 text-white">Welcome Back</h3>
          <p className="text-secondary small mb-4">Please enter your athlete credentials</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="text-secondary small fw-bold mb-1 d-block uppercase">Athlete Email</label>
              <input
                type="email"
                className="form-control fitness-input"
                name="email"
                placeholder="athlete@protocol.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-secondary small fw-bold mb-1 d-block uppercase">Secret Key</label>
              <input
                type="password"
                className="form-control fitness-input"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-lime w-100">
              Initiate Session
            </button>
          </form>

          <p className="mt-5 text-secondary small">
            New to the system? <Link to="/Register" className="text-lime text-decoration-none fw-bold">REGISTER HERE</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;