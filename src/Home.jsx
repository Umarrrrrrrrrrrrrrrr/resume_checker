import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    navigate("/next");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error uploading files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="subscription-section">
        <h2>To use our AI resume system</h2>
        <button 
          onClick={handleSubscribe}
          className="subscribe-btn"
        > 
          Subscribe
        </button>
      </div>

      <div className="upload-section">
        <h2>Upload a PDF to Extract Text</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <br />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="upload-btn"
        >
          {loading ? 'Uploading...' : 'Upload and Parse'}
        </button>

        {result && (
          <div className="result-section">
            <h3>Resume Grade: {result.grade}</h3>
            <pre className="result-text">{result.text}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;