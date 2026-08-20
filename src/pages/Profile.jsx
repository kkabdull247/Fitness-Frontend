import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    weight: '',
    height: '',
    image: '',
    imagePreview: ''
  });
  const user = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        height: user.height,
        weight: user.weight,
        image: user.image
      });
    }
  }, []);


  // const handleChange = (e) => {
  //   if (e.target.name == "image") {
  //     setFormData({
  //       ...formData,
  //       image: e.target.files[0]
  //     })
  //   }
  //   else {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // };


  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:3000/editProfile", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: formData.id,
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: formData.address,
  //       height: formData.height,
  //       weight: formData.weight,
  //     }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     alert(data.msg);
  //     const updatedUser = {
  //       ...user,
  //       ...formData
  //     };

  //     localStorage.setItem("users", JSON.stringify(updatedUser));
  //   }
  //   console.log(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = new FormData();

    if (formData.id) {
      payload.append("id", formData.id);
    }

    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    const response = await fetch(`${import.meta.env.VITE_API_URL}/editProfile`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: payload,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.msg);
      const updatedUser = {
        ...user,
        ...formData,
      };

      localStorage.setItem("users", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="profile-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
        }

        .profile-page {
          background-color: var(--deep-navy);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: white;
          padding: 40px 20px;
        }

        .soft-card {
          background: var(--soft-navy);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }

        .section-title {
          border-left: 4px solid var(--electric-lime);
          padding-left: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          background: var(--electric-lime);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 50px;
          font-weight: 800;
          margin: 0 auto 20px;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        }

        .profile-avatar img{
          width: 100%;
          height:100%;
          object-fit:cover;
        }

        .fitness-input {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: white !important;
          padding: 15px !important;
        }

        .fitness-input:focus {
          border-color: var(--electric-lime) !important;
          box-shadow: none !important;
          background: rgba(255,255,255,0.05) !important;
        }

        .fitness-input option {
          background: var(--deep-navy);
          color: white;
        }

        .btn-lime {
          background: var(--electric-lime) !important;
          color: black !important;
          font-weight: 800;
          border-radius: 0 !important;
          text-transform: uppercase;
          border: none;
          padding: 12px 30px;
          transition: 0.3s;
          letter-spacing: 1px;
        }

        .btn-lime:hover {
          background: #d4ff8a !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(182, 255, 59, 0.3);
        }

        .btn-dashboard {
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 8px 16px;
          text-decoration: none;
          transition: 0.3s;
          display: inline-block;
          background: transparent;
        }

        .btn-dashboard:hover {
          border-color: var(--electric-lime);
          color: var(--electric-lime);
        }

        .info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--electric-lime);
          letter-spacing: 1px;
          font-weight: 700;
          margin-bottom: 5px;
          display: block;
        }

        .text-lime { color: var(--electric-lime) !important; }
      `}</style>

      <div className="container">
        {/* Navigation Action */}
        <div className="mb-4 d-flex justify-content-end">
          <button onClick={() => navigate('/dashboard')} className="btn btn-dashboard">
            View Dashboard
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">

            {/* PROFILE HEADER CARD (USES formData) */}
            <div className="soft-card p-5 mb-4 text-center">
              {/* <div className="profile-avatar mb-3">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "A"}
              </div> */}
              {/* <div className="profile-avatar mb-3">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile Avatar"
                    className="avatar-img"
                  />
                ) : (
                  formData.name ? formData.name.charAt(0).toUpperCase() : "A"
                )}
              </div> */}

              <div className="profile-avatar mb-3">
                {formData.imagePreview || formData.image ? (
                  <img
                    src={formData.imagePreview || formData.image}
                    alt="Profile Avatar"
                    className="avatar-img"
                  />
                ) : (
                  formData.name ? formData.name.charAt(0).toUpperCase() : "A"
                )}
              </div>


              <h2 className="fw-800 heading-font mb-1" style={{ letterSpacing: '-1px', color: '#fff' }}>
                {formData.name.toUpperCase() || "ATHLETE PROFILE"}
              </h2>
              <p className="text-white-50 small uppercase mb-4" style={{ letterSpacing: '2px' }}>
                Access Level: <span style={{ color: 'var(--electric-lime)' }}>Elite Operative</span>
              </p>

              <div className="mx-auto mb-4" style={{ height: '1px', width: '50px', background: 'var(--electric-lime)', opacity: '0.5' }}></div>

              <div className="row g-3 justify-content-center">
                <div className="col-12 col-md-4">
                  <small className="text-lime d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Email Address</small>
                  <span className="text-white opacity-75">{formData.email || "notset@protocol.com"}</span>
                </div>

                <div className="col-12 col-md-4 border-start border-secondary border-opacity-25">
                  <small className="text-lime d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Phone Line</small>
                  <span className="text-white opacity-75">{formData.phone || "+00 000 0000"}</span>
                </div>

                <div className="col-12 col-md-4 border-start border-secondary border-opacity-25">
                  <small className="text-lime d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Base Location</small>
                  <span className="text-white opacity-75">{formData.address || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* FORM CARD (USES formData) */}
            <div className="soft-card p-4 p-md-5">
              <h5 className="section-title mb-5">Update Account Protocol</h5>

              <form onSubmit={handleSubmit} encType='multipart/form-data'>

                {/* <input type="text" value={formData.id}
                      onChange={handleChange}/> */}
                <div className="row g-4">
                  {/* --- BASIC INFO --- */}
                  <div className="col-md-6">
                    <label className="info-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control fitness-input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="info-label">Athlete Email</label>
                    <input
                      type="email"
                      className="form-control fitness-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  {/* --- SYSTEM INFO --- */}
                  <div className="col-md-6">
                    <label className="info-label">Contact Phone</label>
                    <input
                      type="text"
                      className="form-control fitness-input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="info-label">Home Address / Location</label>
                    <input
                      type="text"
                      className="form-control fitness-input"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA"
                    />
                  </div>
                  {/* --- BIOMETRICS SECTION --- */}
                  <div className="col-md-4">
                    <label className="info-label">Current Weight (kg)</label>
                    <input
                      type="text"
                      className="form-control fitness-input"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="75.0"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="info-label">Height (cm)</label>
                    <input
                      type="text"
                      className="form-control fitness-input"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="180"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="info-label">Upload Profile Picture</label>

                    {/* Actual Input Hidden Hai */}
                    <div style={{ display: "inline-block" }}>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        style={{ display: "none" }} // input hide
                      />
                      <label
                        htmlFor="image"
                        style={{
                          backgroundColor: "transparent",
                          color: "white",
                          border: "2px solid #B6FF3B",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        Choose File
                      </label>
                    </div>


                  </div>



                  {/* --- TRAINING INTEL --- */}






                  <div className="col-12 mt-5">
                    <button type="submit" className="btn btn-lime w-100 py-3">
                      Sync Profile Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Profile;