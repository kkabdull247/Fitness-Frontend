import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Workout() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [library, setLibrary] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const [newExercise, setNewExercise] = useState({
    exercise_name: "",
    primary_muscle_group: "",
    secondary_muscle_group: "",
  });

  const [editingExercise, setEditingExercise] = useState({
    index: "",
    exercise_name: "",
    primary_muscle_group: "",
    secondary_muscle_group: ""
  });

  const newExercisehandleChange = (e) => {
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
  };

  const editExercisehandleChange = (e) => {
    setEditingExercise({ ...editingExercise, [e.target.name]: e.target.value });
  };

  const newExercisehandleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/exercise/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newExercise),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.msg);
      setNewExercise({
        exercise_name: "",
        primary_muscle_group: "",
        secondary_muscle_group: "",
      });
      fetchExercise();
    } else {
      toast.error(data.msg);
    }
  };

  const fetchExercise = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/exercise`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setLibrary(data.exercise);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/exercise/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        fetchExercise();
      }
    } catch (error) {
      console.error("Error delete Exercise:", error);
    }
  };

  const openEditModal = (exercise) => {
    setEditingExercise({
      _id: exercise._id,
      exercise_name: exercise.exercise_name,
      primary_muscle_group: exercise.primary_muscle_group,
      secondary_muscle_group: exercise.secondary_muscle_group
    });
    setShowEditModal(true);
  };

  const handleUpdateExercise = async (e) => {
    e.preventDefault();

    if (!editingExercise.exercise_name || !editingExercise.primary_muscle_group) return;

    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/exercise/edit/${editingExercise._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        exercise_name: editingExercise.exercise_name,
        primary_muscle_group: editingExercise.primary_muscle_group,
        secondary_muscle_group: editingExercise.secondary_muscle_group
      })
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.msg);
      fetchExercise();
    } else {
      toast.error(data.msg);
    }
  };

  // workout start
  const fetchWorkout = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setWorkouts(data.workouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        fetchWorkout();
      }
    } catch (error) {
      console.error("Error delete Workout:", error);
    }
  };

  const [selectedDay, setSelectedDay] = useState("All");
  const [workoutSearch, setWorkoutSearch] = useState('');
  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const filteredWorkouts = workouts
    .filter(w => selectedDay === "All" || w.day === selectedDay)
    .filter(w => {
      if (!workoutSearch) return true;
      const q = workoutSearch.toLowerCase();
      return w.workoutName.toLowerCase().includes(q) ||
        (w.exercise?.exercise_name || '').toLowerCase().includes(q);
    });

  useEffect(() => {
    fetchExercise();
    fetchWorkout();
  }, []);

  return (
    <div className="profile-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
          --text-muted: #a0aec0;
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
          height: 100%;
        }

        .section-title {
          border-left: 4px solid var(--electric-lime);
          padding-left: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
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

        .btn-lime {
          background: var(--electric-lime) !important;
          color: black !important;
          font-weight: 800;
          border-radius: 0 !important;
          text-transform: uppercase;
          border: none;
          padding: 10px 25px;
          transition: 0.3s;
          letter-spacing: 1px;
        }

        .btn-lime:hover {
          background: #d4ff8a !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(182, 255, 59, 0.3);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid rgba(160, 174, 192, 0.3);
          border-radius: 0;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 16px;
          transition: 0.3s;
        }

        .btn-ghost:hover {
          border-color: var(--electric-lime);
          color: var(--electric-lime);
          background: rgba(182, 255, 59, 0.05);
        }

        .workout-item {
          background: rgba(255,255,255,0.02);
          border-left: 3px solid transparent;
          transition: 0.3s;
          padding: 20px;
        }

        .workout-item:hover {
          border-left: 3px solid var(--electric-lime);
          background: rgba(182, 255, 59, 0.03);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(12, 26, 43, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1100;
          padding: 20px;
        }

        .modal-card {
          background: var(--soft-navy);
          border: 1px solid var(--electric-lime);
          width: 100%;
          max-width: 500px;
          padding: 40px;
          position: relative;
          box-shadow: 0 0 60px rgba(0,0,0,0.6);
          animation: modalSlideUp 0.3s ease-out;
        }

        @keyframes modalSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 14px;
          color: white;
          border-radius: 0;
          margin-bottom: 20px;
          outline: none;
        }

        .modal-input:focus {
          border-color: var(--electric-lime);
          background: rgba(255,255,255,0.06);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          opacity: 0.5;
        }

        .close-btn:hover { opacity: 1; }

        .calendar-box { background: rgba(0,0,0,0.2); padding: 15px; text-align: center; }
        .day-active { background: var(--electric-lime); color: black; font-weight: 800; }
      `}</style>

      {/* --- ADD EXERCISE MODAL --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <h4 className="section-title mb-4">New Exercise</h4>
            <form onSubmit={newExercisehandleSubmit}>
              <label className="info-label">Exercise Name</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Incline Bench Press"
                value={newExercise.exercise_name}
                name='exercise_name'
                onChange={newExercisehandleChange}
              />
              <label className="info-label">Primary Muscle Group</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Chest"
                value={newExercise.primary_muscle_group}
                name="primary_muscle_group"
                onChange={newExercisehandleChange}
              />
              <label className="info-label">Secondary Muscle Group</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. Triceps / Front Delts"
                value={newExercise.secondary_muscle_group}
                name="secondary_muscle_group"
                onChange={newExercisehandleChange}
              />
              <button type="submit" className="btn btn-lime w-100 mt-2">
                Add To Library
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT EXERCISE MODAL --- */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-card" style={{ borderColor: '#3bb6ff' }} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowEditModal(false)}>✕</button>
            <h4 className="section-title mb-4" style={{ borderLeftColor: '#3bb6ff' }}>Edit Exercise</h4>
            <form onSubmit={handleUpdateExercise}>
              <label className="info-label" style={{ color: '#3bb6ff' }}>Exercise Name</label>
              <input
                type="text"
                className="modal-input"
                value={editingExercise.exercise_name}
                name='exercise_name'
                onChange={editExercisehandleChange}
              />

              <label className="info-label" style={{ color: '#3bb6ff' }}>Primary Muscle Group</label>
              <input
                type="text"
                className="modal-input"
                value={editingExercise.primary_muscle_group}
                name='primary_muscle_group'
                onChange={editExercisehandleChange}
              />

              <label className="info-label" style={{ color: '#3bb6ff' }}>Secondary Muscle Group</label>
              <input
                type="text"
                className="modal-input"
                value={editingExercise.secondary_muscle_group}
                name='secondary_muscle_group'
                onChange={editExercisehandleChange}
              />

              <button type='submit' className="btn btn-lime w-100 mt-2" style={{ background: '#3bb6ff !important' }} >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE --- */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h4 className="section-title m-0">Workout Dashboard</h4>
          {/* <button className="btn btn-lime" onClick={() => navigate('/add-workout')}>
            + Log Session
          </button> */}
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="soft-card p-4">
                <p className="info-label text-center mb-3">Schedule</p>
                <div className="calendar-box">
                  {(() => {
                    const now = new Date();
                    const today = now.getDate();
                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                    const monthName = now.toLocaleString('default', { month: 'long' }).toUpperCase();
                    return (
                      <>
                        <div className="d-flex justify-content-between mb-3 small fw-bold">
                          <span>{monthName} {now.getFullYear()}</span>
                        </div>
                        <div className="row g-1 mb-2">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                            <div key={i} className="col text-muted" style={{ fontSize: '0.6rem' }}>{d}</div>
                          ))}
                        </div>
                        <div className="row row-cols-7 g-1">
                          {Array.from({ length: daysInMonth }).map((_, i) => (
                            <div key={i} className={`col p-2 small ${i + 1 === today ? 'day-active' : 'text-white-50'}`}>
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="soft-card p-4">
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <h6 className="m-0 fw-bold uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                    Exercise Library
                  </h6>
                  <button className="btn-ghost" style={{ padding: '4px 10px' }} onClick={() => setShowModal(true)}>
                    + Add
                  </button>
                </div>

                <div className="d-flex flex-column gap-0">
                  {
                    library.length > 0 ? (

                      library.map((ex, index) => (
                        <div
                          key={ex._id}
                          className="workout-item d-flex justify-content-between align-items-center py-3 border-bottom"
                          style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'transparent' }}
                        >
                          <div className="d-flex flex-column">
                            {/* Neon Lime Title matching Image 4 & 5 */}
                            <span
                              className="fw-bold"
                              style={{ color: '#B6FF3B', fontSize: '1.1rem', letterSpacing: '0.3px' }}
                            >
                              {ex.exercise_name}
                            </span>
                            <span className="text-light small" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                              <strong>Primary Muscle:</strong> {ex.primary_muscle_group}
                            </span>
                            <span className="text-light small" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                              <strong>Secondary Muscle:</strong> {ex.secondary_muscle_group}
                            </span>

                          </div>

                          <div className="d-flex gap-3 align-items-center">
                            {/* PROFESSIONAL EDIT ICON - White/Silver Outline */}
                            <button
                              className="bg-transparent border-0 p-0"
                              onClick={() => openEditModal(ex)}
                              style={{ transition: '0.2s', outline: 'none' }}
                              onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>

                            {/* PROFESSIONAL DELETE ICON - Red Outline matching Image 4 */}
                            <button
                              className="bg-transparent border-0 p-0"
                              onClick={() => deleteExercise(ex._id)}
                              style={{ transition: '0.2s', outline: 'none' }}
                              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
                              onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-light" style={{ opacity: 0.7 }}>
                        No exercises found
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="soft-card p-4 p-md-5">
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="section-title m-0">My Workouts</h5>
                  <button className="btn btn-lime" onClick={() => navigate('/TrackFitnessForm')}>
                    Add Workout
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="info-label">Search</label>
                    <input
                      type="text"
                      className="modal-input"
                      style={{ marginBottom: 0 }}
                      placeholder="Search by workout or exercise name..."
                      value={workoutSearch}
                      onChange={e => setWorkoutSearch(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="info-label">Filter by Day</label>
                    <select
                      className="form-select fitness-input "
                      value={selectedDay}
                      onChange={e => setSelectedDay(e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, color: 'white', padding: '14px' }}
                    >
                      {days.map(day => (
                        <option className='bg-dark' key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                {
                  filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map((w) => (
                      <div key={w._id} className="col-md-6">
                        <div className="workout-item">
                          <div className="d-flex justify-content-between align-items-start">
                            <h5
                              className="fw-bold mb-1"
                              style={{ color: "var(--electric-lime)" }}
                            >
                              {w.workoutName}
                            </h5>

                            <small className="text-white-50">
                              {new Date(w.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </small>
                          </div>

                          <p className="small text-white-50 mb-0">
                            Notes: {w.notes || "No notes"}
                          </p>

                          <div className="mt-3 d-flex gap-3">
                            <Link to={`/EditTrackFitnessForm/${w._id}`}
                              className="bg-transparent border-0 p-0"
                              style={{ transition: '0.2s', outline: 'none' }}
                              onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </Link>

                            <button onClick={() => deleteWorkout(w._id)}
                              className="bg-transparent border-0 p-0"
                              style={{ transition: '0.2s', outline: 'none' }}
                              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
                              onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5" style={{ color: "var(--electric-lime)" }}>
                      No workouts found.
                    </div>
                  )
                }
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

export default Workout;