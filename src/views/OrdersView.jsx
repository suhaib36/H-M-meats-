import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  Eye,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  UtensilsCrossed,
  Flame,
  CheckSquare,
  Square,
  X,
  AlertCircle
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';
import { HMLogo } from '../components/HMLogo';

export function OrdersView({
  orders,
  onUpdateOrderStatus,
  onUpdateOrderChecklist,
  selectedOrder,
  setSelectedOrder
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [prepFilter, setPrepFilter] = useState('All');
  const [payFilter, setPayFilter] = useState('All');
  const [activeModalOrder, setActiveModalOrder] = useState(selectedOrder || null);

  // Sync prop changes
  React.useEffect(() => {
    if (selectedOrder) {
      setActiveModalOrder(selectedOrder);
    }
  }, [selectedOrder]);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.organization && o.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.venueAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrep = prepFilter === 'All' || o.preparationStatus === prepFilter;
    const matchesPay = payFilter === 'All' || o.paymentStatus === payFilter;

    return matchesSearch && matchesPrep && matchesPay;
  });

  const prepStages = ['Not Started', 'In Preparation', 'Ready', 'Completed'];
  const payStatuses = ['Unpaid', 'Deposit Received', 'Paid'];

  const handleToggleChecklist = (orderId, stepIdx) => {
    onUpdateOrderChecklist(orderId, stepIdx);
    if (activeModalOrder && activeModalOrder.id === orderId) {
      const updatedChecklist = [...activeModalOrder.kitchenChecklist];
      updatedChecklist[stepIdx].done = !updatedChecklist[stepIdx].done;
      setActiveModalOrder({ ...activeModalOrder, kitchenChecklist: updatedChecklist });
    }
  };

  const handlePrepStatusChange = (orderId, newStatus) => {
    onUpdateOrderStatus(orderId, { preparationStatus: newStatus });
    if (activeModalOrder && activeModalOrder.id === orderId) {
      setActiveModalOrder({ ...activeModalOrder, preparationStatus: newStatus });
    }
  };

  const handlePayStatusChange = (orderId, newStatus) => {
    onUpdateOrderStatus(orderId, { paymentStatus: newStatus });
    if (activeModalOrder && activeModalOrder.id === orderId) {
      setActiveModalOrder({ ...activeModalOrder, paymentStatus: newStatus });
    }
  };

  const handlePrintKitchenSheet = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Top Search & Filter Bar */}
      <div
        className="card"
        style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 260, maxWidth: 440 }}>
            <Search
              size={16}
              color="#78716C"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by order #, customer, venue..."
              className="form-input"
              style={{ paddingLeft: 36, fontSize: 13.5 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ fontSize: 13, color: '#78716C' }}>
            Showing <strong>{filtered.length}</strong> confirmed catering orders
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 10, borderTop: '1px solid var(--hm-line-light)' }}>
          {/* Prep Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#78716C', marginRight: 4 }}>
              Kitchen Prep:
            </span>
            {['All', ...prepStages].map((st) => {
              const active = prepFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setPrepFilter(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? '#8F1D1D' : '#FAF7F2',
                    color: active ? '#FFFFFF' : '#44403C',
                    border: active ? '1px solid #8F1D1D' : '1px solid #E7E2DA'
                  }}
                >
                  {st}
                </button>
              );
            })}
          </div>

          {/* Payment Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#78716C', marginRight: 4 }}>
              Payment:
            </span>
            {['All', ...payStatuses].map((st) => {
              const active = payFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setPayFilter(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? '#166534' : '#FAF7F2',
                    color: active ? '#FFFFFF' : '#44403C',
                    border: active ? '1px solid #166534' : '1px solid #E7E2DA'
                  }}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer &amp; Event</th>
              <th>Event Date &amp; Time</th>
              <th style={{ textAlign: 'center' }}>Guests</th>
              <th style={{ textAlign: 'right' }}>Order Value</th>
              <th>Kitchen Prep Stage</th>
              <th>Payment Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 36, textAlign: 'center', color: '#78716C' }}>
                  No confirmed event orders found matching your filters.
                </td>
              </tr>
            ) : (
              filtered.map((ord) => (
                <tr key={ord.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#8F1D1D', fontSize: 13 }}>
                      {ord.orderNumber}
                    </span>
                    <div style={{ fontSize: 11, color: '#78716C' }}>
                      Ref: {ord.requestId || 'Direct'}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, color: '#1C1917' }}>
                      {ord.customerName}
                    </div>
                    {ord.organization && (
                      <div style={{ fontSize: 12, color: '#78716C' }}>
                        {ord.organization}
                      </div>
                    )}
                    <div style={{ fontSize: 11.5, color: '#57534E', marginTop: 2 }}>
                      <span className="truncate" style={{ maxWidth: 200, display: 'inline-block' }}>
                        {ord.venueAddress}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, color: '#1C1917', fontSize: 13 }}>
                      {ord.eventDate}
                    </div>
                    <div style={{ fontSize: 12, color: '#78716C' }}>
                      {ord.preferredTime}
                    </div>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 13.5, color: '#1C1917' }}>
                      {ord.guestCount}
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 800, color: '#1C1917', fontSize: 14 }}>
                      ${Number(ord.totalValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>

                  <td>
                    <span className={`badge badge-prep-${ord.preparationStatus.toLowerCase().replace(' ', '-')}`}>
                      {ord.preparationStatus}
                    </span>
                  </td>

                  <td>
                    <span className={`badge badge-pay-${ord.paymentStatus.toLowerCase().replace(' ', '-')}`}>
                      {ord.paymentStatus}
                    </span>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setActiveModalOrder(ord)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '5px 12px', fontSize: 12 }}
                    >
                      <Eye size={13} />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail & Kitchen Prep Sheet Modal */}
      {activeModalOrder && (
        <div className="modal-backdrop" onClick={() => setActiveModalOrder(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 840, maxHeight: '92vh' }}
          >
            {/* Header */}
            <div className="modal-header no-print">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ShoppingBag size={20} color="#15803D" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1C1917' }}>
                      {activeModalOrder.customerName}
                    </h2>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#8F1D1D', fontSize: 13 }}>
                      {activeModalOrder.orderNumber}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#78716C', marginTop: 2 }}>
                    Confirmed Event for {activeModalOrder.eventDate} ({activeModalOrder.preferredTime}) • {activeModalOrder.guestCount} Guests
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={handlePrintKitchenSheet}
                  className="btn btn-secondary btn-sm"
                  title="Print Kitchen Preparation Sheet / Packing Slip"
                >
                  <Printer size={14} />
                  <span>Print Kitchen Sheet</span>
                </button>
                <button onClick={() => setActiveModalOrder(null)} className="btn-icon">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="modal-body printable-kitchen-sheet" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Top Quick Status Switchers Bar */}
              <div
                className="no-print"
                style={{
                  padding: '14px 18px',
                  backgroundColor: '#FAF7F2',
                  borderRadius: 10,
                  border: '1px solid #E7E2DA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 14
                }}
              >
                {/* Prep stage switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Flame size={16} color="#8F1D1D" />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                    Kitchen Prep Stage:
                  </span>
                  <select
                    className="form-select"
                    style={{ padding: '4px 10px', fontSize: 12.5, width: 'auto' }}
                    value={activeModalOrder.preparationStatus}
                    onChange={(e) => handlePrepStatusChange(activeModalOrder.id, e.target.value)}
                  >
                    {prepStages.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Payment status switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarSign size={16} color="#15803D" />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                    Payment Status:
                  </span>
                  <select
                    className="form-select"
                    style={{ padding: '4px 10px', fontSize: 12.5, width: 'auto' }}
                    value={activeModalOrder.paymentStatus}
                    onChange={(e) => handlePayStatusChange(activeModalOrder.id, e.target.value)}
                  >
                    {payStatuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event Location & Contact Info */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  padding: 16,
                  backgroundColor: '#FAF7F2',
                  borderRadius: 10,
                  border: '1px solid #E7E2DA'
                }}
              >
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    Event Destination &amp; Timing
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                    {activeModalOrder.venueAddress}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 4 }}>
                    Date: <strong>{activeModalOrder.eventDate}</strong> | Time: <strong>{activeModalOrder.preferredTime}</strong>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E' }}>
                    Headcount: <strong>{activeModalOrder.guestCount} Guests</strong> ({activeModalOrder.eventType || 'Event'})
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    Contact &amp; Financials
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                    {activeModalOrder.customerName}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 4 }}>
                    Phone: {activeModalOrder.phone} | Email: {activeModalOrder.email}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E' }}>
                    Total Order Value: <strong style={{ color: '#8F1D1D' }}>${Number(activeModalOrder.totalValue || 0).toFixed(2)}</strong> ({activeModalOrder.paymentStatus})
                  </div>
                </div>
              </div>

              {/* Menu Breakdown Table */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <UtensilsCrossed size={16} color="#8F1D1D" />
                  <span>Catering Menu &amp; Pack Quantities</span>
                </h3>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Item Description</th>
                      <th style={{ textAlign: 'center', width: 120 }}>Quantity</th>
                      <th style={{ textAlign: 'right', width: 120 }}>Unit Price</th>
                      <th style={{ textAlign: 'right', width: 130 }}>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeModalOrder.items || []).map((itm, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{itm.name}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{itm.quantity}</td>
                        <td style={{ textAlign: 'right', color: '#57534E' }}>${Number(itm.price).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700 }}>
                          ${(Number(itm.price) * Number(itm.quantity)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Special Instructions & Dietary Requirements */}
              {(activeModalOrder.dietaryNotes || activeModalOrder.specialInstructions) && (
                <div style={{ padding: 14, borderRadius: 8, backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', fontSize: 12.5 }}>
                  {activeModalOrder.dietaryNotes && (
                    <p style={{ marginBottom: 4 }}>
                      <strong style={{ color: '#8F1D1D' }}>Special Dietary Needs:</strong> {activeModalOrder.dietaryNotes}
                    </p>
                  )}
                  {activeModalOrder.specialInstructions && (
                    <p>
                      <strong style={{ color: '#1C1917' }}>Smoker Trailer &amp; Setup Notes:</strong> {activeModalOrder.specialInstructions}
                    </p>
                  )}
                </div>
              )}

              {/* Kitchen Checklist */}
              {activeModalOrder.kitchenChecklist && activeModalOrder.kitchenChecklist.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Flame size={16} color="#D97706" />
                    <span>Kitchen &amp; Smoker Prep Checklist</span>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: '#FAF7F2', padding: 14, borderRadius: 8, border: '1px solid #E7E2DA' }}>
                    {activeModalOrder.kitchenChecklist.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => handleToggleChecklist(activeModalOrder.id, sIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          cursor: 'pointer',
                          fontSize: 13,
                          color: step.done ? '#78716C' : '#1C1917',
                          textDecoration: step.done ? 'line-through' : 'none'
                        }}
                      >
                        {step.done ? (
                          <CheckSquare size={17} color="#15803D" />
                        ) : (
                          <Square size={17} color="#A8A29E" />
                        )}
                        <span>{step.step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer no-print">
              <button onClick={() => setActiveModalOrder(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
