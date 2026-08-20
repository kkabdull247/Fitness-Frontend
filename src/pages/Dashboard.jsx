import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie
} from 'recharts';

function Dashboard() {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/workout`, { headers }).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/meal`, { headers }).then(r => r.json())
    ]).then(([wData, mData]) => {
      setWorkouts(wData.workouts || []);
      setMeals(mData.meal || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Compute strength progression: volume (sum reps*weight) per workout date
  const strengthData = workouts
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-10)
    .map(w => ({
      date: new Date(w.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: w.sets.reduce((sum, s) => sum + (s.reps * s.weight), 0)
    }));

  // Compute macro totals from meals
  const macroTotals = meals.reduce((acc, m) => {
    if (m.food) {
      acc.protein += Number(m.food.protein || 0) * Number(m.quantity || 1);
      acc.carbs += Number(m.food.carbs || 0) * Number(m.quantity || 1);
      acc.fats += Number(m.food.fats || 0) * Number(m.quantity || 1);
    }
    return acc;
  }, { protein: 0, carbs: 0, fats: 0 });

  const macroData = [
    { name: 'Protein', value: Math.round(macroTotals.protein) || 1, fill: '#B6FF3B' },
    { name: 'Carbs', value: Math.round(macroTotals.carbs) || 1, fill: '#FFFFFF' },
    { name: 'Fats', value: Math.round(macroTotals.fats) || 1, fill: '#444444' }
  ];

  // Total daily calories from meals
  const totalCalories = meals.reduce((sum, m) => {
    return sum + (Number(m.food?.calories || 0) * Number(m.quantity || 1));
  }, 0);

  // Total volume load (across all workouts, in kg)
  const totalVolume = workouts.reduce((sum, w) => {
    return sum + w.sets.reduce((s2, s) => s2 + (s.reps * s.weight), 0);
  }, 0);

  const recentWorkouts = workouts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <style>{`
        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #112235;
          --text-muted: #a0aec0;
        }

        .dashboard-page {
          background: var(--deep-navy);
          min-height: 100vh;
          color: white;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }

        .glass-card {
          background: var(--soft-navy);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 25px;
          border-radius: 0;
          height: 100%;
        }

        .section-title {
          color: var(--electric-lime);
          font-family: 'Poppins';
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 25px;
          border-left: 3px solid var(--electric-lime);
          padding-left: 10px;
        }

        /* ===== THEMED BUTTONS ===== */
        .btn-command {
          background: var(--electric-lime);
          color: black;
          border: none;
          border-radius: 0;
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 10px 20px;
          transition: 0.3s all ease;
        }

        .btn-command:hover {
          background: white;
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

        .status-badge-btn {
          font-size: 0.6rem;
          padding: 2px 8px;
          background: transparent;
          border: 1px solid var(--electric-lime);
          color: var(--electric-lime);
          text-transform: uppercase;
          font-weight: 900;
          cursor: pointer;
          transition: 0.2s;
        }

        .status-badge-btn:hover {
          background: var(--electric-lime);
          color: black;
        }

        /* Stats Typography */
        .stat-label { color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; }
        .stat-value { font-size: 1.8rem; font-weight: 800; display: block; }
        .stat-unit { color: var(--electric-lime); font-size: 0.9rem; margin-left: 4px; }

        .workout-row {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 15px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .workout-row:last-child { border: none; }

        .recharts-text { fill: var(--text-muted) !important; font-size: 12px; }

        .empty-state {
          color: var(--text-muted);
          font-size: 0.8rem;
          text-align: center;
          padding: 20px 0;
          opacity: 0.6;
        }
      `}</style>

      <div className="container-fluid">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
          <h4 className="fw-800 m-0">COMMAND <span style={{color: 'var(--electric-lime)'}}>CENTER</span></h4>
          <div className="d-flex gap-2">
            <button className="btn-ghost" onClick={() => navigate('/Workout')}>View Workouts</button>
            <button className="btn-command" onClick={() => navigate('/TrackFitnessForm')}>+ Log Workout</button>
          </div>
        </div>

        {/* OVERVIEW SECTION */}
        <h6 className="section-title">Performance Overview</h6>
        <div className="row g-4 mb-5">
          {[
            { label: 'Total Workouts', value: workouts.length, unit: 'sessions', trend: workouts.length > 0 ? 'Logged' : 'No data' },
            { label: 'Volume Load', value: (totalVolume / 1000).toFixed(1), unit: 'Tons', trend: totalVolume > 0 ? 'All time' : 'No data' },
            { label: 'Daily Calories', value: totalCalories.toLocaleString(), unit: 'kcal', trend: meals.length > 0 ? `${meals.length} meals` : 'No meals' },
            { label: 'Macro Protein', value: Math.round(macroTotals.protein), unit: 'g', trend: macroTotals.protein > 0 ? 'Total' : 'No data' }
          ].map((stat, i) => (
            <div className="col-md-3" key={i}>
              <div className="glass-card">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{loading ? '—' : stat.value} <span className="stat-unit">{stat.unit}</span></span>
                <div className="small text-light mt-2">{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* WORKOUT LOGS SECTION */}
          <div className="col-lg-5">
            <div className="glass-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="section-title m-0">Recent Workouts</h6>
              </div>
              {loading ? (
                <div className="empty-state">Loading...</div>
              ) : recentWorkouts.length > 0 ? (
                recentWorkouts.map(w => (
                  <div key={w._id} className="workout-row">
                    <div>
                      <div className="fw-bold" style={{fontSize: '0.9rem'}}>{w.workoutName}</div>
                      <div className="small text-muted">
                        {w.sets.length} sets · {w.exercise?.exercise_name || 'Exercise'} · {w.day}
                      </div>
                    </div>
                    <button className="status-badge-btn">Done</button>
                  </div>
                ))
              ) : (
                <div className="empty-state">No workouts logged yet.<br/>
                  <button className="btn-ghost mt-3" onClick={() => navigate('/TrackFitnessForm')}>Log First Workout</button>
                </div>
              )}
              {recentWorkouts.length > 0 && (
                <button className="btn-ghost w-100 mt-4" onClick={() => navigate('/Workout')}>
                  View All Workouts
                </button>
              )}
            </div>
          </div>

          {/* ANALYTICS SECTION */}
          <div className="col-lg-4">
            <div className="glass-card">
              <h6 className="section-title">Volume Progression</h6>
              {strengthData.length > 1 ? (
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <AreaChart data={strengthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1d2d40" vertical={false} />
                      <XAxis dataKey="date" tick={{fill: '#a0aec0', fontSize: 10}} />
                      <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip
                        contentStyle={{background: '#112235', border: '1px solid #B6FF3B', color: '#fff', borderRadius: '0px'}}
                        formatter={(v) => [`${v} kg`, 'Volume']}
                      />
                      <Area type="monotone" dataKey="volume" stroke="#B6FF3B" fill="rgba(182, 255, 59, 0.1)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="empty-state" style={{height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  Log at least 2 workouts to see progression
                </div>
              )}
            </div>
          </div>

          {/* MACRO SECTION */}
          <div className="col-lg-3">
            <div className="glass-card text-center">
              <h6 className="section-title text-start">Macro Split</h6>
              {totalCalories > 0 ? (
                <>
                  <div style={{ width: '100%', height: 180 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={macroData}
                          innerRadius={55}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        />
                        <Tooltip
                          contentStyle={{background: '#112235', border: '1px solid #B6FF3B', color: '#fff'}}
                          formatter={(v, name) => [`${v}g`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex justify-content-around mt-2 small">
                    <div className="text-center">
                      <button className="status-badge-btn" style={{borderColor: '#B6FF3B', color: '#B6FF3B'}}>P</button>
                      <div className="mt-1" style={{fontSize: '0.65rem', color: '#a0aec0'}}>{Math.round(macroTotals.protein)}g</div>
                    </div>
                    <div className="text-center">
                      <button className="status-badge-btn" style={{borderColor: '#fff', color: '#fff'}}>C</button>
                      <div className="mt-1" style={{fontSize: '0.65rem', color: '#a0aec0'}}>{Math.round(macroTotals.carbs)}g</div>
                    </div>
                    <div className="text-center">
                      <button className="status-badge-btn" style={{borderColor: '#888', color: '#888'}}>F</button>
                      <div className="mt-1" style={{fontSize: '0.65rem', color: '#a0aec0'}}>{Math.round(macroTotals.fats)}g</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state" style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  Log meals to see macro split
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
