import React from 'react';
import { useNavigate } from 'react-router-dom';

function NextPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Next Page</h1>
      <p>This is the next page after subscription.</p>
      <button onClick={() => navigate('/')}>
        Go Back to Home
      </button>
    </div>
  );
}

export default NextPage;