import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function StartWorkoutForm() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [day, setDay] = useState('Monday');
  const [exerciseId, setExerciseId] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [sets, setSets] = useState([{ id: 1, reps: '', weight: '' }]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/exercise`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setExercises(data.exercise || []); setLoadingExercises(false); })
      .catch(() => { toast.error("Could not load exercises"); setLoadingExercises(false); });
  }, []);

  const addSet = () => {
    const newId = sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1;
    setSets([...sets, { id: newId, reps: '', weight: '' }]);
  };

  const removeSet = (id) => setSets(sets.filter(set => set.id !== id));

  const handleInputChange = (id, field, value) => {
    setSets(sets.map(set => set.id === id ? { ...set, [field]: value } : set));
  };

  const handleSubmit = async () => {
    if (!workoutName.trim()) return toast.error("Enter a workout name");
    if (!exerciseId) return toast.error("Select an exercise");
    if (sets.some(s => !s.reps || !s.weight)) return toast.error("Fill in all set fields");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          workoutName,
          day,
          exercise: exerciseId,
          sets: sets.map(s => ({ reps: Number(s.reps), weight: Number(s.weight) })),
          notes
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Workout logged!");
        setTimeout(() => navigate('/Workout'), 1000);
      } else {
        toast.error(data.msg || "Failed to save workout");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="profile-page">
      <Toaster position="top-right" />
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

        .fitness-input {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: white !important;
          padding: 12px !important;
          text-align: center;
        }

        .fitness-input:focus {
          border-color: var(--electric-lime) !important;
          box-shadow: none !important;
          background: rgba(255,255,255,0.05) !important;
        }

        .fitness-select {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: white !important;
          padding: 12px !important;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23B6FF3B' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right 0.75rem center !important;
          background-size: 16px 12px !important;
        }

        .fitness-select option { background-color: var(--soft-navy); color: white; }
        .fitness-select:focus { border-color: var(--electric-lime) !important; outline: none; box-shadow: none !important; }

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

        .info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--electric-lime);
          letter-spacing: 1px;
          font-weight: 700;
          margin-bottom: 5px;
          display: block;
        }

        .set-row {
          background: rgba(255,255,255,0.02);
          margin-bottom: 10px;
          padding: 15px;
          border-left: 2px solid transparent;
          transition: 0.3s;
        }

        .set-row:hover {
          border-left: 2px solid var(--electric-lime);
          background: rgba(182, 255, 59, 0.02);
        }

        .remove-btn {
          background: transparent;
          border: 1px solid #ff4d4d;
          color: #ff4d4d;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }

        .remove-btn:hover {
          background: #ff4d4d;
          color: white;
        }

        .btn-outline-white {
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          background: transparent;
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 8px 16px;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .btn-outline-white:hover {
          border-color: var(--electric-lime);
          color: var(--electric-lime);
        }
      `}</style>

      <div className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h5 className="section-title m-0">Log Performance</h5>
          <button onClick={() => navigate('/Workout')} className="btn-outline-white">
            Back to Workouts
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="soft-card p-4 p-md-5">

              {/* Workout Name & Day */}
              <div className="row g-4 mb-4">
                <div className="col-md-7">
                  <label className="info-label">Workout Name</label>
                  <input
                    type="text"
                    className="form-control fitness-input text-start"
                    placeholder="e.g. Push Day A"
                    value={workoutName}
                    onChange={e => setWorkoutName(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <label className="info-label">Day</label>
                  <select
                    className="form-select fitness-select"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Exercise Selection */}
              <div className="mb-5">
                <label className="info-label">Select Exercise</label>
                <select
                  className="form-select fitness-select"
                  value={exerciseId}
                  onChange={e => setExerciseId(e.target.value)}
                >
                  <option value="">-- Choose from Library --</option>
                  {exercises.map(ex => (
                    <option key={ex._id} value={ex._id}>{ex.exercise_name}</option>
                  ))}
                </select>
                {!loadingExercises && exercises.length === 0 && (
                  <small className="text-white-50 mt-1 d-block">
                    No exercises yet — add some in the <Link to="/Workout" style={{color: 'var(--electric-lime)'}}>Workout</Link> page
                  </small>
                )}
              </div>

              {/* Sets Header */}
              <div className="row mb-3 px-3 d-none d-md-flex">
                <div className="col-2"><small className="info-label">Set</small></div>
                <div className="col-4 text-center"><small className="info-label">Reps</small></div>
                <div className="col-4 text-center"><small className="info-label">Weight (kg)</small></div>
                <div className="col-2"></div>
              </div>

              {/* Dynamic Sets */}
              {sets.map((set, index) => (
                <div className="set-row row align-items-center g-3" key={set.id}>
                  <div className="col-2">
                    <span className="fw-bold" style={{color: 'var(--electric-lime)'}}>#{index + 1}</span>
                  </div>
                  <div className="col-4">
                    <input
                      type="number"
                      className="form-control fitness-input"
                      value={set.reps}
                      placeholder="Reps"
                      onChange={e => handleInputChange(set.id, 'reps', e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="number"
                      className="form-control fitness-input"
                      value={set.weight}
                      placeholder="Kg"
                      onChange={e => handleInputChange(set.id, 'weight', e.target.value)}
                    />
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    {sets.length > 1 && (
                      <button className="remove-btn" onClick={() => removeSet(set.id)}>✕</button>
                    )}
                  </div>
                </div>
              ))}

              <button className="btn-outline-white w-100 mt-3 py-2" onClick={addSet}>
                + Add New Set Protocol
              </button>

              <hr className="my-5 opacity-25" />

              {/* Notes */}
              <div className="row g-4">
                <div className="col-12">
                  <label className="info-label">Performance Notes</label>
                  <textarea
                    className="form-control fitness-input text-start"
                    rows="3"
                    placeholder="e.g. Explosive on the way up, controlled on the way down..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5">
                <button className="btn btn-lime w-100 py-3" onClick={handleSubmit}>
                  Commit To Training Log
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartWorkoutForm;
