import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  FileText,
  Calendar,
  ShoppingBag,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';

export function DemoWalkthroughModal({
  isOpen,
  onClose,
  demoRequest,
  onOpenDemoRequest,
  onSimulateQuoteSent,
  onSimulateConfirmOrder,
  onGoToOrders,
  onGoToCalendar
}) {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: "Open Incoming Request",
      summary: "Customer: Marcus Miller (Miller Family 50th Reunion)",
      desc: "Open the new catering inquiry for 100 guests received for Still Water Hollow in Nampa.",
      actionLabel: "Open Request REQ-2026-042",
      run: () => {
        onOpenDemoRequest();
        onClose();
      }
    },
    {
      num: 2,
      title: "Review Guest Count & Venue",
      summary: "100 Guests • Private Party • Still Water Hollow, Nampa",
      desc: "Inspect customer requirements: Smoker trailer 2-hour early setup, covered pavilion, gluten-free accommodations.",
      actionLabel: "Inspect Details",
      run: () => {
        onOpenDemoRequest();
        onClose();
      }
    },
    {
      num: 3,
      title: "Select Menu Items & Quantities",
      summary: "Brisket, Pulled Pork, Mac 'n Cheese, Beans, Cornbread",
      desc: "Items automatically scaled to 100 portions with authentic H&M smokehouse pricing.",
      actionLabel: "View in Request Editor",
      run: () => {
        onOpenDemoRequest();
        onClose();
      }
    },
    {
      num: 4,
      title: "Generate Estimated Quotation",
      summary: "Subtotal + Delivery + Pitmaster Staffing + 6.0% Idaho Tax",
      desc: "Clean printable proposal preview showing official H&M branding, itemized table, and total estimate.",
      actionLabel: "Open Proposal Preview",
      run: () => {
        onOpenDemoRequest(true); // open quotation directly
        onClose();
      }
    },
    {
      num: 5,
      title: "Update Request to 'Quote Sent'",
      summary: "Status Transition: Reviewing → Quote Sent",
      desc: "Sets the quote timestamp and updates pipeline metrics on the dashboard.",
      actionLabel: "Set Status: Quote Sent",
      run: () => {
        onSimulateQuoteSent(demoRequest.id);
        setActiveStep(6);
      }
    },
    {
      num: 6,
      title: "Mark Request as 'Confirmed'",
      summary: "Converts Inquiry into Confirmed Kitchen Order",
      desc: "Generates an official Order # (ORD-2026-104) and queues kitchen smoker prep.",
      actionLabel: "Confirm Order Now",
      run: () => {
        onSimulateConfirmOrder(demoRequest);
        setActiveStep(7);
      }
    },
    {
      num: 7,
      title: "View Event on Orders & Calendar",
      summary: "Scheduled on November 7, 2026 at Still Water Hollow",
      desc: "Inspect the newly confirmed order in the kitchen prep queue and calendar view.",
      actionLabel: "View in Orders & Calendar",
      run: () => {
        onGoToOrders();
        onClose();
      }
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 740, maxHeight: '90vh' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#FAF7F2',
            borderBottom: '1px solid var(--hm-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={20} color="#B45309" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1C1917' }}>
                  Interactive Sales Demonstration Walkthrough
                </h2>
                <span
                  style={{
                    backgroundColor: '#8F1D1D',
                    color: '#FFFFFF',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4
                  }}
                >
                  PROTOTYPE SCENARIO
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#78716C', marginTop: 2 }}>
                100-Guest Private BBQ Event Workflow (Miller Family Reunion)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '24px 28px' }}>
          {/* Scenario Overview Banner */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 10,
              backgroundColor: '#FEF2F2',
              border: '1px solid #FEE2E2',
              marginBottom: 20,
              fontSize: 13,
              lineHeight: 1.5,
              color: '#44403C'
            }}
          >
            <strong style={{ color: '#8F1D1D' }}>Target Demonstration Scenario:</strong> A customer requests BBQ catering for a private event with <strong>100 guests</strong> at <em>Still Water Hollow</em> in Nampa. The order includes slow-smoked brisket, pulled pork, homestyle sides, and on-site smoker setup. Follow the 7 steps below to test the full lifecycle.
          </div>

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, overflowX: 'auto', paddingBottom: 6 }}>
            {steps.map((s) => {
              const isDone = s.num < activeStep;
              const isCurrent = s.num === activeStep;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  style={{
                    flex: 1,
                    minWidth: 80,
                    padding: '8px 10px',
                    borderRadius: 8,
                    textAlign: 'center',
                    border: isCurrent ? '1.5px solid #8F1D1D' : '1px solid #E7E2DA',
                    backgroundColor: isCurrent ? '#FFFFFF' : isDone ? '#F0FDF4' : '#FAF7F2',
                    boxShadow: isCurrent ? 'var(--shadow-xs)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 2 }}>
                    {isDone ? (
                      <CheckCircle2 size={13} color="#16A34A" />
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? '#8F1D1D' : '#78716C' }}>
                        Step {s.num}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: isCurrent ? 700 : 500, color: '#1C1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Highlight Card */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 12,
              border: '1.5px solid #8F1D1D',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: 20
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#8F1D1D',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Active Demonstration Step {current.num} of 7
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1C1917', marginTop: 4, marginBottom: 6 }}>
                  {current.title}
                </h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#D97706', marginBottom: 8 }}>
                  {current.summary}
                </div>
                <p style={{ fontSize: 13.5, color: '#57534E', lineHeight: 1.5 }}>
                  {current.desc}
                </p>
              </div>

              <button
                onClick={current.run}
                className="btn btn-primary"
                style={{ padding: '10px 18px', fontSize: 13.5, flexShrink: 0 }}
              >
                <Play size={14} />
                <span>{current.actionLabel}</span>
              </button>
            </div>
          </div>

          {/* Step-by-Step Summary Grid */}
          <div style={{ borderTop: '1px solid #E7E2DA', paddingTop: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#78716C', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
              Demonstration Workflow Checklist
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {steps.map((s) => (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 6,
                    backgroundColor: s.num === activeStep ? '#FAF7F2' : 'transparent',
                    cursor: 'pointer',
                    fontSize: 13
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        backgroundColor: s.num < activeStep ? '#DCFCE7' : s.num === activeStep ? '#8F1D1D' : '#E7E2DA',
                        color: s.num === activeStep ? '#FFFFFF' : s.num < activeStep ? '#15803D' : '#57534E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700
                      }}
                    >
                      {s.num < activeStep ? '✓' : s.num}
                    </span>
                    <span style={{ fontWeight: s.num === activeStep ? 700 : 500, color: '#1C1917' }}>
                      {s.title}
                    </span>
                    <span style={{ fontSize: 12, color: '#78716C' }}>
                      — {s.summary}
                    </span>
                  </div>
                  <ChevronRight size={15} color="#A8A29E" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12.5, color: '#78716C' }}>
            Current Demo Request: <strong>REQ-2026-042 (Marcus Miller)</strong>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Close Guide
            </button>
            <button
              onClick={() => {
                onOpenDemoRequest();
                onClose();
              }}
              className="btn btn-amber btn-sm"
            >
              <span>Jump to 100-Guest Request</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
