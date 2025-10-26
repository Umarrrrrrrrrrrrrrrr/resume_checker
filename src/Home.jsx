import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    navigate("/next");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      
      setResult(data);
    } catch (error) {
      setError(`⚠️ ${error.message || "Error uploading or analyzing your resume. Try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (grade) => {
    if (grade >= 80) return "#10b981"; // Green
    if (grade >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  const getScoreMessage = (grade) => {
    if (grade >= 80) return "Excellent!";
    if (grade >= 60) return "Good job!";
    if (grade >= 40) return "Needs work";
    return "Needs major improvements";
  };

  return (
    <div className="home-gradient">
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="logo">
          AI Resume<span>Check</span>
        </div>

        <div
          className={`menu-toggle ${showSidebar ? "active" : ""}`}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      {/* --- Sidebar Overlay --- */}
      {showSidebar && (
        <div 
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <div className={`subscribe-sidebar ${showSidebar ? "active" : ""}`}>
        <button 
          className="close-sidebar"
          onClick={() => setShowSidebar(false)}
        >
          ×
        </button>
        <h3>🚀 Upgrade Your CV</h3>
        <p>Get AI-powered personalized suggestions, professional templates, and detailed analytics.</p>
        
        <div className="sidebar-features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Detailed Analytics</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎨</span>
            <span>Professional Templates</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span>AI Rewriting</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📈</span>
            <span>ATS Optimization</span>
          </div>
        </div>

        <button onClick={handleSubscribe} className="subscribe-btn">
          Upgrade Now - $9.99/month
        </button>
        
        <div className="sidebar-footer">
          <p>⭐ 4.8/5 from 2,000+ users</p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="content-container">
        <div className="text-section">
          <h1>
            Is your resume <span>good enough?</span>
          </h1>
          <p>
            Get AI-powered insights into your resume's structure, content, and impact — 
            so you can stand out from the crowd and land more interviews.
          </p>

          <div className="upload-box">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-label">
              {file ? (
                <div className="file-selected">
                  <span className="file-icon">📄</span>
                  {file.name}
                </div>
              ) : (
                <div className="file-placeholder">
                  <span className="upload-icon">📤</span>
                  Drop your resume here or choose a file
                </div>
              )}
            </label>

            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`upload-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  🤖 AI Analyzing...
                </div>
              ) : (
                "Upload & Analyze Resume"
              )}
            </button>

            <p className="file-note">PDF only. Max 5MB file size.</p>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        {/* --- Right Preview Section --- */}
        <div className="preview-section">
          {result ? (
            <div className="result-card live-result">
              <div className="score-header">
                <h3>Resume Score</h3>
                <span className="model-badge">{result.model_used || 'AI'}</span>
              </div>
              
              <div 
                className="score-circle"
                style={{ 
                  background: `conic-gradient(${getScoreColor(result.grade)} ${(result.grade / 100) * 360}deg, #e5e7eb 0deg)` 
                }}
              >
                <div className="score-inner">
                  <span className="score-number">{result.grade}</span>
                  <small>/100</small>
                </div>
              </div>
              
              <div className="score-message">
                <span className="message-text">{getScoreMessage(result.grade)}</span>
              </div>
              
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Summary</span>
                  <span className="breakdown-value">{result.summary?.length > 100 ? result.summary.substring(0, 100) + '...' : result.summary}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mock-result-card">
              <h3>Resume Score Preview</h3>
              <div className="score-circle demo-circle">
                <div className="score-inner">
                  <span>92</span>
                  <small>/100</small>
                </div>
              </div>
              <p className="score-desc">
                Based on formatting, keyword density, clarity, and professional impact.
              </p>
              <div className="demo-features">
                <div className="demo-feature">✅ ATS Friendly</div>
                <div className="demo-feature">✅ Professional Structure</div>
                <div className="demo-feature">✅ Impactful Content</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Detailed Result Display --- */}
      {result && (
        <div className="result-section">
          <h3>📊 Detailed AI Analysis</h3>
          <div className="detailed-results">
            <div className="result-column">
              <div className="result-box">
                <h4>🎯 Summary</h4>
                <p>{result.summary}</p>
              </div>
              
              <div className="result-box">
                <h4>✅ Strengths</h4>
                <ul>
                  {result.strengths?.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="result-column">
              <div className="result-box">
                <h4>📝 Improvement Suggestions</h4>
                <p>{result.improvement_suggestions}</p>
              </div>
              
              <div className="result-box">
                <h4>⚠️ Areas to Improve</h4>
                <ul>
                  {result.weaknesses?.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {result.text && (
            <div className="extracted-text">
              <h4>📄 Extracted Resume Text</h4>
              <div className="text-content">
                {result.text}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;