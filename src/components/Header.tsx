import React from 'react';

const Header: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <h2 style={{ margin: 0 }}>Hotel Name</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>USER : FRONT DESK 1</p>
        <button style={{
          width: '120px',
          padding: '5px 10px',
          border: '1px solid #4caf50',
          borderRadius: '5px',
          background: 'white',
          cursor: 'pointer'
        }}>
          ☰ Menu
        </button>
      </div>

      {/* Right side */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555' }}>
        <p style={{ margin: 0 }}>{new Date().toLocaleDateString()}</p>
        <p style={{ margin: 0 }}>{new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Header;
