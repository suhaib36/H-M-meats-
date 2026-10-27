import React, { useState, useEffect } from 'react';
import {
  BUSINESS_INFO,
  INITIAL_MENU_ITEMS,
  INITIAL_REQUESTS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from './data/initialData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ToastContainer } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';

import { DashboardView } from './views/DashboardView';
import { RequestsView } from './views/RequestsView';
import { RequestDetailModal } from './views/RequestDetailModal';
import { QuotationModal } from './views/QuotationModal';
import { NewRequestModal } from './views/NewRequestModal';
import { OrdersView } from './views/OrdersView';
import { CalendarView } from './views/CalendarView';
import { MenuPackagesView } from './views/MenuPackagesView';
import { DemoWalkthroughModal } from './views/DemoWalkthroughModal';

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  // Active Modals & Selection
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [quotationPreviewRequest, setQuotationPreviewRequest] = useState(null);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState(null);

  // Confirmation dialog state
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    isDestructive: true,
    onConfirm: () => {}
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, title = '', type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persistent Client State (LocalStorage)
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('hm_catering_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('hm_catering_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hm_catering_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('hm_catering_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hm_catering_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('hm_catering_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hm_catering_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('hm_catering_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Request Actions
  const handleSaveRequest = (updatedRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
    );
    setSelectedRequest(null);
    addToast(
      `Catering request for ${updatedRequest.customerName} updated successfully.`,
      'Changes Saved',
      'success'
    );
  };

  const handleCreateNewRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    addToast(
      `Inquiry ${newRequest.id} for ${newRequest.customerName} recorded.`,
      'New Request Created',
      'success'
    );
  };

  const handleOpenQuotationPreview = (req) => {
    setQuotationPreviewRequest(req);
  };

  const handleSendQuote = (requestId) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'Quote Sent',
            quoteSentDate: todayStr
          };
        }
        return r;
      })
    );
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: 'Quote Sent',
        quoteSentDate: todayStr
      }));
    }
    setQuotationPreviewRequest(null);
    addToast(
      `Estimate delivered to customer. Status transitioned to Quote Sent.`,
      'Quotation Sent',
      'success'
    );
  };

  // Marking a request as Confirmed -> automatically generates an Order!
  const handleMarkConfirmed = (req) => {
    setConfirmState({
      isOpen: true,
      title: 'Confirm Event & Book Order?',
      message: `Are you sure you want to confirm ${req.customerName}'s event for ${req.eventDate}? This will generate a kitchen order and reserve smoker capacity.`,
      confirmLabel: 'Confirm & Create Order',
      isDestructive: false,
      onConfirm: () => {
        const orderNumber = `ORD-2026-${req.id.replace('REQ-2026-', '')}`;
        const todayStr = new Date().toISOString().split('T')[0];

        // Format menu items for order
        const orderItems = (req.selectedItems || []).map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          total: Number(i.quantity) * Number(i.price)
        }));

        const newOrder = {
          id: orderNumber,
          orderNumber,
          requestId: req.id,
          customerName: req.customerName,
          organization: req.organization,
          email: req.email,
          phone: req.phone,
          eventType: req.eventType,
          eventDate: req.eventDate,
          preferredTime: req.preferredTime,
          guestCount: req.guestCount,
          venueAddress: req.venueAddress,
          subtotal: req.subtotal || 0,
          deliveryFee: req.deliveryFee || 0,
          staffingFee: req.staffingFee || 0,
          taxRate: req.taxRate || BUSINESS_INFO.taxRate,
          taxAmount: req.taxAmount || 0,
          totalValue: req.totalValue || req.estimatedBudget || 0,
          preparationStatus: 'Not Started',
          paymentStatus: 'Deposit Received',
          dateConfirmed: todayStr,
          items: orderItems,
          dietaryNotes: req.dietaryNotes,
          specialInstructions: req.specialInstructions,
          kitchenChecklist: [
            { step: 'Order verified & meat cuts reserved in walk-in cooler', done: true },
            { step: 'Schedule pitmaster smoking shift & wood restock', done: false },
            { step: 'Sides & sauce prep underway', done: false },
            { step: 'Load catering hot boxes & chafers for delivery', done: false }
          ],
          notes: `Confirmed from request ${req.id} on ${todayStr}.`
        };

        // Update request status
        setRequests((prev) =>
          prev.map((r) => (r.id === req.id ? { ...r, status: 'Confirmed', confirmedDate: todayStr } : r))
        );

        // Add or replace in orders
        setOrders((prev) => {
          const exists = prev.some((o) => o.orderNumber === orderNumber);
          return exists ? prev.map((o) => (o.orderNumber === orderNumber ? newOrder : o)) : [newOrder, ...prev];
        });

        setSelectedRequest(null);
        setConfirmState((prev) => ({ ...prev, isOpen: false }));

        addToast(
          `Event confirmed! Order ${orderNumber} created with Deposit Received status.`,
          'Order Confirmed',
          'success'
        );
      }
    });
  };

  const handleCancelRequest = (requestId) => {
    setConfirmState({
      isOpen: true,
      title: 'Decline Catering Request?',
      message: 'Are you sure you want to decline this inquiry? The customer status will be set to Declined.',
      confirmLabel: 'Decline Request',
      isDestructive: true,
      onConfirm: () => {
        setRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status: 'Declined' } : r))
        );
        setSelectedRequest(null);
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        addToast('Request status updated to Declined.', 'Request Cancelled', 'error');
      }
    });
  };

  // Orders Actions
  const handleUpdateOrderStatus = (orderId, updates) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
    );
    addToast('Order status updated.', 'Order Updated', 'success');
  };

  const handleUpdateOrderChecklist = (orderId, stepIdx) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedChecklist = [...o.kitchenChecklist];
          updatedChecklist[stepIdx] = {
            ...updatedChecklist[stepIdx],
            done: !updatedChecklist[stepIdx].done
          };
          return { ...o, kitchenChecklist: updatedChecklist };
        }
        return o;
      })
    );
  };

  // Menu Actions
  const handleAddMenuItem = (newItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
    addToast(`${newItem.name} added to catering menu.`, 'Menu Item Added', 'success');
  };

  const handleUpdateMenuItem = (updatedItem) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === updatedItem.id ? updatedItem : m))
    );
    addToast(`${updatedItem.name} updated.`, 'Menu Item Updated', 'success');
  };

  const handleToggleActiveItem = (itemId) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, active: !m.active } : m))
    );
  };

  // Reset Data to Pristine State
  const handleResetData = () => {
    setConfirmState({
      isOpen: true,
      title: 'Reset Demo Data to Initial State?',
      message: 'This will restore all sample inquiries, confirmed orders, and menu items to their original demonstration state.',
      confirmLabel: 'Reset Data',
      isDestructive: true,
      onConfirm: () => {
        localStorage.removeItem('hm_catering_requests');
        localStorage.removeItem('hm_catering_orders');
        localStorage.removeItem('hm_catering_menu');
        localStorage.removeItem('hm_catering_notifications');

        setRequests(INITIAL_REQUESTS);
        setOrders(INITIAL_ORDERS);
        setMenuItems(INITIAL_MENU_ITEMS);
        setNotifications(INITIAL_NOTIFICATIONS);

        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        addToast('Sample data reset to original demo state.', 'System Reset', 'success');
      }
    });
  };

  // 100-Guest Demo Scenario Shortcuts
  const demoTargetRequest = requests.find((r) => r.id === 'REQ-2026-042') || requests[0];

  const handleOpenDemoRequest = (openQuoteDirectly = false) => {
    if (openQuoteDirectly) {
      setQuotationPreviewRequest(demoTargetRequest);
    } else {
      setSelectedRequest(demoTargetRequest);
    }
  };

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        requestsCount={requests.filter((r) => r.status === 'New' || r.status === 'Reviewing').length}
        activeOrdersCount={orders.filter((o) => o.preparationStatus !== 'Completed').length}
        onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
        onStartDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Viewport */}
      <div className="main-viewport">
        {/* App Header */}
        <Header
          activeTab={activeTab}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onStartDemo={() => setIsDemoModalOpen(true)}
          onResetData={handleResetData}
        />

        {/* Scrollable View Content */}
        <main className="content-scrollable">
          {activeTab === 'dashboard' && (
            <DashboardView
              requests={requests}
              orders={orders}
              notifications={notifications}
              onOpenRequest={(req) => setSelectedRequest(req)}
              onOpenOrder={(ord) => {
                setSelectedOrderForDetail(ord);
                setActiveTab('orders');
              }}
              onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
              onStartDemo={() => setIsDemoModalOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'requests' && (
            <RequestsView
              requests={requests}
              onOpenRequest={(req) => setSelectedRequest(req)}
              onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
              onOpenQuotationPreview={(req) => setQuotationPreviewRequest(req)}
              onMarkConfirmed={(req) => handleMarkConfirmed(req)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              selectedOrder={selectedOrderForDetail}
              setSelectedOrder={setSelectedOrderForDetail}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onUpdateOrderChecklist={handleUpdateOrderChecklist}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              requests={requests}
              orders={orders}
              onOpenRequest={(req) => setSelectedRequest(req)}
              onOpenOrder={(ord) => {
                setSelectedOrderForDetail(ord);
                setActiveTab('orders');
              }}
            />
          )}

          {activeTab === 'menu' && (
            <MenuPackagesView
              menuItems={menuItems}
              onAddMenuItem={handleAddMenuItem}
              onUpdateMenuItem={handleUpdateMenuItem}
              onToggleActiveItem={handleToggleActiveItem}
              onResetMenu={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      {/* 1. Request Details & Quotation Builder */}
      {selectedRequest && (
        <RequestDetailModal
          isOpen={Boolean(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          menuItems={menuItems}
          onSaveRequest={handleSaveRequest}
          onOpenQuotationPreview={(req) => setQuotationPreviewRequest(req)}
          onMarkConfirmed={(req) => handleMarkConfirmed(req)}
          onCancelRequest={(id) => handleCancelRequest(id)}
        />
      )}

      {/* 2. Official Quotation Preview */}
      {quotationPreviewRequest && (
        <QuotationModal
          isOpen={Boolean(quotationPreviewRequest)}
          onClose={() => setQuotationPreviewRequest(null)}
          request={quotationPreviewRequest}
          onSendQuote={handleSendQuote}
          onCopyQuote={() => addToast('Quotation text copied to clipboard.', 'Copied', 'success')}
        />
      )}

      {/* 3. New Request Modal */}
      <NewRequestModal
        isOpen={isNewRequestModalOpen}
        onClose={() => setIsNewRequestModalOpen(false)}
        onSubmitNewRequest={handleCreateNewRequest}
        menuItems={menuItems}
      />

      {/* 4. Sales Demo Walkthrough Modal */}
      <DemoWalkthroughModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        demoRequest={demoTargetRequest}
        onOpenDemoRequest={handleOpenDemoRequest}
        onSimulateQuoteSent={(id) => handleSendQuote(id)}
        onSimulateConfirmOrder={(req) => handleMarkConfirmed(req)}
        onGoToOrders={() => setActiveTab('orders')}
        onGoToCalendar={() => setActiveTab('calendar')}
      />

      {/* 5. Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onSelectRequest={(reqId) => {
          const req = requests.find((r) => r.id === reqId);
          if (req) setSelectedRequest(req);
        }}
        onSelectOrder={(ordId) => {
          const ord = orders.find((o) => o.id === ordId);
          if (ord) {
            setSelectedOrderForDetail(ord);
            setActiveTab('orders');
          }
        }}
        onDismissNotification={handleDismissNotification}
      />

      {/* 6. Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmLabel={confirmState.confirmLabel}
        isDestructive={confirmState.isDestructive}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* 7. Toast Alerts Container */}
      <ToastContainer toasts={toasts} onCloseToast={removeToast} />
    </div>
  );
}
