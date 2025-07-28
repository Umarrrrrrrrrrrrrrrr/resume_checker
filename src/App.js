import './App.css';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch('http://localhost:8000/upload/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(`Extracted text:\n${data.text}`);
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f7f7',
      minHeight: '100vh'
    }}>
      <header style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2>Upload a PDF to Extract Text</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{
            margin: '20px 0',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <br />
        <button
          onClick={handleUpload}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Upload and Parse
        </button>
      </header>
    </div>
  );
}

export default App;
