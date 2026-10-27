import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Users,
  MapPin,
  Eye,
  FileText,
  List,
  Grid,
  Sparkles
} from 'lucide-react';

export function CalendarView({
  requests,
  orders,
  onOpenRequest,
  onOpenOrder
}) {
  // Calendar month state (defaults to October / November 2026 based on mock data)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // November 2026
  const [viewType, setViewType] = useState('month'); // month | list
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const setToday = () => {
    setCurrentDate(new Date(2026, 10, 1));
  };

  // Build calendar matrix
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Consolidate events: Confirmed orders + Tentative requests
  const confirmedEvents = orders.map((o) => ({
    id: o.id,
    type: 'confirmed',
    title: o.customerName,
    subtitle: o.organization || o.eventType,
    date: o.eventDate, // format YYYY-MM-DD
    time: o.preferredTime,
    guests: o.guestCount,
    venue: o.venueAddress,
    value: o.totalValue,
    prepStatus: o.preparationStatus,
    payStatus: o.paymentStatus,
    raw: o
  }));

  const tentativeEvents = requests
    .filter((r) => r.status !== 'Declined' && r.status !== 'Confirmed')
    .map((r) => ({
      id: r.id,
      type: 'tentative',
      title: r.customerName,
      subtitle: r.organization || r.eventType,
      date: r.eventDate,
      time: r.preferredTime,
      guests: r.guestCount,
      venue: r.venueAddress,
      value: r.totalValue || r.estimatedBudget,
      status: r.status,
      raw: r
    }));

  const allEvents = [...confirmedEvents, ...tentativeEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Get events for a specific day in the active month
  const getEventsForDay = (dayNum) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const targetDateStr = `${year}-${formattedMonth}-${formattedDay}`;

    return allEvents.filter((e) => e.date === targetDateStr);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Calendar Header Control Bar */}
      <div
        className="card"
        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#1C1917' }}>
            {monthName} {year}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={prevMonth}
              className="btn btn-secondary btn-sm"
              title="Previous Month"
              style={{ width: 32, height: 32, padding: 0 }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={setToday}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: 12, padding: '4px 10px' }}
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="btn btn-secondary btn-sm"
              title="Next Month"
              style={{ width: 32, height: 32, padding: 0 }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Legend & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#57534E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: '#8F1D1D' }} />
              <span style={{ fontWeight: 600 }}>Confirmed Order</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: '#FEF3C7', border: '1.5px dashed #D97706' }} />
              <span style={{ fontWeight: 600 }}>Tentative / Quote Sent</span>
            </div>
          </div>

          {/* Toggle Month / List */}
          <div style={{ display: 'flex', border: '1px solid var(--hm-line)', borderRadius: 8, overflow: 'hidden' }}>
            <button
              onClick={() => setViewType('month')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: 12.5,
                fontWeight: 600,
                backgroundColor: viewType === 'month' ? '#FAF7F2' : '#FFFFFF',
                color: viewType === 'month' ? '#8F1D1D' : '#57534E'
              }}
            >
              <Grid size={14} />
              <span>Month</span>
            </button>
            <button
              onClick={() => setViewType('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: 12.5,
                fontWeight: 600,
                backgroundColor: viewType === 'list' ? '#FAF7F2' : '#FFFFFF',
                color: viewType === 'list' ? '#8F1D1D' : '#57534E'
              }}
            >
              <List size={14} />
              <span>Agenda List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar View: Month Grid */}
      {viewType === 'month' ? (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Day of Week Headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              backgroundColor: '#FAF7F2',
              borderBottom: '1px solid var(--hm-line)',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#57534E',
              padding: '10px 0'
            }}
          >
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Grid Cells */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              backgroundColor: 'var(--hm-line-light)',
              gap: '1px'
            }}
          >
            {/* Empty prefix cells */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                style={{
                  backgroundColor: '#FAF7F2',
                  minHeight: 110,
                  padding: 8,
                  opacity: 0.4
                }}
              />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dayEvents = getEventsForDay(dayNum);
              const isToday = dayNum === 1; // demo reference

              return (
                <div
                  key={`day-${dayNum}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    minHeight: 115,
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isToday ? '#8F1D1D' : 'transparent',
                        color: isToday ? '#FFFFFF' : '#1C1917'
                      }}
                    >
                      {dayNum}
                    </span>

                    {dayEvents.length > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#78716C' }}>
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    )}
                  </div>

                  {/* Event Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    {dayEvents.map((evt) => {
                      const isConfirmed = evt.type === 'confirmed';
                      return (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEventModal(evt)}
                          title={`${evt.title} (${evt.guests} guests) - Click for details`}
                          style={{
                            padding: '4px 6px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            lineHeight: 1.25,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: isConfirmed ? '#FEF2F2' : '#FFFBEB',
                            border: isConfirmed ? '1px solid #FECACA' : '1px dashed #F59E0B',
                            color: isConfirmed ? '#8F1D1D' : '#92400E',
                            boxShadow: 'var(--shadow-xs)',
                            transition: 'transform 0.1s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                            <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {evt.title}
                            </span>
                            {isConfirmed ? (
                              <CheckCircle2 size={11} color="#15803D" style={{ flexShrink: 0 }} />
                            ) : (
                              <Clock size={11} color="#D97706" style={{ flexShrink: 0 }} />
                            )}
                          </div>
                          <div style={{ fontSize: 9.5, opacity: 0.85, display: 'flex', justifyContent: 'space-between' }}>
                            <span>{evt.guests} guests</span>
                            <span>{evt.time.split(' ')[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Agenda List View */
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Catering Agenda &amp; Bookings</h3>
              <p className="card-subtitle">Chronological schedule of confirmed events and active inquiries</p>
            </div>
            <span style={{ fontSize: 13, color: '#78716C' }}>
              {allEvents.length} total scheduled events
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--hm-line-light)' }}>
            {allEvents.length === 0 ? (
              <p style={{ padding: 32, textAlign: 'center', color: '#78716C' }}>
                No events found in this date range.
              </p>
            ) : (
              allEvents.map((evt) => {
                const isConfirmed = evt.type === 'confirmed';
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEventModal(evt)}
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--hm-line-light)',
                      cursor: 'pointer',
                      transition: 'background-color 0.1s ease'
                    }}
                    className="agenda-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          backgroundColor: isConfirmed ? '#FEF2F2' : '#FFFBEB',
                          border: isConfirmed ? '1px solid #FECACA' : '1px solid #FDE68A',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 800, color: isConfirmed ? '#8F1D1D' : '#B45309', lineHeight: 1 }}>
                          {evt.date.split('-')[2]}
                        </span>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: '#78716C', textTransform: 'uppercase' }}>
                          {new Date(evt.date + 'T00:00:00').toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 15, fontWeight: 700, color: '#1C1917' }}>
                            {evt.title}
                          </span>
                          <span className={`badge ${isConfirmed ? 'badge-confirmed' : 'badge-quote-sent'}`}>
                            {isConfirmed ? 'Confirmed Order' : `Inquiry (${evt.status})`}
                          </span>
                        </div>
                        <div style={{ fontSize: 12.5, color: '#57534E', marginTop: 2 }}>
                          {evt.time} • <strong>{evt.guests} Guests</strong> • {evt.venue}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#8F1D1D' }}>
                        ${Number(evt.value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 2 }}>
                        Click to view details
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Event Details Popover Modal */}
      {selectedEventModal && (
        <div className="modal-backdrop" onClick={() => setSelectedEventModal(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 540 }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CalendarDays size={20} color="#8F1D1D" />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>
                    {selectedEventModal.title}
                  </h3>
                  <span className={`badge ${selectedEventModal.type === 'confirmed' ? 'badge-confirmed' : 'badge-quote-sent'}`} style={{ marginTop: 2 }}>
                    {selectedEventModal.type === 'confirmed' ? 'Confirmed Order' : `Inquiry (${selectedEventModal.status})`}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedEventModal(null)} className="btn-icon">
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, backgroundColor: '#FAF7F2', padding: 14, borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#78716C' }}>Date &amp; Time</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917', marginTop: 2 }}>
                    {selectedEventModal.date}
                  </div>
                  <div style={{ fontSize: 12, color: '#57534E' }}>{selectedEventModal.time}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#78716C' }}>Scale &amp; Value</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917', marginTop: 2 }}>
                    {selectedEventModal.guests} Guests
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#8F1D1D' }}>
                    ${Number(selectedEventModal.value || 0).toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#78716C' }}>Location</div>
                <div style={{ fontSize: 13, color: '#1C1917', marginTop: 2 }}>
                  {selectedEventModal.venue}
                </div>
              </div>

              {selectedEventModal.type === 'confirmed' && selectedEventModal.prepStatus && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#78716C' }}>Kitchen Prep Status</div>
                  <div style={{ marginTop: 4 }}>
                    <span className={`badge badge-prep-${selectedEventModal.prepStatus.toLowerCase().replace(' ', '-')}`}>
                      {selectedEventModal.prepStatus}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedEventModal(null)} className="btn btn-secondary btn-sm">
                Close
              </button>

              {selectedEventModal.type === 'confirmed' ? (
                <button
                  onClick={() => {
                    onOpenOrder(selectedEventModal.raw);
                    setSelectedEventModal(null);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Eye size={13} />
                  <span>Open Kitchen Order</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenRequest(selectedEventModal.raw);
                    setSelectedEventModal(null);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Eye size={13} />
                  <span>Open Request &amp; Quote</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
