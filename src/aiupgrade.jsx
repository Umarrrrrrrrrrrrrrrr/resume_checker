import React from 'react';
import { useNavigate } from 'react-router-dom';

function aiupgrade() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Next Page - Payment method</h1>
      <p>This is the next page after subscription and we need to make payment method here.</p>
      <button onClick={() => navigate('/')}>
        Go Back to Home
      </button>
      <button onClick={() => navigate('upgrade-cv')}>subscribe</button>
    </div>
  );
}

export default aiupgrade;