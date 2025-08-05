import './App.css';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);   //set result on the new file selection
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try{
    const response = await fetch('http://localhost:8000/upload/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  }catch(error){
    alert('Error uploading files');
  }finally{
    setLoading(false)
  }  
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
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Uploading...' : 'Upload and Parse'}
        </button>

          {result && (
            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              color: '#333',
              textAlign: 'left'
            }}> 
            <h3>Resume Grade: {result.grade}</h3>
            <pre style={{ whiteSpace: 'pre-wrap'}}>{result.text}</pre>

            </div>
          )}

      </header>
    </div>
  );
}

export default App;
