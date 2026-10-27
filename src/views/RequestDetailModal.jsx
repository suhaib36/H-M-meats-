import React, { useState } from 'react';
import {
  X,
  Save,
  FileText,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  UtensilsCrossed,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export function RequestDetailModal({
  isOpen,
  onClose,
  request,
  menuItems,
  onSaveRequest,
  onOpenQuotationPreview,
  onMarkConfirmed,
  onCancelRequest
}) {
  if (!isOpen || !request) return null;

  // Local editable state
  const [formData, setFormData] = useState({
    customerName: request.customerName || '',
    organization: request.organization || '',
    email: request.email || '',
    phone: request.phone || '',
    eventType: request.eventType || 'Private Party',
    eventDate: request.eventDate || '',
    preferredTime: request.preferredTime || '',
    guestCount: request.guestCount || 50,
    venueAddress: request.venueAddress || '',
    estimatedBudget: request.estimatedBudget || '',
    status: request.status || 'New',
    dietaryNotes: request.dietaryNotes || '',
    specialInstructions: request.specialInstructions || '',
    internalNotes: request.internalNotes || '',
    followUpDate: request.followUpDate || '',
    deliveryFee: request.deliveryFee !== undefined ? request.deliveryFee : 95,
    staffingFee: request.staffingFee !== undefined ? request.staffingFee : 150,
    taxRate: request.taxRate !== undefined ? request.taxRate : BUSINESS_INFO.taxRate,
    selectedItems: request.selectedItems ? [...request.selectedItems] : []
  });

  const [itemToAdd, setItemToAdd] = useState('');
  const [itemQty, setItemQty] = useState(formData.guestCount || 50);

  // Auto-recalculate
  const subtotal = formData.selectedItems.reduce(
    (sum, item) => sum + (Number(item.price) * Number(item.quantity)),
    0
  );
  const delivery = Number(formData.deliveryFee) || 0;
  const staffing = Number(formData.staffingFee) || 0;
  const taxRate = Number(formData.taxRate) || BUSINESS_INFO.taxRate;
  const taxableAmount = subtotal + delivery + staffing;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    if (!itemToAdd) return;
    const catalogItem = menuItems.find(m => m.id === itemToAdd);
    if (!catalogItem) return;

    // Check if already in list
    const existingIndex = formData.selectedItems.findIndex(i => i.itemId === catalogItem.id);
    if (existingIndex >= 0) {
      const updated = [...formData.selectedItems];
      updated[existingIndex].quantity = Number(updated[existingIndex].quantity) + Number(itemQty);
      setFormData(prev => ({ ...prev, selectedItems: updated }));
    } else {
      const newItem = {
        itemId: catalogItem.id,
        name: catalogItem.name,
        price: catalogItem.price,
        quantity: Number(itemQty)
      };
      setFormData(prev => ({
        ...prev,
        selectedItems: [...prev.selectedItems, newItem]
      }));
    }
    setItemToAdd('');
  };

  const handleUpdateItemQty = (index, delta) => {
    const updated = [...formData.selectedItems];
    const newQty = Math.max(1, Number(updated[index].quantity) + delta);
    updated[index].quantity = newQty;
    setFormData(prev => ({ ...prev, selectedItems: updated }));
  };

  const handleRemoveItem = (index) => {
    const updated = formData.selectedItems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, selectedItems: updated }));
  };

  const handleSetGuestCount = (count) => {
    const num = Math.max(1, Number(count));
    setFormData(prev => {
      // Promptly adjust item quantities if matching previous guest count
      const updatedItems = prev.selectedItems.map(item => ({
        ...item,
        quantity: item.quantity === prev.guestCount ? num : item.quantity
      }));
      return {
        ...prev,
        guestCount: num,
        selectedItems: updatedItems
      };
    });
    setItemQty(num);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRequest({
      ...request,
      ...formData,
      subtotal,
      taxAmount,
      totalValue: grandTotal
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 960, maxHeight: '92vh' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#FEF2F2',
                border: '1px solid #FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <UtensilsCrossed size={20} color="#8F1D1D" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1C1917' }}>
                  {formData.customerName || 'Catering Request'}
                </h2>
                <span className={`badge badge-${formData.status.toLowerCase().replace(' ', '-')}`}>
                  {formData.status}
                </span>
                <span style={{ fontSize: 12, color: '#78716C', fontFamily: 'monospace' }}>
                  {request.id}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#78716C', marginTop: 2 }}>
                Received on {request.dateReceived} • Preferred Date: {formData.eventDate || 'TBD'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => onOpenQuotationPreview({ ...request, ...formData, subtotal, taxAmount, totalValue: grandTotal })}
              className="btn btn-secondary btn-sm"
              title="Preview official printable quotation draft"
            >
              <FileText size={15} color="#8F1D1D" />
              <span>Quotation Preview</span>
            </button>

            {formData.status !== 'Confirmed' && (
              <button
                onClick={() => onMarkConfirmed({ ...request, ...formData, subtotal, taxAmount, totalValue: grandTotal })}
                className="btn btn-success btn-sm"
                title="Confirm request and convert to an active event order"
              >
                <CheckCircle size={15} />
                <span>Mark as Confirmed</span>
              </button>
            )}

            <button onClick={onClose} className="btn-icon">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 28px' }}>
            {/* Top Row: Customer & Event Logistics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
              {/* Customer Box */}
              <div style={{ backgroundColor: '#FAF7F2', padding: 18, borderRadius: 10, border: '1px solid #E7E2DA' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Users size={15} />
                  <span>Customer &amp; Contact Details</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label-required">Customer Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Organization / Event Group</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      placeholder="e.g. Miller Family Reunion"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label-required">Phone Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label-required">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Event Timing & Status Box */}
              <div style={{ backgroundColor: '#FAF7F2', padding: 18, borderRadius: 10, border: '1px solid #E7E2DA' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={15} />
                  <span>Event Date, Time &amp; Status</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label-required">Event Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.eventDate}
                      onChange={(e) => handleChange('eventDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Service Window</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.preferredTime}
                      onChange={(e) => handleChange('preferredTime', e.target.value)}
                      placeholder="e.g. 1:00 PM - 3:30 PM"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label form-label-required">Guest Count</label>
                    <input
                      type="number"
                      className="form-input"
                      min="1"
                      value={formData.guestCount}
                      onChange={(e) => handleSetGuestCount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Workflow Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Quote Sent">Quote Sent</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue & Logistics */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label form-label-required">
                  <MapPin size={13} color="#8F1D1D" />
                  <span>Venue or Delivery Address</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.venueAddress}
                  onChange={(e) => handleChange('venueAddress', e.target.value)}
                  placeholder="e.g. Still Water Hollow, 18120 Dean Ln, Nampa ID"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Event Type</label>
                <select
                  className="form-select"
                  value={formData.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value)}
                >
                  <option value="Private Party">Private Party</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Estimated Budget ($)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.estimatedBudget}
                  onChange={(e) => handleChange('estimatedBudget', e.target.value)}
                  placeholder="e.g. 3200"
                />
              </div>
            </div>

            {/* Menu Item Selection & Quotation Builder */}
            <div style={{ border: '1px solid #E7E2DA', borderRadius: 12, overflow: 'hidden' }}>
              <div
                style={{
                  padding: '14px 20px',
                  backgroundColor: '#FAF7F2',
                  borderBottom: '1px solid #E7E2DA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12
                }}
              >
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                    Menu Selection &amp; Cost Estimation
                  </h3>
                  <p style={{ fontSize: 12, color: '#78716C' }}>
                    Select smoked meats, scratch sides, and packages from the H&amp;M catering catalog
                  </p>
                </div>

                {/* Add Item Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <select
                    className="form-select"
                    style={{ minWidth: 260, fontSize: 13 }}
                    value={itemToAdd}
                    onChange={(e) => setItemToAdd(e.target.value)}
                  >
                    <option value="">-- Add an item from menu --</option>
                    {['BBQ Meats', 'Side Dishes', 'Desserts', 'Catering Packages'].map((category) => (
                      <optgroup key={category} label={category}>
                        {menuItems
                          .filter((m) => m.category === category && m.active)
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} (${m.price.toFixed(2)} {m.unit})
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>

                  <input
                    type="number"
                    className="form-input"
                    style={{ width: 85, fontSize: 13 }}
                    min="1"
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                    title="Portion Quantity"
                  />

                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!itemToAdd}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={14} />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Item Name</th>
                      <th style={{ width: '18%', textAlign: 'center' }}>Servings / Qty</th>
                      <th style={{ width: '18%', textAlign: 'right' }}>Price</th>
                      <th style={{ width: '14%', textAlign: 'right' }}>Total</th>
                      <th style={{ width: '5%', textAlign: 'center' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#78716C' }}>
                          No catering items selected yet. Choose items from the dropdown above to calculate an estimated quote.
                        </td>
                      </tr>
                    ) : (
                      formData.selectedItems.map((item, idx) => {
                        const lineTotal = Number(item.price) * Number(item.quantity);
                        return (
                          <tr key={idx}>
                            <td style={{ fontWeight: 600 }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateItemQty(idx, -5)}
                                  className="btn btn-secondary btn-sm"
                                  style={{ padding: '2px 7px', fontSize: 11 }}
                                >
                                  -
                                </button>
                                <span style={{ fontWeight: 700, minWidth: 32, textAlign: 'center' }}>
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateItemQty(idx, 5)}
                                  className="btn btn-secondary btn-sm"
                                  style={{ padding: '2px 7px', fontSize: 11 }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td style={{ textAlign: 'right', color: '#57534E' }}>
                              ${Number(item.price).toFixed(2)}
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 700 }}>
                              ${lineTotal.toFixed(2)}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(idx)}
                                className="btn-icon"
                                title="Remove item"
                                style={{ width: 28, height: 28 }}
                              >
                                <Trash2 size={14} color="#EF4444" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Quotation Cost Calculator Box */}
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#FAF7F2',
                  borderTop: '1px solid #E7E2DA',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: 20
                }}
              >
                {/* Additional Charges: Delivery, Staffing, Tax Rate */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: 11.5 }}>
                      Delivery &amp; Setup ($)
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.deliveryFee}
                      onChange={(e) => handleChange('deliveryFee', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: 11.5 }}>
                      Pitmaster Staffing ($)
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.staffingFee}
                      onChange={(e) => handleChange('staffingFee', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: 11.5 }}>
                      Sales Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-input"
                      value={formData.taxRate}
                      onChange={(e) => handleChange('taxRate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Calculation Totals Display */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12.5, color: '#57534E' }}>
                    Menu Subtotal: <strong style={{ color: '#1C1917' }}>${subtotal.toFixed(2)}</strong>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E' }}>
                    Fees &amp; Logistics: <strong style={{ color: '#1C1917' }}>${(delivery + staffing).toFixed(2)}</strong>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#57534E' }}>
                    Estimated Idaho Tax ({taxRate.toFixed(1)}%): <strong style={{ color: '#1C1917' }}>${taxAmount.toFixed(2)}</strong>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#8F1D1D', marginTop: 4, borderTop: '1px solid #E7E2DA', paddingTop: 6 }}>
                    Grand Estimate: ${grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Instructions & Internal Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div className="form-group">
                  <label className="form-label">
                    Dietary Requirements &amp; Allergen Restrictions
                  </label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formData.dietaryNotes}
                    onChange={(e) => handleChange('dietaryNotes', e.target.value)}
                    placeholder="e.g. 6 guests gluten-free buns, 2 vegetarian requests..."
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Special Event Logistics &amp; Setup Instructions
                  </label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formData.specialInstructions}
                    onChange={(e) => handleChange('specialInstructions', e.target.value)}
                    placeholder="e.g. Smoker trailer setup 2 hours prior to service, chafers needed..."
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label className="form-label">
                    Internal Staff &amp; Smoker Notes
                  </label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formData.internalNotes}
                    onChange={(e) => handleChange('internalNotes', e.target.value)}
                    placeholder="e.g. Customer called about oak wood preference, spoke to head pitmaster..."
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.followUpDate}
                    onChange={(e) => handleChange('followUpDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => onCancelRequest(request.id)}
              className="btn btn-ghost btn-sm"
              style={{ color: '#DC2626', marginRight: 'auto' }}
            >
              <XCircle size={15} />
              <span>Decline / Cancel Request</span>
            </button>

            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
