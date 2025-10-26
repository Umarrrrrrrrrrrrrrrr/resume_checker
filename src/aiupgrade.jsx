import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './aiupgrade.css';

function AIUpgrade() {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalCV, setOriginalCV] = useState('');
  const [upgradedCV, setUpgradedCV] = useState('');
  const [editableCV, setEditableCV] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [grade, setGrade] = useState('');

  // Load the original CV data (in real app, this would come from your grading system)
  useEffect(() => {
    // Simulate loading previously graded CV data
    const savedCV = localStorage.getItem('gradedCV');
    const savedGrade = localStorage.getItem('cvGrade');
    
    if (savedCV) {
      setOriginalCV(savedCV);
      setEditableCV(savedCV);
    }
    
    if (savedGrade) {
      setGrade(savedGrade);
    }
    
    // If no data found, you might want to redirect back to grading page
    if (!savedCV) {
      navigate('/');
    }
  }, [navigate]);

  const upgradeCV = async () => {
    setIsLoading(true);
    
    try {
      // Call your Ollama API with stablelm-zephyr model to upgrade the CV
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'stablelm-zephyr',
          prompt: `Upgrade and optimize the following CV to make it more professional, impactful, and ATS-friendly. Keep the essential information but improve the wording, structure, and impact. Return only the upgraded CV without any explanations:\n\n${originalCV}`,
          stream: false
        })
      });

      const data = await response.json();
      const upgradedContent = data.response;
      
      setUpgradedCV(upgradedContent);
      setEditableCV(upgradedContent);
      
      // Save upgraded CV
      localStorage.setItem('upgradedCV', upgradedContent);
      
    } catch (error) {
      console.error('Error upgrading CV:', error);
      alert('Error upgrading CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCVChange = (e) => {
    setEditableCV(e.target.value);
  };

  const downloadCV = () => {
    const element = document.createElement('a');
    const file = new Blob([editableCV], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'upgraded-professional-cv.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const saveChanges = () => {
    setUpgradedCV(editableCV);
    localStorage.setItem('upgradedCV', editableCV);
    setIsEditing(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="ai-upgrade-container">
      <header className="upgrade-header">
        <h1>AI CV Upgrade</h1>
        <p>Transform your CV from {grade || 'average'} to exceptional</p>
      </header>

      <div className="upgrade-content">
        {/* Original CV Section */}
        <section className="cv-section original-cv">
          <h2>Your Original CV</h2>
          <div className="cv-display">
            <pre>{originalCV}</pre>
          </div>
          <div className="grade-badge">
            Previous Grade: <span className="grade-value">{grade || 'Not Graded'}</span>
          </div>
        </section>

        {/* Upgrade Action Section */}
        <section className="upgrade-action-section">
          <button 
            onClick={upgradeCV} 
            disabled={isLoading}
            className="upgrade-btn"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Upgrading Your CV...
              </>
            ) : (
              '✨ Upgrade My CV with AI'
            )}
          </button>
          
          {isLoading && (
            <p className="upgrade-note">
              Our AI is analyzing and enhancing your CV for better impact...
            </p>
          )}
        </section>

        {/* Upgraded CV Section */}
        {upgradedCV && (
          <section className="cv-section upgraded-cv">
            <div className="section-header">
              <h2>Your Upgraded CV</h2>
              <div className="action-buttons">
                <button 
                  onClick={handleEditToggle}
                  className="edit-btn"
                >
                  {isEditing ? 'Preview' : 'Edit CV'}
                </button>
                <button 
                  onClick={downloadCV}
                  className="download-btn"
                >
                  📥 Download CV
                </button>
                {isEditing && (
                  <button 
                    onClick={saveChanges}
                    className="save-btn"
                  >
                    💾 Save Changes
                  </button>
                )}
              </div>
            </div>

            <div className="cv-display upgraded">
              {isEditing ? (
                <textarea
                  value={editableCV}
                  onChange={handleCVChange}
                  className="cv-editor"
                  placeholder="Edit your upgraded CV here..."
                />
              ) : (
                <pre>{editableCV}</pre>
              )}
            </div>

            <div className="improvement-features">
              <h4>✨ AI Improvements Applied:</h4>
              <ul>
                <li>✅ Professional language enhancement</li>
                <li>✅ ATS-friendly formatting</li>
                <li>✅ Impact-driven bullet points</li>
                <li>✅ Industry-specific keywords</li>
                <li>✅ Improved structure and flow</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button 
          onClick={() => navigate('/')}
          className="nav-btn secondary"
        >
          ← Back to Home
        </button>
        <button 
          onClick={() => navigate('/upgrade-cv')}
          className="nav-btn primary"
        >
          Upgrade Another CV
        </button>
      </div>
    </div>
  );
}

export default AIUpgrade;