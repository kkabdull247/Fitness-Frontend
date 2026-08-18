import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Payment = () => {
  const [method, setMethod] = useState('card');
  const location = useLocation();

  // Dynamically get data from the Link state, with fallbacks for direct navigation
  const selectedPlan = location.state?.plan || "ELITE";
  const selectedPrice = location.state?.price || 19;

  // Map features based on the selected plan
  const planFeatures = {
    BASIC: ["Unlimited Workout Logs", "Basic Strength Graphs", "Community Access"],
    ELITE: ["Advanced AI Analytics", "Custom Macro Tracking", "1-on-1 Coach Messaging", "Predictive PR Modeling"],
    PRO: ["Team/Client Management", "White-label Exports", "API Data Access", "Priority Global Support"]
  };

  const currentFeatures = planFeatures[selectedPlan] || planFeatures.ELITE;

  return (
    <div className="min-vh-100 py-5 app-font" style={{ background: "#0C1A2B", color: "#fff" }}>
      <div className="container mt-4">
        
        {/* TOP NAVIGATION BACK BUTTON */}
        <div className="mb-5">
          <Link to="/home" className="text-lime text-decoration-none small fw-bold">
            <i className="bi bi-arrow-left me-2"></i> BACK TO PROTOCOLS
          </Link>
        </div>

        <div className="row g-5">
          
          {/* LEFT COLUMN: PAYMENT FORM */}
          <div className="col-lg-7">
            <div className="pe-lg-4">
              <h2 className="fw-bold mb-1 heading-font">Secure <span className="text-lime">Checkout</span></h2>
              <p className="text-secondary mb-5">Finalize your credentials to initialize the {selectedPlan} protocol.</p>
              
              <h6 className="text-uppercase fw-bold small text-secondary mb-3" style={{ letterSpacing: '1px' }}>1. Select Method</h6>
              <div className="d-flex gap-3 mb-5">
                <button 
                  onClick={() => setMethod('card')}
                  className={`btn flex-fill py-3 fw-bold transition-all ${method === 'card' ? 'btn-active' : 'btn-inactive'}`}
                >
                  <i className="bi bi-credit-card me-2"></i> CREDIT CARD
                </button>
                <button 
                  onClick={() => setMethod('crypto')}
                  className={`btn flex-fill py-3 fw-bold transition-all ${method === 'crypto' ? 'btn-active' : 'btn-inactive'}`}
                >
                  <i className="bi bi-currency-bitcoin me-2"></i> CRYPTO
                </button>
              </div>

              <h6 className="text-uppercase fw-bold small text-secondary mb-3" style={{ letterSpacing: '1px' }}>2. Payment Details</h6>
              <div className="p-4 p-md-5 rounded-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {method === 'card' ? (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                      <label className="form-label small text-uppercase fw-bold text-secondary">Cardholder Name</label>
                      <input type="text" className="form-control custom-input" placeholder="e.g. AVERY SMITH" />
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label small text-uppercase fw-bold text-secondary">Card Number</label>
                      <div className="input-group">
                        <input type="text" className="form-control custom-input border-end-0" placeholder="0000 0000 0000 0000" />
                        <span className="input-group-text custom-input border-start-0 text-secondary pe-3">
                          <i className="bi bi-lock-fill"></i>
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label small text-uppercase fw-bold text-secondary">Expiry Date</label>
                        <input type="text" className="form-control custom-input" placeholder="MM/YY" />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="form-label small text-uppercase fw-bold text-secondary">CVV/CVC</label>
                        <input type="text" className="form-control custom-input" placeholder="123" />
                      </div>
                    </div>

                    <button className="btn btn-lime w-100 py-3 fw-bold shadow-lg mt-2">
                      ACTIVATE {selectedPlan} NOW
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x71C7656EC7ab88b098defB751B7401B5f6d8976F" alt="QR Code" className="rounded-3 border border-white border-2 p-2 mb-4" />
                    <p className="small text-secondary mb-2">Transfer <strong>${selectedPrice}.00 USD</strong> equivalent to:</p>
                    <code className="d-block p-3 rounded bg-black text-lime mb-4 text-break">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                    <button className="btn btn-outline-lime btn-sm px-4">COPY ADDRESS</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY SUMMARY */}
          <div className="col-lg-5">
            <div className="sticky-top" style={{ top: "2rem" }}>
              <div className="p-4 p-xl-5 rounded-4" style={{ background: "rgba(182, 255, 59, 0.04)", border: "1px solid rgba(182, 255, 59, 0.15)" }}>
                <h4 className="fw-bold mb-4 heading-font">Order <span className="text-lime">Summary</span></h4>
                
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">{selectedPlan} Access</span>
                  <span className="fw-bold text-white">${selectedPrice}.00</span>
                </div>
                
                <div className="d-flex justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                  <span className="text-secondary">Network Surcharge</span>
                  <span className="text-lime fw-bold">FREE</span>
                </div>

                <div className="mb-5">
                  <h6 className="small fw-bold text-uppercase text-secondary mb-3">Included in Protocol:</h6>
                  {currentFeatures.map((feat, i) => (
                    <div key={i} className="small mb-2 d-flex align-items-center">
                      <i className="bi bi-patch-check text-lime me-2"></i> 
                      <span className="opacity-75">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <span className="d-block small text-secondary text-uppercase">Total Amount</span>
                    <span className="h1 mb-0 fw-bold text-white">${selectedPrice}<small className="fs-6 opacity-50">.00</small></span>
                  </div>
                </div>

                <div className="p-3 rounded-3 bg-black bg-opacity-25 border border-secondary border-opacity-25" style={{ fontSize: '0.75rem' }}>
                  <p className="mb-0 text-secondary">
                    <i className="bi bi-info-circle-fill me-2 text-lime"></i>
                    Billing occurs monthly. Protocol can be de-authorized at any time via system settings.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .text-lime { color: #B6FF3B !important; }
        .btn-lime { background: #B6FF3B; color: #000; border: none; transition: 0.3s; }
        .btn-lime:hover { background: #a2e635; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(182, 255, 59, 0.2); }
        
        .btn-active { background: #B6FF3B; color: #000; border: 1px solid #B6FF3B; }
        .btn-inactive { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); }
        .btn-inactive:hover { border-color: #B6FF3B; color: #B6FF3B; }

        .btn-outline-lime { border: 1px solid #B6FF3B; color: #B6FF3B; transition: 0.3s; }
        .btn-outline-lime:hover { background: #B6FF3B; color: #000; }
        
        .custom-input {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
          padding: 14px 18px;
          font-size: 0.9rem;
        }
        .custom-input:focus {
          border-color: #B6FF3B !important;
          box-shadow: 0 0 0 4px rgba(182, 255, 59, 0.1) !important;
        }
        .custom-input::placeholder { color: rgba(255,255,255,0.2); }

        .transition-all { transition: all 0.2s ease; }
      `}</style>
    </div>
  );
};

export default Payment;