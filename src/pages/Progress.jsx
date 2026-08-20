import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function Progress() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ weight: '', bodyFat: '', chest: '', waist: '', hips: '', notes: '' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchEntries = () => {
    fetch(`${import.meta.env.VITE_API_URL}/progress`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setEntries(data.entries || []); setLoading(false); })
      .catch(() => { toast.error('Could not load progress'); setLoading(false); });
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.weight) return toast.error('Weight is required');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/progress/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          weight: Number(form.weight),
          bodyFat: form.bodyFat ? Number(form.bodyFat) : undefined,
          chest: form.chest ? Number(form.chest) : undefined,
          waist: form.waist ? Number(form.waist) : undefined,
          hips: form.hips ? Number(form.hips) : undefined,
          notes: form.notes
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Progress logged!');
        setForm({ weight: '', bodyFat: '', chest: '', waist: '', hips: '', notes: '' });
        fetchEntries();
      } else {
        toast.error(data.msg || 'Failed to log progress');
      }
    } catch {
      toast.error('Server error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/progress/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(entries.filter(e => e._id !== id));
      toast.success('Entry deleted');
    } catch {
      toast.error('Server error');
    }
  };

  const chartData = entries.map(e => ({
    date: new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Weight: e.weight,
    'Body Fat %': e.bodyFat,
    Waist: e.waist
  }));

  return (
    <div className="progress-page">
      <Toaster position="top-right" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@700;800&display=swap');
        :root { --electric-lime: #B6FF3B; --deep-navy: #0C1A2B; --soft-navy: #112235; }
        .progress-page { background-color: var(--deep-navy); min-height: 100vh; font-family: 'Inter', sans-serif; color: white; padding: 40px 20px; }
        .soft-card { background: var(--soft-navy); border: 1px solid rgba(255,255,255,0.05); border-radius: 0; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
        .section-title { border-left: 4px solid var(--electric-lime); padding-left: 15px; text-transform: uppercase; letter-spacing: 2px; font-family: 'Poppins', sans-serif; font-weight: 700; }
        .fitness-input { background: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 0 !important; color: white !important; padding: 12px !important; }
        .fitness-input:focus { border-color: var(--electric-lime) !important; box-shadow: none !important; }
        .fitness-input::placeholder { color: rgba(255,255,255,0.4) !important; }
        .btn-lime { background: var(--electric-lime) !important; color: black !important; font-weight: 800; border-radius: 0 !important; text-transform: uppercase; border: none; padding: 12px 30px; transition: 0.3s; letter-spacing: 1px; }
        .btn-lime:hover { background: #d4ff8a !important; transform: translateY(-2px); }
        .btn-outline-white { border: 1px solid rgba(255,255,255,0.2); color: white; background: transparent; text-transform: uppercase; font-size: 0.7rem; font-weight: 700; padding: 8px 16px; letter-spacing: 1px; transition: 0.3s; }
        .btn-outline-white:hover { border-color: var(--electric-lime); color: var(--electric-lime); }
        .info-label { font-size: 0.7rem; text-transform: uppercase; color: var(--electric-lime); letter-spacing: 1px; font-weight: 700; margin-bottom: 5px; display: block; }
        .stat-chip { background: rgba(182,255,59,0.08); border: 1px solid rgba(182,255,59,0.2); padding: 8px 14px; font-size: 0.75rem; }
        .entry-row { background: rgba(255,255,255,0.02); border-left: 3px solid transparent; padding: 14px 16px; margin-bottom: 8px; transition: 0.2s; }
        .entry-row:hover { border-left-color: var(--electric-lime); background: rgba(182,255,59,0.03); }
      `}</style>

      <div className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h5 className="section-title m-0">Body Progress</h5>
          <button onClick={() => navigate('/dashboard')} className="btn-outline-white">
            Dashboard
          </button>
        </div>

        <div className="row g-4">
          {/* Log Form */}
          <div className="col-lg-4">
            <div className="soft-card p-4">
              <h6 className="section-title mb-4" style={{ fontSize: '0.9rem' }}>Log Entry</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="info-label">Weight (kg) *</label>
                  <input type="number" step="0.1" className="form-control fitness-input" value={form.weight}
                    onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="75.0" />
                </div>
                <div className="mb-3">
                  <label className="info-label">Body Fat %</label>
                  <input type="number" step="0.1" className="form-control fitness-input" value={form.bodyFat}
                    onChange={e => setForm({ ...form, bodyFat: e.target.value })} placeholder="18.0" />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <label className="info-label">Chest</label>
                    <input type="number" step="0.1" className="form-control fitness-input" value={form.chest}
                      onChange={e => setForm({ ...form, chest: e.target.value })} placeholder="cm" />
                  </div>
                  <div className="col-4">
                    <label className="info-label">Waist</label>
                    <input type="number" step="0.1" className="form-control fitness-input" value={form.waist}
                      onChange={e => setForm({ ...form, waist: e.target.value })} placeholder="cm" />
                  </div>
                  <div className="col-4">
                    <label className="info-label">Hips</label>
                    <input type="number" step="0.1" className="form-control fitness-input" value={form.hips}
                      onChange={e => setForm({ ...form, hips: e.target.value })} placeholder="cm" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="info-label">Notes</label>
                  <textarea className="form-control fitness-input" rows="2" value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes..." />
                </div>
                <button type="submit" className="btn btn-lime w-100">Log Progress</button>
              </form>
            </div>
          </div>

          {/* Chart + History */}
          <div className="col-lg-8">
            {/* Weight Chart */}
            <div className="soft-card p-4 mb-4">
              <h6 className="section-title mb-4" style={{ fontSize: '0.9rem' }}>Weight Over Time</h6>
              {entries.length >= 2 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#112235', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}
                      labelStyle={{ color: '#B6FF3B' }}
                    />
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                    <Line type="monotone" dataKey="Weight" stroke="#B6FF3B" strokeWidth={2} dot={{ fill: '#B6FF3B', r: 3 }} />
                    <Line type="monotone" dataKey="Body Fat %" stroke="#4da6ff" strokeWidth={2} dot={{ fill: '#4da6ff', r: 3 }} />
                    <Line type="monotone" dataKey="Waist" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-white-50 text-center py-4">Log at least 2 entries to see your chart</p>
              )}
            </div>

            {/* History */}
            <div className="soft-card p-4">
              <h6 className="section-title mb-4" style={{ fontSize: '0.9rem' }}>History</h6>
              {loading ? (
                <p className="text-white-50">Loading...</p>
              ) : entries.length === 0 ? (
                <p className="text-white-50">No entries yet. Log your first measurement above.</p>
              ) : (
                [...entries].reverse().map(entry => (
                  <div className="entry-row d-flex justify-content-between align-items-start" key={entry._id}>
                    <div>
                      <small className="text-white-50 d-block mb-1">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </small>
                      <div className="d-flex flex-wrap gap-2">
                        {entry.weight && <span className="stat-chip text-white">{entry.weight} kg</span>}
                        {entry.bodyFat && <span className="stat-chip" style={{ color: '#4da6ff' }}>{entry.bodyFat}% BF</span>}
                        {entry.chest && <span className="stat-chip text-white-50">Chest: {entry.chest}cm</span>}
                        {entry.waist && <span className="stat-chip" style={{ color: '#ff6b6b' }}>Waist: {entry.waist}cm</span>}
                        {entry.hips && <span className="stat-chip text-white-50">Hips: {entry.hips}cm</span>}
                      </div>
                      {entry.notes && <small className="text-white-50 mt-1 d-block">{entry.notes}</small>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry._id)}
                      style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '4px 10px', cursor: 'pointer', fontSize: '0.75rem', flexShrink: 0 }}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
