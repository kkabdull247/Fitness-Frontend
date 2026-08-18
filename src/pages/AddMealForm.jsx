import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function AddMealForm() {
  const navigate = useNavigate();

  // State Management
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [foodOptions, setFoodLibrary] = useState([]);

  const selectedFoodObj = foodOptions.find(
    (item) => item._id === selectedFood
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName) {
      alert("Meal Name Field is required!");
      return;
    }
    if (!selectedFood || !quantity) {
      alert("Please select a food and enter quantity first.");
      return;
    }
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/meal/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        mealName: mealName,
        food: selectedFood,
        quantity: Number(quantity),
        mealType: mealType
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.msg);
      setSelectedFood('');
      setQuantity('');
      setMealName('');
      setTimeout(() => {
        navigate('/Nutrition');
      }, 2000);
    } else {
      toast.error(data.msg);
    }

  };

  const fetchFood = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/food", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFoodLibrary(data.food);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);


  return (
    <div className="fitness-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
          --input-bg: rgba(255, 255, 255, 0.03);
        }

        .fitness-page {
          background-color: var(--deep-navy);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .track-card {
          background: var(--soft-navy);
          width: 100%;
          max-width: 750px;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          position: relative;
        }

        .icon-header {
          background: var(--electric-lime);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: black;
          font-size: 1.5rem;
        }

        .section-title {
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
          text-align: center;
        }

        .info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--electric-lime);
          letter-spacing: 1px;
          font-weight: 700;
          margin-bottom: 8px;
          display: block;
        }

        .fitness-input {
          background: var(--input-bg) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: white !important;
          border-radius: 0 !important;
          padding: 12px !important;
          appearance: none;
        }

        /* Styling the Dark Dropdown */
        .fitness-input option {
          background-color: var(--soft-navy);
          color: white;
        }

        .fitness-input:focus {
          border-color: var(--electric-lime) !important;
          box-shadow: none !important;
          background: rgba(255,255,255,0.07) !important;
        }

        .meal-header-row {
          border-left: 4px solid var(--electric-lime);
          padding-left: 15px;
          margin: 40px 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-lime {
          background: var(--electric-lime) !important;
          color: black !important;
          font-weight: 800;
          border-radius: 0 !important;
          text-transform: uppercase;
          border: none;
          padding: 15px 25px;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .btn-lime:hover {
          background: #d4ff8a !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(182, 255, 59, 0.2);
        }

        .trash-btn {
          background: transparent;
          border: none;
          color: #ff4d4d;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
        }

        .input-border-top {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
          margin-top: 30px;
        }
      `}</style>

      <div className="track-card">
        {/* Header Section */}
        <div className="mb-5">
          <div className="icon-header">🥗</div>
          <h2 className="section-title mb-1">Add Your Meal</h2>
          <p className="text-center text-white-50 small">TRACK YOUR NUTRITION</p>
        </div>

        {/* Global Details: Meal Name & Day */}
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-8">
              <label className="info-label">Meal Name</label>
              <input
                type="text"
                className="form-control fitness-input"
                name='mealName'
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g. Post-Workout Lunch"
              />
            </div>
            <div className="col-md-4">
              <label className="info-label">Meal Type</label>
              <select
                className="form-select fitness-input"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="info-label">Select Food</label>
            <select
              className="form-select fitness-input"
              value={selectedFood}
              name='food'
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="" selected hidden>-- Choose a Food Item --</option>
              {foodOptions.map(opt => (
                <option key={opt._id} value={opt._id}>{opt.food_name}</option>
              ))}
            </select>
          </div>

          {/* Conditional Content Section: Only shows if food is selected */}
          {selectedFood ? (
            <div className="animate-fade-in">
              <div className="meal-header-row">
                <h4 className="m-0 fw-bold" style={{ color: 'var(--electric-lime)' }}>{selectedFoodObj?.food_name}</h4>
                <button type="button" className="trash-btn" onClick={() => setSelectedFood('')}>Remove Item</button>
              </div>

              <div className="row">
                <div className="col-12">
                  <label className="info-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control fitness-input"
                    placeholder="e.g. 250"
                    value={quantity}
                    name='quantity'
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>


            </div>
          ) : (
            <div className="text-center py-5 mt-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p className="text-white-50 m-0">Select a food item to log your intake.</p>
            </div>
          )}

          {/* Global Footer Actions */}
          <div className="row g-3 mt-5">
            <div className="col-12">
              <button className="btn btn-lime w-100" type='submit' >
                Save Meal Item
              </button>
            </div>
          </div>
        </form>
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

export default AddMealForm;