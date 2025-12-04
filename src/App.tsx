import React from 'react'
import Header from './components/Header'
import CartButton from './components/CartButton'

type MenuItem = { name: string; price: number; prep?: number; veg?: boolean; desc?: string; image?: string }

const tabs = ['Generate Bill', 'Table Management', 'Room Management', 'Order Management (Online)']

const sampleMenu: { heading: string; items: MenuItem[] }[] = [
  { 
    heading: 'Main Course', 
    items: [
      { name: 'South Thali', price: 280, prep: 20, veg: true, desc: 'Traditional south Indian rice with sambar, rasam & curd' },
      { name: 'North Thali', price: 300, prep: 22, veg: true, desc: 'Roti, dal, sabzi & pickle - authentic North Indian style' },
      { name: 'Special Biryani', price: 380, prep: 35, veg: false, desc: 'Fragrant basmati rice with tender chicken & spices' },
      { name: 'Paneer Butter Masala', price: 280, prep: 20, veg: true, desc: 'Creamy tomato sauce with cottage cheese' }
    ] 
  },
  { 
    heading: 'Starters', 
    items: [
      { name: 'Paneer Tikka', price: 160, prep: 18, veg: true, desc: 'Grilled cottage cheese with yogurt marinade' },
      { name: 'Chicken 65', price: 200, prep: 20, veg: false, desc: 'Spicy fried chicken - classic appetizer' },
      { name: 'Samosa (2pc)', price: 60, prep: 8, veg: true, desc: 'Crispy pastry with spiced potato filling' }
    ] 
  },
  { 
    heading: 'Desserts', 
    items: [
      { name: 'Gulab Jamun', price: 80, prep: 5, veg: true, desc: 'Soft milk dumplings in sugar syrup' },
      { name: 'Kheer', price: 100, prep: 8, veg: true, desc: 'Traditional rice pudding with condensed milk' }
    ] 
  },
]

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0])
  const [modal, setModal] = React.useState<null | { type: string; id?: string }>(null)

  const [selectedTable, setSelectedTable] = React.useState<string>('1')
  const [selectedItems, setSelectedItems] = React.useState<MenuItem[]>([])
  const [chefNotes, setChefNotes] = React.useState<string>('')
  const [cart, setCart] = React.useState<Array<{ table: string; items: MenuItem[]; notes?: string }>>([])
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [expandedCategory, setExpandedCategory] = React.useState<string>(sampleMenu[0].heading)
  const [printInvoice, setPrintInvoice] = React.useState<boolean>(false)

  const confirmAddToCart = () => {
    if (!selectedItems.length) return
    setCart(prev => [...prev, { table: selectedTable, items: selectedItems, notes: chefNotes }])
    setSelectedItems([]); setChefNotes(''); setSearchQuery(''); setSelectedTable('1'); setModal(null)
  }

  const filteredMenu = searchQuery.trim() === '' 
    ? sampleMenu 
    : sampleMenu.map(category => ({
        ...category,
        items: category.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(category => category.items.length > 0)

  return (
    <div style={{ padding: '20px' }}>
      <Header />

      {/* Tabs - styled like original design */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #d0e7cd',
        borderRadius: '8px',
        padding: '10px 0',
        backgroundColor: '#f1faf3',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab, i) => (
          <span
            key={i}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              minWidth: '150px',
              textAlign: 'center',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#4caf50' : '#000',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {activeTab === 'Generate Bill' ? (
          <>
            <div style={{ flex: 1, minWidth: '350px' }}>
              <div style={{ marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => setModal({ type: 'addItem' })} style={{ padding: '12px 16px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ Add Item from Menu</button>
                <button onClick={() => setPrintInvoice(true)} style={{ padding: '12px 16px', background: '#ff9800', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>🖨️ Print Invoice</button>
                <button style={{ padding: '12px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Calculate GST</button>
                <button style={{ padding: '12px 16px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Share</button>
              </div>
              <button style={{ width: '100%', padding: '14px 16px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 20 }}>Generate Bill</button>
              <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>Recent Items</h3>
                <p style={{ margin: 0, color: '#999', fontSize: 13 }}>No recent items</p>
              </div>
            </div>
            <div style={{ flex: 0.8, minWidth: '300px', maxHeight: '40vh', overflowY: 'auto', background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>Invoice Preview</h3>
              <div style={{ background: '#fff', padding: 12, borderRadius: 6, border: '1px solid #e0e0e0' }}>
                <div style={{ fontSize: 11, lineHeight: 1.6, fontFamily: 'monospace', color: '#333' }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 'bold' }}>Hotel Ashirvad</div>
                    <div style={{ fontSize: 9, color: '#666' }}>Cash/Credit Memo</div>
                  </div>
                  
                  <div style={{ borderBottom: '1px solid #ddd', paddingBottom: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 9 }}>Room No: ___________</div>
                    <div style={{ fontSize: 9 }}>Dated: ___________</div>
                    <div style={{ fontSize: 9 }}>Guest Name: ___________</div>
                    <div style={{ fontSize: 9 }}>Arrival: __________ | Departure: __________</div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8, fontSize: 9 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <th style={{ textAlign: 'left', padding: 4, borderRight: '1px solid #ddd' }}>S.No</th>
                        <th style={{ textAlign: 'left', padding: 4, borderRight: '1px solid #ddd' }}>Particulars</th>
                        <th style={{ textAlign: 'right', padding: 4, borderRight: '1px solid #ddd' }}>Rate</th>
                        <th style={{ textAlign: 'right', padding: 4 }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td colSpan={4} style={{ padding: 20, textAlign: 'center', color: '#999' }}>No items yet</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ borderTop: '1px solid #ddd', paddingTop: 4, marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span>Amount in Words:</span>
                      <span>_____________</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span>Sub Total:</span>
                      <span>₹0</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span>Tax:</span>
                      <span>₹0</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderTop: '1px solid #ddd', paddingTop: 4 }}>
                      <span>Grand Total:</span>
                      <span>₹0</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #ddd', fontSize: 8, textAlign: 'center', color: '#666' }}>
                    <div>Cust. Signature | Checked by | Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'Table Management' ? (
          <div style={{ width: '100%' }}>
            <h2>Table Management</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[1,2,3,4].map(t => {
                const tableOrders = cart.filter(c => c.table === String(t))
                const occupied = tableOrders.length > 0
                const itemCount = tableOrders.reduce((sum, c) => sum + c.items.length, 0)
                return (
                  <div 
                    key={t} 
                    onClick={() => setModal({ type: 'table', id: String(t) })} 
                    style={{ 
                      width: 120, 
                      height: 80, 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: 8, 
                      background: occupied ? '#ff8a80' : '#c8e6c9', 
                      cursor: 'pointer',
                      padding: 8
                    }}
                  >
                    <strong>Table {t}</strong>
                    {occupied && <span style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>{itemCount} items</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ) : activeTab === 'Room Management' ? (
          <div style={{ width: '100%' }}>
            <h2>Room Management</h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['101','102','103'].map(r => {
                const roomOrders = cart.filter(c => c.table === r)
                const occupied = roomOrders.length > 0
                const itemCount = roomOrders.reduce((sum, c) => sum + c.items.length, 0)
                return (
                  <div 
                    key={r} 
                    onClick={() => setModal({ type: 'room', id: r })} 
                    style={{ 
                      width: 120, 
                      height: 80, 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: 8, 
                      background: occupied ? '#ff8a80' : '#e3f2fd', 
                      cursor: 'pointer',
                      padding: 8
                    }}
                  >
                    <strong>Room {r}</strong>
                    {occupied && <span style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>{itemCount} items</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <h2>Online Orders</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, padding: 12, background: '#fff', borderRadius: 8 }}><h4>Zomato</h4><p>No live orders</p></div>
              <div style={{ flex: 1, padding: 12, background: '#fff', borderRadius: 8 }}><h4>Swiggy</h4><p>No live orders</p></div>
            </div>
          </div>
        )}
      </div>



      {/* Modals */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModal(null)}>
          <div style={{ background: '#fff', borderRadius: 12, minWidth: '90vw', maxWidth: '1000px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} style={{ position: 'absolute', right: 16, top: 16, border: 'none', background: 'none', fontSize: 28, cursor: 'pointer', color: '#333', zIndex: 100, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

            {modal.type === 'addItem' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
                  <h2 style={{ margin: '0 0 16px 0', fontSize: 24, color: '#1a1a1a' }}>Order from Menu</h2>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6, fontWeight: 500 }}>Select Table/Room</label>
                      <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, fontFamily: 'inherit' }}>
                        <optgroup label="Dine In Tables">
                          {[1,2,3,4].map(t => <option key={t} value={String(t)}>Table {t}</option>)}
                        </optgroup>
                        <optgroup label="Rooms">
                          {['101','102','103'].map(r => <option key={r} value={r}>Room {r}</option>)}
                        </optgroup>
                      </select>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 6, fontWeight: 500 }}>Search Items</label>
                      <input type="text" placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, fontFamily: 'inherit' }} />
                    </div>
                  </div>
                </div>

                {/* Main content - two columns */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                  {/* Left: Menu */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', borderRight: '1px solid #e0e0e0', maxHeight: 'calc(90vh - 200px)' }}>
                    {filteredMenu.length === 0 ? (
                      <p style={{ color: '#999', textAlign: 'center', paddingTop: 40 }}>No items found</p>
                    ) : (
                      filteredMenu.map((category, ci) => (
                        <div key={ci} style={{ marginBottom: 24 }}>
                          {/* Accordion Header */}
                          <button
                            onClick={() => setExpandedCategory(expandedCategory === category.heading ? '' : category.heading)}
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              background: expandedCategory === category.heading ? '#4caf50' : '#f0f0f0',
                              color: expandedCategory === category.heading ? '#fff' : '#1a1a1a',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 15,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'all 0.2s'
                            }}
                          >
                            {category.heading}
                            <span style={{ fontSize: 18 }}>{expandedCategory === category.heading ? '▼' : '▶'}</span>
                          </button>

                          {/* Accordion Content */}
                          {expandedCategory === category.heading && (
                            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                              {category.items.map((item, ii) => (
                                <div
                                  key={ii}
                                  style={{
                                    display: 'flex',
                                    gap: 12,
                                    padding: 12,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 8,
                                    background: '#fafafa',
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  {/* Item Image Placeholder */}
                                  <div style={{ width: 80, height: 80, background: '#e0e7ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 32 }}>
                                    🍽️
                                  </div>

                                  {/* Item Details */}
                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 6 }}>
                                      <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{item.name}</h4>
                                        <p style={{ margin: 0, fontSize: 12, color: '#999', fontStyle: 'italic' }}>{item.desc}</p>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {item.veg ? <span style={{ fontSize: 14 }}>🟢</span> : <span style={{ fontSize: 14 }}>🔴</span>}
                                        {item.prep && <span style={{ fontSize: 11, color: '#999', background: '#f0f0f0', padding: '2px 6px', borderRadius: 3 }}>{item.prep}m</span>}
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: 16, fontWeight: 700, color: '#4caf50' }}>₹{item.price}</span>
                                      <button
                                        onClick={() => setSelectedItems(prev => [...prev, item])}
                                        style={{
                                          padding: '6px 12px',
                                          background: '#4caf50',
                                          color: '#fff',
                                          border: 'none',
                                          borderRadius: 6,
                                          fontSize: 12,
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                          transition: 'all 0.2s'
                                        }}
                                      >
                                        + Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Right: Order Summary (Sticky) */}
                  <div style={{ width: 340, background: '#f8f9fa', borderLeft: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                    {/* Summary Header */}
                    <div style={{ padding: '20px 16px', borderBottom: '1px solid #e0e0e0', background: '#fff' }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 700 }}>Order Summary</h3>
                      <p style={{ margin: 0, fontSize: 12, color: '#999' }}>Table {selectedTable}</p>
                    </div>

                    {/* Selected Items */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
                      {selectedItems.length === 0 ? (
                        <p style={{ color: '#ccc', fontSize: 13, textAlign: 'center', paddingTop: 20 }}>No items selected</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {Object.entries(selectedItems.reduce((acc, item) => {
                            const key = item.name
                            if (!acc[key]) acc[key] = { ...item, quantity: 0 }
                            acc[key].quantity += 1
                            return acc
                          }, {} as Record<string, MenuItem & { quantity: number }>)).map(([name, item]) => (
                            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#fff', borderRadius: 6, fontSize: 13, borderLeft: '3px solid #4caf50' }}>
                              <div>
                                <div style={{ fontWeight: 500, color: '#1a1a1a' }}>
                                  {item.name} <span style={{ background: '#4caf50', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 11, fontWeight: 600, marginLeft: 6 }}>×{item.quantity}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#999' }}>₹{item.price} each</div>
                              </div>
                              <button
                                onClick={() => setSelectedItems(prev => prev.filter(i => i.name !== name))}
                                style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, width: 20, height: 20, padding: 0, fontSize: 12, cursor: 'pointer' }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Chef Notes */}
                    <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 8, color: '#1a1a1a' }}>Cooking Notes</label>
                      <textarea
                        value={chefNotes}
                        onChange={e => setChefNotes(e.target.value)}
                        placeholder="E.g., Extra spicy, hold the onions..."
                        rows={3}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', resize: 'none' }}
                      />
                    </div>

                    {/* Total & Button */}
                    <div style={{ padding: '16px', borderTop: '1px solid #e0e0e0', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                        <span style={{ fontWeight: 500 }}>Total</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#4caf50' }}>₹{selectedItems.reduce((sum, item) => sum + item.price, 0)}</span>
                      </div>
                      <button
                        onClick={confirmAddToCart}
                        disabled={!selectedItems.length}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: selectedItems.length > 0 ? '#4caf50' : '#ccc',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s'
                        }}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modal.type === 'table' && (<div style={{ padding: 24 }}><h3 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 700 }}>Table {modal.id} Orders</h3><div>{cart.filter(c => c.table === modal.id).length === 0 ? <p style={{ color: '#999', fontSize: 14 }}>No orders for this table</p> : cart.filter(c => c.table === modal.id).map((c, idx) => (<div key={idx} style={{ padding: 12, background: '#f8f9fa', borderRadius: 8, marginBottom: 12 }}><ul style={{ margin: 0, paddingLeft: 20 }}>{c.items.map((it, i) => <li key={i} style={{ fontSize: 14, marginBottom: 4 }}>{it.name} — ₹{it.price}</li>)}</ul><div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>Notes: {c.notes || '-'}</div></div>))}</div></div>)}

            {modal.type === 'room' && (<div style={{ padding: 24 }}><h3 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 700 }}>Room {modal.id} Orders</h3><div>{cart.filter(c => c.table === modal.id).length === 0 ? <p style={{ color: '#999', fontSize: 14 }}>No orders for this room</p> : cart.filter(c => c.table === modal.id).map((c, idx) => (<div key={idx} style={{ padding: 12, background: '#f8f9fa', borderRadius: 8, marginBottom: 12 }}><ul style={{ margin: 0, paddingLeft: 20 }}>{c.items.map((it, i) => <li key={i} style={{ fontSize: 14, marginBottom: 4 }}>{it.name} — ₹{it.price}</li>)}</ul><div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>Notes: {c.notes || '-'}</div></div>))}</div></div>)}
          </div>
        </div>
      )}

      <CartButton count={cart.reduce((s, c) => s + c.items.length, 0)} onOpen={() => setModal({ type: 'cart' })} />

      {/* Print Invoice Modal */}
      {printInvoice && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setPrintInvoice(false)}>
          <div style={{ background: '#fff', borderRadius: 12, minWidth: 600, maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setPrintInvoice(false)} style={{ position: 'absolute', right: 16, top: 16, border: 'none', background: 'none', fontSize: 28, cursor: 'pointer', color: '#333', zIndex: 100, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

            {/* Print Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>🧾 Invoice</h2>
            </div>

            {/* Invoice Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {cart.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', paddingTop: 40, fontSize: 14 }}>No orders to print</p>
              ) : (
                <>
                  {/* Invoce Summary */}
                  <div style={{ marginBottom: 24, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                      <span style={{ color: '#666' }}>Total Orders:</span>
                      <strong style={{ color: '#1a1a1a' }}>{cart.length}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                      <span style={{ color: '#666' }}>Total Items:</span>
                      <strong style={{ color: '#1a1a1a' }}>{cart.reduce((s, c) => s + c.items.length, 0)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: '#4caf50', borderTop: '1px solid #ddd', paddingTop: 8, marginTop: 8 }}>
                      <span>Grand Total:</span>
                      <span>₹{cart.reduce((sum, c) => sum + c.items.reduce((s, it) => s + it.price, 0), 0)}</span>
                    </div>
                  </div>

                  {/* Orders by Table */}
                  <div>
                    {cart.map((c, i) => (
                      <div key={i} style={{ marginBottom: 16, padding: 16, border: '1px solid #e0e0e0', borderRadius: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#4caf50' }}>Table {c.table}</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                              <th style={{ textAlign: 'left', padding: 8, fontSize: 12, fontWeight: 600, color: '#666' }}>Item</th>
                              <th style={{ textAlign: 'center', padding: 8, fontSize: 12, fontWeight: 600, color: '#666' }}>Qty</th>
                              <th style={{ textAlign: 'right', padding: 8, fontSize: 12, fontWeight: 600, color: '#666' }}>Price</th>
                              <th style={{ textAlign: 'right', padding: 8, fontSize: 12, fontWeight: 600, color: '#666' }}>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(c.items.reduce((acc, item) => {
                              const key = item.name
                              if (!acc[key]) acc[key] = { ...item, quantity: 0 }
                              acc[key].quantity += 1
                              return acc
                            }, {} as Record<string, MenuItem & { quantity: number }>)).map(([name, item]) => (
                              <tr key={name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: 8, fontSize: 13, color: '#1a1a1a' }}>{item.name}</td>
                                <td style={{ padding: 8, fontSize: 13, color: '#666', textAlign: 'center' }}>{item.quantity}</td>
                                <td style={{ padding: 8, fontSize: 13, color: '#666', textAlign: 'right' }}>₹{item.price}</td>
                                <td style={{ padding: 8, fontSize: 13, color: '#1a1a1a', fontWeight: 600, textAlign: 'right' }}>₹{item.price * item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{ fontSize: 12, color: '#666', paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
                          <strong>Table Total:</strong> ₹{c.items.reduce((sum, it) => sum + it.price, 0)}
                        </div>
                        {c.notes && <div style={{ marginTop: 8, fontSize: 12, color: '#ff9800', padding: '8px 10px', background: '#fff9e6', borderLeft: '3px solid #ff9800', borderRadius: 4 }}>📝 Notes: {c.notes}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Print Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e0e0e0', background: '#f8f9fa', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setPrintInvoice(false)} style={{ padding: '10px 20px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#1a1a1a' }}>Cancel</button>
              <button onClick={() => window.print()} style={{ padding: '10px 20px', border: 'none', background: '#4caf50', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>🖨️ Print</button>
            </div>
          </div>
        </div>
      )}

      <CartButton count={cart.reduce((s, c) => s + c.items.length, 0)} onOpen={() => setModal({ type: 'cart' })} />

      {modal && modal.type === 'cart' && (<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModal(null)}><div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 400, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', position: 'relative' }} onClick={e => e.stopPropagation()}><button onClick={() => setModal(null)} style={{ position: 'absolute', right: 16, top: 16, border: 'none', background: 'none', fontSize: 28, cursor: 'pointer', color: '#333', zIndex: 100, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button><h2 style={{ margin: '0 0 16px 0', fontSize: 24, fontWeight: 700 }}>🧾 All Orders</h2><div style={{ fontSize: 13, color: '#999', marginBottom: 20, padding: '12px 16px', background: '#f8f9fa', borderRadius: 8 }}>Total: <strong>{cart.length}</strong> table orders | <strong>{cart.reduce((s, c) => s + c.items.length, 0)}</strong> items</div>{cart.length === 0 ? <p style={{ color: '#999', textAlign: 'center', paddingTop: 20 }}>No orders yet</p> : cart.map((c, i) => (<div key={i} style={{ marginBottom: 16, padding: 16, border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafafa' }}><div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#4caf50' }}>Table {c.table}</div><ul style={{ margin: 0, paddingLeft: 20 }}>{c.items.map((it, ii) => <li key={ii} style={{ fontSize: 13, marginBottom: 6, color: '#1a1a1a' }}><span>{it.name}</span> <span style={{ color: '#999' }}>— ₹{it.price}</span></li>)}</ul>{c.notes && <div style={{ marginTop: 10, fontSize: 12, color: '#666', padding: '8px 10px', background: '#fff', borderLeft: '3px solid #ff9800', borderRadius: 4 }}>📝 Notes: {c.notes}</div>}</div>))}</div></div>)}
    </div>
  )
}

export default App
