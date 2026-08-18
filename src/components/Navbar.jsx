import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    navigate("/Login");
  };

  // Sub-header links
  const subLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Workouts", path: "/Workout" },
    { name: "Nutrition", path: "/Nutrition" },
    { name: "Progress", path: "/Progress" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
        }

        /* ===== MAIN NAVBAR ===== */
        .navbar-custom {
          background: var(--deep-navy);
          border-bottom: 1px solid rgba(182, 255, 59, 0.1);
          padding: 12px 0;
          font-family: 'Inter', sans-serif;
        }

        .brand-logo {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          letter-spacing: -1px;
        }

        .brand-logo span { color: var(--electric-lime); }

        .nav-link {
          color: rgba(255,255,255,0.7) !important;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: var(--electric-lime) !important;
          text-shadow: 0 0 10px rgba(182, 255, 59, 0.3);
        }

        /* ===== SUB HEADER ===== */
        .sub-header {
          background: var(--soft-navy);
          border-bottom: 1px solid rgba(182, 255, 59, 0.2);
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }

        .sub-header::-webkit-scrollbar { display: none; }

        .sub-nav-wrapper {
          display: flex;
          justify-content: right;
          gap: 2px;
        }

        .sub-nav-item {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 12px 20px;
          letter-spacing: 1px;
          transition: all 0.2s ease;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
          display: inline-block;
        }

        .sub-nav-item:hover {
          color: white;
          background: rgba(182, 255, 59, 0.05);
        }

        .sub-nav-item.active {
          background: var(--electric-lime);
          color: var(--deep-navy);
        }

        /* ===== PROFILE ICON ===== */
        .profile-icon-box {
          width: 42px;
          height: 42px;
          background: rgba(182, 255, 59, 0.1);
          border: 2px solid var(--electric-lime);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--electric-lime);
          clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%);
        }

        .dropdown-menu {
          background: #112235;
          border: 1px solid var(--electric-lime);
          border-radius: 0;
        }

        .dropdown-item { color: white !important; transition: 0.2s; }
        .dropdown-item:hover { background: var(--electric-lime); color: black !important; }

        @media (max-width: 991px) {
          .sub-nav-wrapper { justify-content: flex-start; padding: 0 10px; }
          .sub-nav-item { padding: 10px 15px; font-size: 0.6rem; }
        }
      `}</style>

      <header className="sticky-top shadow-lg">
        {/* Main Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <div className="container">
            <Link className="brand-logo" to="/">
              FITTRACK <span>PRO</span>
            </Link>

            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#fitNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="fitNavbar">
              <ul className="navbar-nav mx-auto text-center">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><a className="nav-link" href="#feedback">FeedBack</a></li>
                <li className="nav-item"><a className="nav-link" href="#pricing">Protocol</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              </ul>

              <div className="dropdown text-center">
                <button className="border-0 bg-transparent dropdown-toggle-split" data-bs-toggle="dropdown">
                  <div className="profile-icon-box mx-auto">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-0">
                  <li><Link className="dropdown-item py-2" to="/profile">My Dashboard</Link></li>
                  <li><button className="dropdown-item py-3 fw-bold text-info"  onClick={logout}>SIGN OUT</button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Always Visible Responsive Sub Header */}
        <div className="sub-header">
          <div className="container p-0">
            <div className="sub-nav-wrapper">
              {subLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`sub-nav-item ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;