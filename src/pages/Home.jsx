import React, { useState } from 'react'
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        toast.error(data.msg || 'Failed to send message');
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    <>
      {/* ====== UPDATED THEME: ELECTRIC LIME + DEEP NAVY ====== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

        :root {
          --electric-lime: #B6FF3B;
          --deep-navy: #0C1A2B;
          --soft-navy: #162a3d;
          --bs-btn-border-radius: 0rem !important;
        }

        .app-font {
          font-family: 'Inter', system-ui, sans-serif;
          background-color: var(--deep-navy);
        }

        .heading-font {
          font-family: 'Poppins', sans-serif;
          letter-spacing: -0.5px;
          color: #fff;
        }

        /* TEXT HIGHLIGHT */
        .text-lime { color: var(--electric-lime) !important; }

        /* CARD STYLING */
        .soft-card {
          background: rgba(182, 255, 59, 0.02);
          border: 1px solid rgba(182, 255, 59, 0.2);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .soft-card:hover {
          transform: translateY(-6px);
          border-color: var(--electric-lime);
          background: rgba(182, 255, 59, 0.05);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(182, 255, 59, 0.1);
        }

        .divider {
          width: 60px;
          height: 4px;
          background: var(--electric-lime);
          margin: 16px auto 32px;
        }

        /* INPUTS */
        .fitness-input {
          background: var(--soft-navy);
          border: 1px solid #2a3d50;
          color: #fff;
          padding: 12px;
        }

        .fitness-input:focus {
          background: var(--soft-navy);
          border-color: var(--electric-lime);
          box-shadow: 0 0 0 0.2rem rgba(182, 255, 59, 0.15);
          color: #fff;
        }

        /* BUTTONS */
        .btn-lime {
          background-color: var(--electric-lime) !important;
          color: #000 !important;
          border: none !important;
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-lime:hover {
          background-color: #a4e635 !important;
          transform: scale(1.02);
        }

        .btn-outline-lime {
          border: 2px solid var(--electric-lime) !important;
          color: var(--electric-lime) !important;
          background: transparent !important;
        }

        .btn-outline-lime:hover {
          background: var(--electric-lime) !important;
          color: #000 !important;
        }

        .footer {
          background: #08121d;
          border-top: 1px solid #162a3d;
        }
      `}</style>

      <Toaster position="top-right" />
      {/* ================= HERO ================= */}
      {/* ================= HERO (NO IMAGE VERSION) ================= */}
      <section id='top' className="py-5 text-white d-flex align-items-center app-font"
        style={{
          minHeight: "85vh",
          background: "radial-gradient(circle at center, #162a3d 0%, #0C1A2B 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              {/* ACCENT BADGE */}
              <div
                className="d-inline-block px-3 py-1 mb-4"
                style={{
                  border: '1px solid var(--electric-lime)',
                  color: 'var(--electric-lime)',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                Performance Protocol v2.0
              </div>

              <h1 className="fw-bold display-2 mb-3 heading-font">
                Track. Train. <span className="text-lime">Dominate.</span>
              </h1>

              <div className="divider" style={{ width: '120px', height: '4px' }}></div>

              <p className="fs-5 text-light opacity-75 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                The ultimate dashboard for high-stakes fitness. Join <span className="text-lime fw-bold">80,000+ athletes</span> monitoring
                every rep, set, and PR with millisecond precision.
              </p>

              <div className="d-flex justify-content-center gap-4 flex-wrap">
                <Link to="/dashboard" className="btn btn-lime px-5 py-3 fs-5">
                  Access Dashboard
                </Link>
                <Link to="#contact" className="btn btn-outline-lime px-5 py-3 fs-5">
                  Consult Coach
                </Link>
              </div>

              {/* STATS STRIP */}
              <div className="row mt-5 pt-5 border-top border-secondary border-opacity-25">
                <div className="col-4">
                  <h3 className="text-lime mb-0 fw-bold">1500+</h3>
                  <small className="text-uppercase opacity-50" style={{ fontSize: '0.7rem' }}>Workouts</small>
                </div>
                <div className="col-4">
                  <h3 className="text-lime mb-0 fw-bold">80K</h3>
                  <small className="text-uppercase opacity-50" style={{ fontSize: '0.7rem' }}>Elite Athletes</small>
                </div>
                <div className="col-4">
                  <h3 className="text-lime mb-0 fw-bold">24/7</h3>
                  <small className="text-uppercase opacity-50" style={{ fontSize: '0.7rem' }}>Live Coaching</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      {/* ================= PERFORMANCE TOOLS WITH THEMED IMAGES ================= */}
      <section className="py-5 app-font" style={{ background: "#0C1A2B" }}>
        <div className="container text-white text-center">
          <h2 className="fw-bold heading-font">Performance <span className="text-lime">Tools</span></h2>
          <div className="divider"></div>

          <div className="row g-4 justify-content-center">
            {/* TOOL 1: WORKOUT LOGGING */}
            <div className="col-md-4">
              <div className="soft-card h-100 overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(12, 26, 43, 0.2), #0C1A2B)',
                    zIndex: 1
                  }}></div>
                  <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
                    alt="Workout Log"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-4 pt-0">
                  <h5 className="fw-bold heading-font mb-2 text-lime">Workout Logging</h5>
                  <p className="text-light opacity-50 small">
                    High-speed entry for reps, sets, and RPE. Designed for zero-friction tracking mid-set.
                  </p>
                </div>
              </div>
            </div>

            {/* TOOL 2: STRENGTH PROGRESS */}
            <div className="col-md-4">
              <div className="soft-card h-100 overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(12, 26, 43, 0.2), #0C1A2B)',
                    zIndex: 1
                  }}></div>
                  <img
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                    alt="Strength Progress"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-4 pt-0">
                  <h5 className="fw-bold heading-font mb-2 text-lime">Strength Progress</h5>
                  <p className="text-light opacity-50 small">
                    Predictive 1RM calculations and volume heatmaps to visualize your journey to the top.
                  </p>
                </div>
              </div>
            </div>

            {/* TOOL 3: GOAL CONTROL */}
            <div className="col-md-4">
              <div className="soft-card h-100 overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(12, 26, 43, 0.2), #0C1A2B)',
                    zIndex: 1
                  }}></div>
                  <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop"
                    alt="Goal Control"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-4 pt-0">
                  <h5 className="fw-bold heading-font mb-2 text-lime">Goal Control</h5>
                  <p className="text-light opacity-50 small">
                    Data-driven milestone setting. If it’s not measured, it’s not mastered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= MEMBERSHIP TIERS (RESPONIVE 3-CARD LAYOUT) ================= */}
      <section id='pricing' className="py-5 app-font" style={{ background: "#0C1A2B" }}>
        <div className="container py-lg-5">

          <div className="text-center mb-5 mt-4">
            <h2 className="fw-bold heading-font display-5 text-white">
              Choose Your <span className="text-lime">Protocol</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Scale your training from casual tracking to professional data analysis.
              Built for those who demand precision.
            </p>
          </div>

          {/* align-items-stretch ensures all cards in a row have the same height */}
          <div className="row g-4 justify-content-center align-items-stretch">

            {/* TIER 1: BASIC */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-4 p-xl-5 soft-card text-center border-secondary border-opacity-25 h-100 d-flex flex-column">
                <div className="mb-4">
                  <h4 className="fw-bold text-white mb-1">BASIC</h4>
                  <small className="text-lime text-uppercase fw-semibold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Starter</small>
                </div>

                <h2 className="display-4 fw-bold text-white mb-4">$0</h2>

                <ul className="list-unstyled text-light opacity-75 mb-5 text-start d-inline-block mx-auto">
                  <li className="mb-3">✓ Unlimited Workout Logs</li>
                  <li className="mb-3">✓ Basic Strength Graphs</li>
                  <li className="mb-3">✓ Community Access</li>
                </ul>

                <Link
                  to="/Payment"
                  className="btn btn-outline-lime w-100 mt-auto py-3 fw-bold text-decoration-none d-block text-center"
                >
                  GET STARTED
                </Link>
              </div>
            </div>

            {/* TIER 2: ELITE (THE MOST POPULAR ONE) */}
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="p-4 p-xl-5 soft-card text-center position-relative h-100 d-flex flex-column featured-card-fix"
                style={{
                  borderColor: 'var(--electric-lime)',
                  background: 'rgba(182, 255, 59, 0.08)',
                  boxShadow: '0 10px 40px rgba(182, 255, 59, 0.15)',
                  zIndex: 2
                }}
              >
                {/* HIGH-VISIBILITY BADGE: SIT ON TOP OF BORDER */}
                <div
                  className="position-absolute start-50 translate-middle-x shadow-lg"
                  style={{
                    top: '-18px',
                    background: 'var(--electric-lime)',
                    color: '#000',
                    padding: '6px 20px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '1.5px',
                    whiteSpace: 'nowrap',
                    borderRadius: '0px',
                    zIndex: '100'
                  }}
                >
                  MOST POPULAR
                </div>

                <div className="mb-4 pt-3">
                  <h4 className="fw-bold text-lime mb-1">ELITE</h4>
                  <small className="text-white text-uppercase fw-semibold opacity-75" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>High Performance</small>
                </div>

                <h2 className="display-4 fw-bold text-white mb-4">$19<small className="fs-6 opacity-50 fw-light">/mo</small></h2>

                <ul className="list-unstyled text-light mb-5 text-start d-inline-block mx-auto">
                  <li className="mb-3"><span className="text-lime me-2">✓</span> Advanced AI Analytics</li>
                  <li className="mb-3"><span className="text-lime me-2">✓</span> Custom Macro Tracking</li>
                  <li className="mb-3"><span className="text-lime me-2">✓</span> 1-on-1 Coach Messaging</li>
                  <li className="mb-3"><span className="text-lime me-2">✓</span> Predictive PR Modeling</li>
                </ul>
                <Link
                  to="/Payment"
                  className="btn btn-lime w-100 mt-auto py-3 fw-bold shadow-lg text-decoration-none d-flex align-items-center justify-content-center"
                  style={{ height: '56px' }} // Optional: matches your previous button height exactly
                >
                  UNLOCK ELITE
                </Link>
              </div>
            </div>

            {/* TIER 3: PRO */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-4 p-xl-5 soft-card text-center border-secondary border-opacity-25 h-100 d-flex flex-column">
                <div className="mb-4">
                  <h4 className="fw-bold text-white mb-1">PRO</h4>
                  <small className="text-lime text-uppercase fw-semibold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Commercial</small>
                </div>

                <h2 className="display-4 fw-bold text-white mb-4">$49<small className="fs-6 opacity-50 fw-light">/mo</small></h2>

                <ul className="list-unstyled text-light opacity-75 mb-5 text-start d-inline-block mx-auto">
                  <li className="mb-3">✓ Team/Client Management</li>
                  <li className="mb-3">✓ White-label Exports</li>
                  <li className="mb-3">✓ API Data Access</li>
                  <li className="mb-3">✓ Priority Global Support</li>
                </ul>
                <Link
                  to="/Payment"
                  state={{ plan: "PRO", price: 49 }}
                  className="btn btn-outline-lime w-100 mt-auto py-3 fw-bold text-decoration-none d-flex align-items-center justify-content-center"
                >
                  GO PROFESSIONAL
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* INLINE SCOPED CSS FOR RESPONSIVE FIXES */}
        <style>{`
          /* Desk-top scaling for the center card */
          @media (min-width: 992px) {
            .featured-card-fix {
              transform: scale(1.05);
            }
          }

          /* Tablet/Mobile spacing to prevent overlapping badges */
          @media (max-width: 991px) {
            .featured-card-fix {
              margin-top: 30px;
              margin-bottom: 30px;
            }
          }

          .soft-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id='feedback' className="py-5 text-white app-font" style={{ background: "#08121d" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold heading-font uppercase">Athlete <span className="text-lime">Feedback</span></h2>
            <div className="divider"></div>
          </div>

          <div className="row g-4">
            {[
              { name: "Marcus Chen", role: "Powerlifter", text: "The UI is aggressive and clean. It’s the first tracker that actually feels like it belongs in a serious weight room." },
              { name: "Sarah Jenkins", role: "Crossfit Games Athlete", text: "Data precision is everything. FitTrack Pro gives me the analytics I need to peak at the right time." },
              { name: "David Vostok", role: "Bodybuilder", text: "That lime on navy contrast keeps me focused during 5 AM sessions. Best UX in the fitness game, hands down." }
            ].map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="p-4 soft-card h-100 position-relative">
                  <span className="display-1 position-absolute end-0 bottom-0 opacity-10 text-lime" style={{ fontFamily: 'serif', transform: 'translate(-10px, 20px)' }}>”</span>
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-lime me-3" style={{ width: '40px', height: '40px', background: 'var(--electric-lime)' }}></div>
                    <div>
                      <h6 className="mb-0 fw-bold">{item.name}</h6>
                      <small className="text-lime opacity-75">{item.role}</small>
                    </div>
                  </div>
                  <p className="text-light opacity-75 fst-italic">"{item.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= CONTACT FORM ================= */}
      {/* ================= CONTACT FORM ================= */}
      <section id='contact' className="py-5 text-white app-font" style={{ background: "#0C1A2B" }}>
        {/* Local styles to handle the specific placeholder visibility issues */}
        <style>{`
    .fitness-input {
      background: #112235 !important;
      border: 1px solid #2a3d50 !important;
      color: #ffffff !important;
    }

    .fitness-input:focus {
      border-color: #B6FF3B !important;
      box-shadow: 0 0 0 0.2rem rgba(182, 255, 59, 0.15) !important;
      outline: none;
    }

    /* Standard Placeholder Fix */
    .fitness-input::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
      opacity: 1; /* Firefox requires this */
    }

    /* Webkit (Chrome/Safari) Placeholder Fix */
    .fitness-input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
    }

    .btn-lime {
      background-color: #B6FF3B !important;
      color: #000 !important;
      border-radius: 0px !important;
      font-weight: 700 !important;
      border: none !important;
    }

    .btn-lime:hover {
      background-color: #a4e635 !important;
      transform: translateY(-1px);
    }
  `}</style>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold heading-font">
                  Connect with <span style={{ color: "#B6FF3B" }}>Coach</span>
                </h2>
                <p className="text-light opacity-50">Custom protocols and guidance.</p>
              </div>

              <form className="soft-card p-4" onSubmit={handleContactSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control fitness-input py-3"
                    placeholder="Full Name"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control fitness-input py-3"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    rows="4"
                    className="form-control fitness-input py-3"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-lime w-100 py-3">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer py-4 text-light opacity-50 app-font">
        <div className="container text-center">
          <p className="mb-1">© {new Date().getFullYear()} FitTrack Pro.</p>
          <small className="text-lime">POWERED BY DATA • DRIVEN BY DISCIPLINE</small>
        </div>
      </footer>
    </>
  );
};

export default Home;