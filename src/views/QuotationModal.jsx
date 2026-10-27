import React from 'react';
import { X, Printer, Copy, Send, CheckCircle, FileText, MapPin, Phone, Mail, Globe, Calendar, Users, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';
import { HMLogo } from '../components/HMLogo';

export function QuotationModal({
  isOpen,
  onClose,
  request,
  onSendQuote,
  onCopyQuote
}) {
  if (!isOpen || !request) return null;

  const quoteNumber = `QT-2026-${request.id.replace('REQ-2026-', '')}`;
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const validUntilDate = new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Compute totals
  const items = request.selectedItems || [];
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const delivery = Number(request.deliveryFee) || 0;
  const staffing = Number(request.staffingFee) || 0;
  const taxRate = Number(request.taxRate) || BUSINESS_INFO.taxRate;
  const taxableAmount = subtotal + delivery + staffing;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const textSummary = `
========================================
H&M MEATS & CATERING — ESTIMATE & PROPOSAL
${BUSINESS_INFO.fullAddress} | ${BUSINESS_INFO.phone} | hmmeats.com
========================================
Estimate #: ${quoteNumber} (DRAFT ESTIMATE)
Date Issued: ${currentDate}
Valid Until: ${validUntilDate}

CLIENT DETAILS:
Customer: ${request.customerName}
Organization: ${request.organization || 'Private Event'}
Phone: ${request.phone}
Email: ${request.email}

EVENT REQUIREMENTS:
Date: ${request.eventDate} (${request.preferredTime})
Location: ${request.venueAddress}
Guest Count: ${request.guestCount} Guests
Event Type: ${request.eventType}

ITEMIZED MENU:
${items.map(i => `- ${i.name} (${i.quantity}x @ $${i.price.toFixed(2)}) = $${(i.quantity * i.price).toFixed(2)}`).join('\n')}

FINANCIAL SUMMARY:
Menu Subtotal: $${subtotal.toFixed(2)}
Delivery & Setup: $${delivery.toFixed(2)}
On-site Staffing: $${staffing.toFixed(2)}
Idaho Sales Tax (${taxRate.toFixed(1)}%): $${taxAmount.toFixed(2)}
----------------------------------------
ESTIMATED TOTAL: $${total.toFixed(2)}
----------------------------------------
Special Instructions: ${request.specialInstructions || 'None'}
*This is an estimate. 50% deposit required upon confirmation.*
========================================
    `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textSummary);
    }
    if (onCopyQuote) onCopyQuote();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 880, maxHeight: '94vh' }}
      >
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="modal-header no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={20} color="#8F1D1D" />
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1C1917' }}>
                Catering Quotation Preview
              </h2>
              <p style={{ fontSize: 12, color: '#78716C' }}>
                Official estimate draft for {request.customerName} ({quoteNumber})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              title="Copy estimate text to clipboard"
            >
              <Copy size={14} />
              <span>Copy Summary</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              title="Print estimate or save as PDF"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => onSendQuote(request.id)}
              className="btn btn-primary btn-sm"
              title="Mark quote as sent to client"
            >
              <Send size={14} />
              <span>Send to Customer</span>
            </button>
            <button onClick={onClose} className="btn-icon">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: The Formal Printable Quotation Sheet */}
        <div className="modal-body printable-quote" style={{ padding: '32px 36px', backgroundColor: '#FFFFFF' }}>
          {/* Draft Notice Banner */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#FFFBEB',
              border: '1.5px dashed #F59E0B',
              borderRadius: 8,
              textAlign: 'center',
              marginBottom: 24,
              fontSize: 12,
              fontWeight: 700,
              color: '#92400E',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            ★ Official Catering Draft Estimate — Subject to final customer review &amp; date confirmation ★
          </div>

          {/* Quotation Header: Brand & Document Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #8F1D1D', paddingBottom: 20, marginBottom: 24 }}>
            <div>
              <HMLogo size="large" />
              <div style={{ marginTop: 10, fontSize: 12, color: '#57534E', lineHeight: 1.45 }}>
                <p style={{ fontWeight: 600 }}>{BUSINESS_INFO.legalName}</p>
                <p>{BUSINESS_INFO.fullAddress}</p>
                <p>Phone: {BUSINESS_INFO.phone} | Email: {BUSINESS_INFO.cateringEmail}</p>
                <p>Web: {BUSINESS_INFO.website} | License: {BUSINESS_INFO.licenseNumber}</p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#8F1D1D',
                  letterSpacing: '0.02em',
                  marginBottom: 4
                }}
              >
                CATERING ESTIMATE
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917', marginBottom: 2 }}>
                Estimate #: {quoteNumber}
              </div>
              <div style={{ fontSize: 12, color: '#78716C' }}>
                Issued: {currentDate}
              </div>
              <div style={{ fontSize: 12, color: '#78716C' }}>
                Valid Through: {validUntilDate}
              </div>
              <div style={{ marginTop: 8 }}>
                <span className="badge badge-quote-sent" style={{ fontSize: 11 }}>
                  Status: {request.status === 'Quote Sent' ? 'Quote Sent' : 'Draft Proposal'}
                </span>
              </div>
            </div>
          </div>

          {/* Client & Event Information Two-Column Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              backgroundColor: '#FAF7F2',
              padding: '18px 20px',
              borderRadius: 10,
              border: '1px solid #E7E2DA',
              marginBottom: 28
            }}
          >
            {/* Customer Details */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Prepared For
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1917' }}>
                {request.customerName}
              </div>
              {request.organization && (
                <div style={{ fontSize: 13, color: '#57534E', fontWeight: 500 }}>
                  {request.organization}
                </div>
              )}
              <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 4 }}>
                <div>Phone: {request.phone}</div>
                <div>Email: {request.email}</div>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#8F1D1D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Event Specifications
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1C1917' }}>
                {request.eventType} • {request.guestCount} Estimated Guests
              </div>
              <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 4, lineHeight: 1.4 }}>
                <div><strong>Event Date:</strong> {request.eventDate}</div>
                <div><strong>Service Window:</strong> {request.preferredTime}</div>
                <div><strong>Location:</strong> {request.venueAddress}</div>
              </div>
            </div>
          </div>

          {/* Itemized Catering Line Items Table */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917', marginBottom: 8 }}>
              Selected Catering Selections &amp; Service
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E7E2DA', backgroundColor: '#F5F1EA' }}>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#57534E', textTransform: 'uppercase' }}>Description</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#57534E', textTransform: 'uppercase', width: 90 }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#57534E', textTransform: 'uppercase', width: 110 }}>Unit Price</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#57534E', textTransform: 'uppercase', width: 110 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#78716C' }}>
                      No items currently added to this inquiry.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => {
                    const lineTotal = Number(item.price) * Number(item.quantity);
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #F0ECE5' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1C1917' }}>
                          {item.name}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#57534E' }}>
                          {item.quantity}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#57534E' }}>
                          ${Number(item.price).toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#1C1917' }}>
                          ${lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals & Financial Breakdown */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
            <div style={{ width: 340, backgroundColor: '#FAF7F2', padding: '16px 20px', borderRadius: 8, border: '1px solid #E7E2DA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: '#57534E' }}>
                <span>Food &amp; Beverage Subtotal:</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: '#57534E' }}>
                <span>Delivery, Chafers &amp; Setup:</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>${delivery.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: '#57534E' }}>
                <span>On-Site Pitmaster Staffing:</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>${staffing.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: '#57534E', borderBottom: '1px solid #E7E2DA', paddingBottom: 8 }}>
                <span>Idaho Sales Tax ({taxRate.toFixed(1)}%):</span>
                <span style={{ fontWeight: 600, color: '#1C1917' }}>${taxAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontSize: 17, fontWeight: 800, color: '#8F1D1D' }}>
                <span>ESTIMATED TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: '#78716C', textAlign: 'right' }}>
                Estimated Cost per Guest: ${(total / (request.guestCount || 1)).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Instructions & Dietary Notes */}
          {(request.specialInstructions || request.dietaryNotes) && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E2DA', borderRadius: 8, padding: '14px 18px', marginBottom: 24, fontSize: 12.5 }}>
              {request.dietaryNotes && (
                <p style={{ marginBottom: 6 }}>
                  <strong style={{ color: '#8F1D1D' }}>Dietary &amp; Allergen Notes:</strong> {request.dietaryNotes}
                </p>
              )}
              {request.specialInstructions && (
                <p>
                  <strong style={{ color: '#1C1917' }}>Event Logistics / Special Instructions:</strong> {request.specialInstructions}
                </p>
              )}
            </div>
          )}

          {/* Catering Agreement & Terms */}
          <div style={{ borderTop: '1px solid #E7E2DA', paddingTop: 16, fontSize: 11.5, color: '#78716C', lineHeight: 1.45 }}>
            <p style={{ fontWeight: 700, color: '#292524', marginBottom: 4 }}>Booking &amp; Service Terms:</p>
            <p>1. <strong>Deposit:</strong> A 50% deposit confirms date and reserves smoker equipment. Balance is due 48 hours prior to event or Net 15 for approved corporate billing.</p>
            <p>2. <strong>Guest Count Guarantee:</strong> Final headcount guarantee is required 5 business days prior to scheduled event date.</p>
            <p>3. <strong>Service Inclusions:</strong> Buffet setups include high-grade disposable heavy-duty plates, napkins, cutlery, and signature barbecue sauces.</p>
          </div>
        </div>

        {/* Modal Bottom Footer (Hidden in Print) */}
        <div className="modal-footer no-print">
          <div style={{ marginRight: 'auto', fontSize: 12.5, color: '#78716C' }}>
            Quotation created via H&amp;M Catering Order Manager
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Preview
          </button>
          <button onClick={() => onSendQuote(request.id)} className="btn btn-primary btn-sm">
            <Send size={14} />
            <span>Mark Quote as Sent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
