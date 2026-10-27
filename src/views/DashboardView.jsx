import React from 'react';
import {
  Inbox,
  Clock,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Users,
  DollarSign,
  Flame,
  AlertCircle,
  Eye,
  Calendar
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialData';

export function DashboardView({
  requests,
  orders,
  notifications,
  onOpenRequest,
  onOpenOrder,
  onOpenNewRequest,
  onStartDemo,
  onNavigateTab
}) {
  // Stat calculations
  const newRequestsCount = requests.filter(r => r.status === 'New').length;
  const quotesAwaitingResponse = requests.filter(r => r.status === 'Quote Sent');
  const quotesValue = quotesAwaitingResponse.reduce((sum, r) => sum + (Number(r.totalValue) || Number(r.estimatedBudget) || 0), 0);
  const confirmedUpcomingEvents = orders.filter(o => o.preparationStatus !== 'Completed');
  const eventsThisMonth = orders.length;
  const totalRevenuePipeline = orders.reduce((sum, o) => sum + Number(o.totalValue || 0), 0);

  // Recent Requests (last 5)
  const recentRequests = [...requests].slice(0, 5);

  // Upcoming confirmed events (sorted by date)
  const upcomingEvents = [...orders]
    .filter(o => o.preparationStatus !== 'Completed')
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    .slice(0, 4);

  // Follow-up reminders
  const requestsAwaitingQuote = requests.filter(r => r.status === 'New' || r.status === 'Reviewing');
  const prepNeededEvents = orders.filter(o => o.preparationStatus === 'In Preparation' || o.preparationStatus === 'Not Started');

  return (
    <div className="dashboard-wrapper">
      {/* 100-Guest Interactive Demo Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FDE68A 100%)',
          borderRadius: 14,
          padding: '18px 22px',
          border: '1.5px solid #F59E0B',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
          minWidth: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: '#8F1D1D',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 3px 6px rgba(143, 29, 29, 0.3)'
            }}
          >
            <Sparkles size={22} color="#F59E0B" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Featured Prototype Demonstration
              </span>
              <span className="badge badge-new" style={{ fontSize: 10 }}>Ready to Test</span>
            </div>
            <h2 style={{ fontSize: 16.5, fontWeight: 800, color: '#1C1917', marginTop: 2 }}>
              Miller Family Reunion: 100-Guest BBQ Catering Workflow
            </h2>
            <p style={{ fontSize: 12.5, color: '#78350F', marginTop: 2, lineHeight: 1.4 }}>
              Demonstrate the complete inquiry → quotation → quote sent → confirmed order lifecycle in under 2 minutes.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button
            onClick={onStartDemo}
            className="btn btn-amber"
            style={{ fontWeight: 700, padding: '9px 16px' }}
          >
            <Sparkles size={15} />
            <span>Launch Interactive Demo</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="dashboard-stats-grid">
        {/* Card 1: New Catering Requests */}
        <div
          className="card"
          onClick={() => onNavigateTab('requests')}
          style={{ cursor: 'pointer', padding: '18px 20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#57534E' }}>
              New Catering Requests
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Inbox size={17} color="#1D4ED8" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              {newRequestsCount}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#1D4ED8' }}>
              Pending review
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 4 }}>
            Includes 100-guest Miller BBQ inquiry
          </div>
        </div>

        {/* Card 2: Quotes Awaiting Response */}
        <div
          className="card"
          onClick={() => onNavigateTab('requests')}
          style={{ cursor: 'pointer', padding: '18px 20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#57534E' }}>
              Quotes Awaiting Response
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#FDF4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Clock size={17} color="#86198F" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              {quotesAwaitingResponse.length}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#86198F' }}>
              ${quotesValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} pipeline
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 4 }}>
            Average response time: 2.1 days
          </div>
        </div>

        {/* Card 3: Confirmed Upcoming Events */}
        <div
          className="card"
          onClick={() => onNavigateTab('orders')}
          style={{ cursor: 'pointer', padding: '18px 20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#57534E' }}>
              Confirmed Upcoming Events
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <CheckCircle2 size={17} color="#15803D" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              {confirmedUpcomingEvents.length}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#15803D' }}>
              Scheduled in queue
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 4 }}>
            Next event: Oct 29 (Micron Summit)
          </div>
        </div>

        {/* Card 4: Events This Month */}
        <div
          className="card"
          onClick={() => onNavigateTab('calendar')}
          style={{ cursor: 'pointer', padding: '18px 20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#57534E' }}>
              Events This Month
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <CalendarDays size={17} color="#8F1D1D" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              {eventsThisMonth}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8F1D1D' }}>
              ${totalRevenuePipeline.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} booked
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#78716C', marginTop: 4 }}>
            Treasure Valley Catering Division
          </div>
        </div>
      </div>

      {/* Main Responsive Grid: Recent Requests Table (Left) + Follow-up & Upcoming (Right) */}
      <div className="dashboard-main-grid">
        {/* Left Column: Recent Requests Table */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Catering Requests</h3>
              <p className="card-subtitle">Incoming inquiries awaiting quotes or customer action</p>
            </div>
            <button
              onClick={() => onNavigateTab('requests')}
              className="btn btn-secondary btn-sm"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="table-scroll-wrap">
            <table className="data-table" style={{ minWidth: 540 }}>
              <thead>
                <tr>
                  <th>Customer &amp; Group</th>
                  <th>Date &amp; Type</th>
                  <th style={{ textAlign: 'center' }}>Guests</th>
                  <th style={{ textAlign: 'right' }}>Est. Value</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#1C1917' }}>
                        {req.customerName}
                      </div>
                      {req.organization ? (
                        <div style={{ fontSize: 11.5, color: '#78716C' }}>
                          {req.organization}
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: '#A8A29E' }}>
                          {req.phone}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1917' }}>
                        {req.eventDate}
                      </div>
                      <div style={{ fontSize: 11, color: '#78716C' }}>
                        {req.eventType}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>
                      {req.guestCount}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: '#8F1D1D' }}>
                      ${(req.totalValue || req.estimatedBudget || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                    <td>
                      <span className={`badge badge-${req.status.toLowerCase().replace(' ', '-')}`}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => onOpenRequest(req)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 9px', fontSize: 11.5 }}
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Upcoming Events & Follow-up Reminders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {/* Upcoming Events Box */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Upcoming Confirmed Events</h3>
                <p className="card-subtitle">Scheduled kitchen prep &amp; deliveries</p>
              </div>
              <button
                onClick={() => onNavigateTab('calendar')}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 8px' }}
                title="View Calendar"
              >
                <Calendar size={13} />
              </button>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upcomingEvents.length === 0 ? (
                <p style={{ fontSize: 12.5, color: '#78716C', padding: '10px 0' }}>
                  No upcoming events scheduled.
                </p>
              ) : (
                upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => onOpenOrder(evt)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--hm-line)',
                      backgroundColor: '#FAF7F2',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.15s ease',
                      gap: 10
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1C1917' }}>
                          {evt.customerName}
                        </span>
                        <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: '#78716C' }}>
                          {evt.orderNumber}
                        </span>
                      </div>
                      <div style={{ fontSize: 11.5, color: '#57534E', marginTop: 2 }}>
                        {evt.eventDate} • {evt.preferredTime} • <strong>{evt.guestCount} Guests</strong>
                      </div>
                    </div>

                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      <span className={`badge badge-prep-${evt.preparationStatus.toLowerCase().replace(' ', '-')}`}>
                        {evt.preparationStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Follow-up Reminders Box */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Follow-up Reminders</h3>
                <p className="card-subtitle">Pending quotes &amp; smoker preparations</p>
              </div>
              <span className="badge badge-reviewing" style={{ fontSize: 10.5 }}>
                Action Items
              </span>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Reminder 1: Requests awaiting quotation */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: 8, borderBottom: '1px solid var(--hm-line-light)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Inbox size={14} color="#1D4ED8" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                    {requestsAwaitingQuote.length} Inquiries Awaiting Quotation
                  </div>
                  <p style={{ fontSize: 11.5, color: '#57534E', marginTop: 2, lineHeight: 1.35 }}>
                    Miller Family 100-guest BBQ and Boise State tailgate booster inquiries need itemized quotes.
                  </p>
                </div>
              </div>

              {/* Reminder 2: Quotes awaiting customer response */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: 8, borderBottom: '1px solid var(--hm-line-light)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#FDF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={14} color="#86198F" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                    {quotesAwaitingResponse.length} Quotes Sent to Customers
                  </div>
                  <p style={{ fontSize: 11.5, color: '#57534E', marginTop: 2, lineHeight: 1.35 }}>
                    Elena &amp; David Wedding ($4,500) quote sent 4 days ago. Call planned for confirmation.
                  </p>
                </div>
              </div>

              {/* Reminder 3: Smoker preparation */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Flame size={14} color="#8F1D1D" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1C1917' }}>
                    Smoker Prep: Micron Summit (150 Guests)
                  </div>
                  <p style={{ fontSize: 11.5, color: '#57534E', marginTop: 2, lineHeight: 1.35 }}>
                    Overnight hickory smoke starts at 8:00 PM tonight. Briskets and pork shoulders rubbed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
