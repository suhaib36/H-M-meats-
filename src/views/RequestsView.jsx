import React, { useState } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  FileText,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  UtensilsCrossed,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export function RequestsView({
  requests,
  onOpenRequest,
  onOpenNewRequest,
  onOpenQuotationPreview,
  onMarkConfirmed
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, eventDate, guests, budget
  const [viewMode, setViewMode] = useState('table'); // table | cards

  // Filtering
  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.organization && r.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.venueAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesType = typeFilter === 'All' || r.eventType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.dateReceived) - new Date(a.dateReceived);
    }
    if (sortBy === 'eventDate') {
      return new Date(a.eventDate) - new Date(b.eventDate);
    }
    if (sortBy === 'guests') {
      return b.guestCount - a.guestCount;
    }
    if (sortBy === 'budget') {
      const bVal = b.totalValue || b.estimatedBudget || 0;
      const aVal = a.totalValue || a.estimatedBudget || 0;
      return bVal - aVal;
    }
    return 0;
  });

  const statuses = ['All', 'New', 'Reviewing', 'Quote Sent', 'Confirmed', 'Declined'];
  const eventTypes = ['All', 'Wedding', 'Corporate Event', 'Private Party', 'Other'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Top Action Bar & Filters */}
      <div
        className="card"
        style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: 260, maxWidth: 460 }}>
            <Search
              size={16}
              color="#78716C"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by client name, email, phone, venue..."
              className="form-input"
              style={{ paddingLeft: 36, fontSize: 13.5 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Right Action: New Request CTA & View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', border: '1px solid var(--hm-line)', borderRadius: 8, overflow: 'hidden' }}>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  padding: '7px 12px',
                  fontSize: 12.5,
                  fontWeight: 600,
                  backgroundColor: viewMode === 'table' ? '#FAF7F2' : '#FFFFFF',
                  color: viewMode === 'table' ? '#8F1D1D' : '#57534E'
                }}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  padding: '7px 12px',
                  fontSize: 12.5,
                  fontWeight: 600,
                  backgroundColor: viewMode === 'cards' ? '#FAF7F2' : '#FFFFFF',
                  color: viewMode === 'cards' ? '#8F1D1D' : '#57534E'
                }}
              >
                Detailed Cards
              </button>
            </div>

            <button
              onClick={onOpenNewRequest}
              className="btn btn-primary"
              style={{ padding: '9px 18px' }}
            >
              <PlusCircle size={16} />
              <span>New Catering Request</span>
            </button>
          </div>
        </div>

        {/* Filter Chips & Sorters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 10, borderTop: '1px solid var(--hm-line-light)' }}>
          {/* Status filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#78716C', marginRight: 4 }}>
              Status:
            </span>
            {statuses.map((st) => {
              const active = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? '#8F1D1D' : '#FAF7F2',
                    color: active ? '#FFFFFF' : '#44403C',
                    border: active ? '1px solid #8F1D1D' : '1px solid #E7E2DA',
                    transition: 'all 0.1s ease'
                  }}
                >
                  {st}
                  {st !== 'All' && (
                    <span style={{ marginLeft: 5, opacity: 0.8, fontSize: 10.5 }}>
                      ({requests.filter(r => r.status === st).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sort & Event Type Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#78716C' }}>Type:</span>
              <select
                className="form-select"
                style={{ padding: '5px 10px', fontSize: 12.5, minWidth: 130 }}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {eventTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ArrowUpDown size={13} color="#78716C" />
              <select
                className="form-select"
                style={{ padding: '5px 10px', fontSize: 12.5, minWidth: 150 }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest Inquiries</option>
                <option value="eventDate">Event Date (Soonest)</option>
                <option value="guests">Guest Count (High to Low)</option>
                <option value="budget">Value (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Content: Table View */}
      {viewMode === 'table' ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer &amp; Group</th>
                <th>Contact</th>
                <th>Event Type</th>
                <th>Event Date &amp; Time</th>
                <th style={{ textAlign: 'center' }}>Guests</th>
                <th>Venue / Location</th>
                <th style={{ textAlign: 'right' }}>Est. Value</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: 36, textAlign: 'center', color: '#78716C' }}>
                    No catering inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                sorted.map((req) => {
                  const isDemoTarget = req.id === 'REQ-2026-042';
                  return (
                    <tr
                      key={req.id}
                      style={{
                        backgroundColor: isDemoTarget ? '#FFFBEB' : undefined
                      }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 700, color: '#1C1917' }}>
                            {req.customerName}
                          </span>
                          {isDemoTarget && (
                            <span
                              style={{
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                fontSize: 9.5,
                                fontWeight: 800,
                                padding: '1px 5px',
                                borderRadius: 4,
                                border: '1px solid #FDE68A'
                              }}
                            >
                              DEMO TARGET
                            </span>
                          )}
                        </div>
                        {req.organization && (
                          <div style={{ fontSize: 11.5, color: '#78716C' }}>
                            {req.organization}
                          </div>
                        )}
                        <div style={{ fontSize: 10.5, color: '#A8A29E', marginTop: 1, fontFamily: 'monospace' }}>
                          {req.id}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: 12, color: '#44403C' }}>{req.phone}</div>
                        <div style={{ fontSize: 11.5, color: '#78716C' }}>{req.email}</div>
                      </td>

                      <td>
                        <span style={{ fontSize: 12.5, color: '#292524' }}>
                          {req.eventType}
                        </span>
                      </td>

                      <td>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                          {req.eventDate}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#78716C' }}>
                          {req.preferredTime}
                        </div>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#1C1917' }}>
                          {req.guestCount}
                        </span>
                      </td>

                      <td>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#57534E',
                            maxWidth: 180,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={req.venueAddress}
                        >
                          {req.venueAddress}
                        </div>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 800, color: '#8F1D1D', fontSize: 13.5 }}>
                          ${(req.totalValue || req.estimatedBudget || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>

                      <td>
                        <span className={`badge badge-${req.status.toLowerCase().replace(' ', '-')}`}>
                          {req.status}
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <button
                            onClick={() => onOpenRequest(req)}
                            className="btn btn-secondary btn-sm"
                            title="Open full request details and quotation builder"
                          >
                            <Eye size={12} />
                            <span>Details</span>
                          </button>

                          <button
                            onClick={() => onOpenQuotationPreview(req)}
                            className="btn btn-secondary btn-sm"
                            title="Preview formal quotation sheet"
                            style={{ padding: '5px 7px' }}
                          >
                            <FileText size={13} color="#8F1D1D" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Detailed Cards View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {sorted.map((req) => {
            const isDemoTarget = req.id === 'REQ-2026-042';
            return (
              <div
                key={req.id}
                className="card"
                style={{
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isDemoTarget ? '2px solid #F59E0B' : '1px solid var(--hm-line)',
                  backgroundColor: isDemoTarget ? '#FFFDF8' : '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>
                          {req.customerName}
                        </h3>
                        {isDemoTarget && (
                          <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 9.5, fontWeight: 800, padding: '1px 5px', borderRadius: 4 }}>
                            DEMO
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: '#78716C' }}>
                        {req.organization || req.eventType} • Received {req.dateReceived}
                      </p>
                    </div>
                    <span className={`badge badge-${req.status.toLowerCase().replace(' ', '-')}`}>
                      {req.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, color: '#57534E', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={13} color="#8F1D1D" />
                      <span><strong>{req.eventDate}</strong> ({req.preferredTime})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Users size={13} color="#D97706" />
                      <span><strong>{req.guestCount} Guests</strong> • {req.eventType}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} color="#78716C" />
                      <span className="truncate">{req.venueAddress}</span>
                    </div>
                  </div>

                  {/* Selected items pills */}
                  {req.selectedItems && req.selectedItems.length > 0 && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#78716C', textTransform: 'uppercase', marginBottom: 6 }}>
                        Requested Menu ({req.selectedItems.length} items):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {req.selectedItems.slice(0, 4).map((i, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: '#FAF7F2',
                              border: '1px solid #E7E2DA',
                              fontSize: 11,
                              padding: '2px 7px',
                              borderRadius: 4,
                              color: '#44403C'
                            }}
                          >
                            {i.name} ({i.quantity})
                          </span>
                        ))}
                        {req.selectedItems.length > 4 && (
                          <span style={{ fontSize: 11, color: '#78716C', alignSelf: 'center' }}>
                            +{req.selectedItems.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--hm-line-light)', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#78716C' }}>Estimated Value</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#8F1D1D' }}>
                      ${(req.totalValue || req.estimatedBudget || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => onOpenQuotationPreview(req)}
                      className="btn btn-secondary btn-sm"
                      title="Preview Quote"
                    >
                      <FileText size={13} />
                    </button>
                    <button
                      onClick={() => onOpenRequest(req)}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
