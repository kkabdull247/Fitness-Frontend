import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function TrackFitnessForm() {
  const navigate = useNavigate();

  // State
  const [workoutName, setWorkoutName] = useState('');
  const [day, setDay] = useState('Monday');
  const [exerciseId, setExerciseId] = useState('');
  const [sets, setSets] = useState([{ id: 1, reps: '', weight: '' }]);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([]);

  // Fetch exercises from backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/exercise`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setExercises(data.exercise || []);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const addSet = () => {
    const newId = sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1;
    setSets([...sets, { id: newId, reps: '', weight: '' }]);
  };
  const removeSet = (id) => setSets(sets.filter(set => set.id !== id));
  const handleInputChange = (id, field, value) => {
    setSets(sets.map(set => set.id === id ? { ...set, [field]: value } : set));
  };

  // Submit workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exerciseId) return alert("Please select an exercise");
    try {
      const token = localStorage.getItem("token");
      const workoutData = {
        workoutName,
        day,
        exercise: exerciseId,
        sets: sets.map(s => ({ reps: Number(s.reps), weight: Number(s.weight) })),
        notes
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(workoutData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        setTimeout(() => {
          navigate('/Workout');
        }, 2000);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const selectedExercise = exercises.find(e => e._id === exerciseId);

  return (
    <div className="fitness-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');
        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
          --input-bg: rgba(255,255,255,0.03);
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
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23B6FF3B' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px 12px;
        }
        .fitness-input option { background-color: var(--soft-navy); color: white; }
        .fitness-input:focus { border-color: var(--electric-lime) !important; outline: none; }
        .exercise-header-row {
          border-left: 4px solid var(--electric-lime);
          padding-left: 15px;
          margin: 40px 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .set-row {
          background: rgba(255,255,255,0.02);
          margin-bottom: 8px;
          padding: 10px;
          border-left: 2px solid transparent;
          transition: 0.3s;
        }
        .set-row:hover { background: rgba(182,255,59,0.03); border-left: 2px solid var(--electric-lime); }
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
        .btn-lime:hover { background: #d4ff8a !important; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(182,255,59,0.2); }
        .btn-outline-lime {
          border: 1px solid var(--electric-lime);
          color: var(--electric-lime);
          background: transparent;
          border-radius: 0;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 10px;
          text-transform: uppercase;
          width: 100%;
          transition: 0.3s;
        }
        .btn-outline-lime:hover { background: var(--electric-lime); color: black; }
        .remove-set-x { background: transparent; border: none; color: #ff4d4d; font-size: 1.2rem; cursor: pointer; }
      `}</style>

      <div className="track-card">
        <div className="mb-5">
          <div className="icon-header">🏋️</div>
          <h2 className="section-title mb-1">Track Your Fitness</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Workout Name & Day */}
          <div className="row g-4">
            <div className="col-md-7">
              <label className="info-label">Workout Name</label>
              <input type="text" className="form-control fitness-input" value={workoutName} onChange={e => setWorkoutName(e.target.value)} />
            </div>
            <div className="col-md-5">
              <label className="info-label">Day</label>
              <select className="form-select fitness-input" value={day} onChange={e => setDay(e.target.value)}>
                <option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
              </select>
            </div>
          </div>

          {/* Exercise Dropdown */}
          <div className="mt-4">
            <label className="info-label">Select Exercise</label>
            <select className="form-select fitness-input" value={exerciseId} onChange={e => setExerciseId(e.target.value)}>
              <option value="">-- Choose Exercise --</option>
              {exercises.map(ex => (<option key={ex._id} value={ex._id}>{ex.exercise_name}</option>))}
            </select>
          </div>

          {/* Conditional Exercise Section */}
          {exerciseId ? (
            <div className="animate-fade-in">
              <div className="exercise-header-row">
                <h4 className="m-0 fw-bold" style={{ color: 'var(--electric-lime)' }}>{selectedExercise?.exercise_name}</h4>
                <button type="button" className="remove-set-x" onClick={() => setExerciseId('')}>✕</button>
              </div>

              {sets.map((set, index) => (
                <div className="set-row row align-items-center g-2 mx-0" key={set.id}>
                  <div className="col-1"><span style={{ color: 'var(--electric-lime)' }}>{index + 1}</span></div>
                  <div className="col-4">
                    <input type="number" className="form-control fitness-input text-center" placeholder="0" value={set.reps} onChange={e => handleInputChange(set.id, 'reps', e.target.value)} />
                  </div>
                  <div className="col-4">
                    <input type="number" className="form-control fitness-input text-center" placeholder="0.0" value={set.weight} onChange={e => handleInputChange(set.id, 'weight', e.target.value)} />
                  </div>
                  <div className="col-3 text-end">
                    {sets.length > 1 && <button type="button" className="remove-set-x" onClick={() => removeSet(set.id)}>✕</button>}
                  </div>
                </div>
              ))}

              <button type="button" className="btn btn-outline-lime mt-3" onClick={addSet}>+ Add New Set</button>

            </div>
          ) : (
            <div className="text-center py-5 mt-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p className="text-white-50 m-0">Please select an exercise to log your performance.</p>
            </div>
          )}

          {/* Notes */}
          <div className="mt-4">
            <label className="info-label">Notes</label>
            <textarea className="form-control fitness-input" rows="2" placeholder="Optional notes..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          {/* Submit */}
          <div className="row g-3 mt-5">
            <div className="col-12">
              <button type="submit" className="btn btn-lime w-100">Save Workout</button>
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

export default TrackFitnessForm;