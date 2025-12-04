import React from 'react';

const BillingActions: React.FC<{ onAddItem?: () => void; onPrint?: () => void }> = ({ onAddItem, onPrint }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={onAddItem} style={{ padding: '10px', border: '1px solid #4caf50', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>
          + Add Item from Menu
        </button>
        <button onClick={onPrint} style={{ padding: '10px', border: '1px solid #ff9800', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>
          🖨️ Print Invoice
        </button>
        <button style={{ padding: '10px', border: '1px solid #4caf50', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>
          Calculate GST
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ flex: 1, padding: '10px', border: '1px solid #4caf50', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>Print</button>
          <button style={{ flex: 1, padding: '10px', border: '1px solid #4caf50', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default BillingActions;
