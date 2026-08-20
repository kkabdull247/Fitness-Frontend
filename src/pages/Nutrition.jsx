import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Nutrition() {
    // --- Modals State ---
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showEditMealModal, setShowEditMealModal] = useState(false);

    const [foodLibrary, setFoodLibrary] = useState([]);
    const [meals, setMeal] = useState([]);
    const [foodSearch, setFoodSearch] = useState('');
    const [mealTypeFilter, setMealTypeFilter] = useState('All');

    const [newFood, setNewFood] = useState({
        food_name: "",
        category: "",
        calories: "",
        carbs: "",
        protein: "",
        fats: ""
    });

    const [editingFood, setEditingFood] = useState({
        index: "",
        food_name: "",
        category: "",
        calories: "",
        carbs: "",
        protein: "",
        fats: ""
    });

    const newfoodhandleChange = (e) => {
        setNewFood({ ...newFood, [e.target.name]: e.target.value });
    };

    const editfoodhandleChange = (e) => {
        setEditingFood({ ...editingFood, [e.target.name]: e.target.value });
    };


    const newfoodhandleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/food/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newFood),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(data.msg);
            setNewFood({
                food_name: "",
                category: "",
                calories: "",
                carbs: "",
                protein: "",
                fats: ""
            });
            fetchFood();
        } else {
            toast.error(data.msg);
        }
    };

    const fetchFood = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/food`, {
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

    const deleteFood = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/food/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.msg);
                fetchFood();
            }
        } catch (error) {
            console.error("Error delete Exercise:", error);
        }
    };

    const openEditFood = (food) => {
        setEditingFood({
            _id: food._id,
            food_name: food.food_name,
            category: food.category,
            calories: food.calories,
            carbs: food.carbs,
            protein: food.protein,
            fats: food.fats
        });
        setShowEditMealModal(true);
    };

    const handleUpdateFood = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/food/edit/${editingFood._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                food_name: editingFood.food_name,
                category: editingFood.category,
                calories: editingFood.calories,
                carbs: editingFood.carbs,
                protein: editingFood.protein,
                fats: editingFood.fats
            })
        });

        const data = await response.json();
        if (response.ok) {
            toast.success(data.msg);
            fetchFood();
        } else {
            toast.error(data.msg);
        }
    };


    // meal start
    const fetchMeal = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/meal`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMeal(data.meal);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const deleteMeal = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/meal/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.msg);
                fetchMeal();
            }
        } catch (error) {
            console.error("Error delete meals:", error);
        }
    };

    useEffect(() => {
        fetchMeal();
        fetchFood();
    }, []);

    const filteredFoods = foodLibrary.filter(f =>
        f.food_name.toLowerCase().includes(foodSearch.toLowerCase())
    );

    const filteredMeals = mealTypeFilter === 'All'
        ? meals
        : meals.filter(m => m.mealType === mealTypeFilter);

    return (
        <div className="nutrition-page">
            <style>{`
        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
          --brand-orange: #B6FF3B;
          --text-muted: #a0aec0;
        }

        .nutrition-page { background-color: var(--deep-navy); min-height: 100vh; color: white; padding: 40px 20px; font-family: 'Inter', sans-serif; }
        .soft-card { background: var(--soft-navy); border: 1px solid rgba(255,255,255,0.05); padding: 25px; height: 100%; }
        .section-title { border-left: 4px solid var(--brand-orange); padding-left: 15px; text-transform: uppercase; font-weight: 700; color: white; margin-bottom: 20px; }
        
        /* Buttons */
        .btn-orange { background: var(--brand-orange); color: white; border: none; font-weight: 700; padding: 8px 20px; text-transform: uppercase; font-size: 0.75rem; transition: 0.3s; }
        .btn-orange:hover { background: #B6FF3B; }
        .btn-lime { background: var(--electric-lime); color: black; border: none; font-weight: 800; padding: 12px; width: 100%; text-transform: uppercase; }

        /* Modals */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(12, 26, 43, 0.85); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 9999; }
        .modal-box { background: rgba(12, 26, 43, 0.85); border: 1px solid var(--brand-orange); width: 400px; padding: 30px; position: relative; }
        .edit-meal-box { background: #0C1A2B; width: 500px; padding: 50px; text-align: center; border: 1px solid #1c354d; position: relative; }
        
        .modal-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid #333; padding: 12px; color: white; margin-bottom: 15px; outline: none; }
        .close-x { position: absolute; top: 15px; right: 20px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; }

        /* Calendar & Graph */
        .day-active { background: var(--brand-orange); color: white; font-weight: bold; }
        .bar { background: var(--brand-orange); transition: 0.3s; cursor: pointer; }
        .bar:hover { background: var(--electric-lime); }
      `}</style>

            {/* --- MODAL 1: ADD/EDIT FOOD --- */}
            {showFoodModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button className="close-x" onClick={() => setShowFoodModal(false)}>✕</button>
                        <h3 className="text-center mb-4" style={{ color: 'var(--brand-orange)' }}>Add Food Item</h3>
                        <form onSubmit={newfoodhandleSubmit} >
                            <input className="modal-input" placeholder="Name" value={newFood.food_name} name='food_name' onChange={newfoodhandleChange} />
                            <select className="modal-input bg-dark" value={newFood.category} name='category' onChange={newfoodhandleChange}>
                                <option value="" selected hidden>Category</option>
                                <option value="Protein">Protein</option>
                                <option value="Carbs">Carbs</option>
                            </select>
                            <input className="modal-input" type="number" placeholder="Calories" value={newFood.calories} name='calories' onChange={newfoodhandleChange} />
                            <div className="row g-2">
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Carbs" value={newFood.carbs} name='carbs' onChange={newfoodhandleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Protein" value={newFood.protein} name='protein' onChange={newfoodhandleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Fats" value={newFood.fats} name='fats' onChange={newfoodhandleChange} />
                                </div>
                            </div>
                            <button className="btn-orange w-100 py-2 mt-2" type='submit' >SAVE FOOD</button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 2: EDIT MEAL (Styled from Image 3) --- */}
            {showEditMealModal && (
                <div className="modal-overlay">
                    <div className="edit-meal-box">
                        <button className="close-x" onClick={() => setShowEditMealModal(false)}>✕</button>
                        <h3 className="text-center mb-4" style={{ color: 'var(--brand-orange)' }}>Edit Food Item</h3>
                        <form onSubmit={handleUpdateFood} >
                            <input className="modal-input" placeholder="Name" value={editingFood.food_name} name='food_name' onChange={editfoodhandleChange} />
                            <select className="modal-input bg-dark" value={editingFood.category} name='category' onChange={editfoodhandleChange}>
                                <option value="" selected hidden>Category</option>
                                <option value="Protein">Protein</option>
                                <option value="Carbs">Carbs</option>
                            </select>
                            <input className="modal-input" type="number" placeholder="Calories" value={editingFood.calories} name='calories' onChange={editfoodhandleChange} />
                            <div className="row g-2">
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Carbs" value={editingFood.carbs} name='carbs' onChange={editfoodhandleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Protein" value={editingFood.protein} name='protein' onChange={editfoodhandleChange} />
                                </div>
                                <div className="col-4">
                                    <input type="number" className="modal-input" placeholder="Fats" value={editingFood.fats} name='fats' onChange={editfoodhandleChange} />
                                </div>
                            </div>
                            <button className="btn-orange w-100 py-2 mt-2" type='submit' >EDIT FOOD</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="container-fluid">
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-4">
                        <div className="d-flex flex-column gap-4">
                            <div className="soft-card">
                                <h6 className="section-title">Calendar</h6>
                                {(() => {
                                    const now = new Date();
                                    const today = now.getDate();
                                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                                    const monthName = now.toLocaleString('default', { month: 'long' }).toUpperCase();
                                    return (
                                        <>
                                            <div className="small fw-bold mb-2 text-white-50">{monthName} {now.getFullYear()}</div>
                                            <div className="row row-cols-7 g-1 text-center small">
                                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="col text-muted fw-bold mb-2">{d}</div>)}
                                                {Array.from({ length: daysInMonth }).map((_, i) => (
                                                    <div key={i} className={`col p-2 ${i + 1 === today ? 'day-active' : 'text-white-50'}`}>{i + 1}</div>
                                                ))}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="soft-card">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6 className="section-title m-0">Food List</h6>
                                    <button className="btn-orange" onClick={() => setShowFoodModal(true)}>ADD FOOD</button>
                                </div>
                                <input
                                    type="text"
                                    className="modal-input mb-3"
                                    placeholder="Search food..."
                                    value={foodSearch}
                                    onChange={e => setFoodSearch(e.target.value)}
                                />
                                {
                                    filteredFoods.length > 0 ? (
                                        filteredFoods.map(f => (
                                            <div key={f._id} className="p-3 mb-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-bold" style={{ color: 'var(--brand-orange)' }}>{f.food_name}</span>
                                                    <div className="d-flex gap-2">
                                                        <span className="cursor-pointer" onClick={() => openEditFood(f)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg></span>
                                                        <span className="cursor-pointer text-danger" onClick={() => deleteFood(f._id)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg></span>
                                                    </div>
                                                </div>
                                                <small className="text-light">{f.calories} kcal | P: {f.protein}g</small>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-light" style={{ opacity: 0.7 }}>
                                            {foodSearch ? 'No matching foods' : 'No food items found'}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-8">
                        <div className="d-flex flex-column gap-4">
                            <div className="soft-card">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="section-title m-0">My Meals</h4>
                                    <Link to='/AddMealForm' className="btn-orange text-decoration-none">ADD MEAL</Link>
                                </div>
                                <div className="d-flex gap-2 mb-4 flex-wrap">
                                    {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setMealTypeFilter(type)}
                                            style={{
                                                background: mealTypeFilter === type ? 'var(--brand-orange)' : 'transparent',
                                                color: mealTypeFilter === type ? 'black' : 'rgba(255,255,255,0.6)',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                padding: '4px 12px',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                letterSpacing: '0.5px'
                                            }}
                                        >{type}</button>
                                    ))}
                                </div>
                                {
                                    filteredMeals.length > 0 ? (
                                        filteredMeals.map(m => (
                                            <div key={m._id} className="p-4 mb-3" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div>
                                                        <h5 style={{ color: 'var(--brand-orange)', fontWeight: 700, marginBottom: 4 }}>{m.mealName}</h5>
                                                        {m.mealType && (
                                                            <span style={{ fontSize: '0.65rem', background: 'rgba(182,255,59,0.1)', color: '#B6FF3B', border: '1px solid rgba(182,255,59,0.3)', padding: '2px 8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                                {m.mealType}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="d-flex gap-3">
                                                        <Link to={`/EditMealForm/${m._id}`}>
                                                            <span className="cursor-pointer" style={{ color: 'var(--brand-orange)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                            </svg></span>
                                                        </Link>
                                                        <span className="cursor-pointer text-danger" onClick={() => deleteMeal(m._id)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg></span>
                                                    </div>
                                                </div>
                                                <div className="row g-2">
                                                    <div className="col-md-6">
                                                        <div className="p-3" style={{ border: '1px solid rgba(243, 112, 33, 0.2)', fontSize: '0.8rem' }}>
                                                            <div className="text-light">Food Name: <span className="text-white"> {m.food.food_name}</span></div>
                                                            <div className="text-light">Quantity: <span className="text-white"> {m.quantity}</span></div>
                                                            <div className="text-light">Calories: <span className="text-white"> {m.food.calories}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 mb-3" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                            {mealTypeFilter !== 'All' ? `No ${mealTypeFilter} meals found` : 'No Meals found'}
                                        </div>
                                    )
                                }
                            </div>

                            <div className="soft-card">
                                <h6 className="section-title">Nutrition Summary</h6>
                                <div className="d-flex align-items-end justify-content-between pt-5" style={{ height: '200px' }}>
                                    {[40, 70, 90, 65, 80, 50, 30].map((h, i) => (
                                        <div key={i} className="bar" style={{ height: `${h}%`, width: '12%' }}></div>
                                    ))}
                                </div>
                            </div>
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

export default Nutrition;