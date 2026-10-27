import React, { useState } from 'react';
import { X, Plus, Calendar, Users, MapPin, Phone, Mail, DollarSign, Clock, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export function NewRequestModal({
  isOpen,
  onClose,
  onSubmitNewRequest,
  menuItems
}) {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekendStr = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    organization: '',
    email: '',
    phone: '',
    eventType: 'Private Party',
    eventDate: nextWeekendStr,
    preferredTime: '12:00 PM - 2:30 PM',
    guestCount: 50,
    venueAddress: '',
    estimatedBudget: 1500,
    status: 'New',
    dietaryNotes: '',
    specialInstructions: '',
    internalNotes: '',
    deliveryFee: 95,
    staffingFee: 150,
    taxRate: BUSINESS_INFO.taxRate,
    selectedItems: [
      { itemId: 'meat-1', name: 'Smoked Beef Brisket', quantity: 50, price: 16.50 },
      { itemId: 'meat-2', name: 'Applewood Pulled Pork', quantity: 50, price: 11.50 },
      { itemId: 'side-1', name: 'Smokehouse Mac \'n Cheese', quantity: 50, price: 4.25 },
      { itemId: 'side-3', name: 'Fresh Skillet Cornbread', quantity: 50, price: 2.50 }
    ]
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGuestCountChange = (val) => {
    const num = Math.max(1, Number(val));
    setFormData(prev => ({
      ...prev,
      guestCount: num,
      selectedItems: prev.selectedItems.map(i => ({ ...i, quantity: num }))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `REQ-2026-0${Math.floor(Math.random() * 900 + 100)}`;
    const subtotal = formData.selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const taxable = subtotal + Number(formData.deliveryFee) + Number(formData.staffingFee);
    const tax = (taxable * formData.taxRate) / 100;
    const total = taxable + tax;

    const newRequest = {
      ...formData,
      id: newId,
      dateReceived: todayStr,
      subtotal,
      taxAmount: tax,
      totalValue: total,
      followUpDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
    };

    onSubmitNewRequest(newRequest);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 760, maxHeight: '92vh' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: '#FEF2F2',
                border: '1px solid #FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plus size={20} color="#8F1D1D" />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1C1917' }}>
                Create New Catering Request
              </h2>
              <p style={{ fontSize: 12, color: '#78716C' }}>
                Record incoming client inquiry, event parameters &amp; menu preferences
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Customer Info */}
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                1. Customer &amp; Event Group
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label-required">Customer Contact Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Company or Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    placeholder="e.g. Adams Ranch / Micron / Family"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label-required">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(208) 555-0192"
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
                    placeholder="client@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Specs */}
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                2. Event Date, Location &amp; Scale
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label-required">Event Type</label>
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
                  <label className="form-label form-label-required">Estimated Guest Count</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={formData.guestCount}
                    onChange={(e) => handleGuestCountChange(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label form-label-required">Venue / Delivery Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.venueAddress}
                    onChange={(e) => handleChange('venueAddress', e.target.value)}
                    placeholder="e.g. 1500 S Lake Shore Dr, Nampa, ID"
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
                    placeholder="e.g. 12:00 PM - 2:30 PM"
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions & Notes */}
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                3. Catering Notes &amp; Preferences
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dietary Requirements</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formData.dietaryNotes}
                    onChange={(e) => handleChange('dietaryNotes', e.target.value)}
                    placeholder="e.g. Celiac gluten allergy, dairy free requests..."
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Special Instructions &amp; Setup</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={formData.specialInstructions}
                    onChange={(e) => handleChange('specialInstructions', e.target.value)}
                    placeholder="e.g. Smoker setup location, electrical access, timeline..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Plus size={15} />
              <span>Create Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
