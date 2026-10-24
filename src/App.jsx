import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HomeView } from './views/HomeView';
import { EquipmentView } from './views/EquipmentView';
import { InspectView } from './views/InspectView';
import { IssuesView } from './views/IssuesView';
import { MoreView } from './views/MoreView';

import {
  ALL_EQUIPMENT,
  INITIAL_DRAFTS,
  INITIAL_ISSUES,
  INITIAL_MAINTENANCE,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'equipment' | 'inspect' | 'issues' | 'more'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [moreSubScreen, setMoreSubScreen] = useState(null);

  // Application Data State
  const [activeBranch, setActiveBranch] = useState('Winnipeg Branch');
  const [equipmentList, setEquipmentList] = useState(ALL_EQUIPMENT);
  const [draftsList, setDraftsList] = useState(INITIAL_DRAFTS);
  const [issuesList, setIssuesList] = useState(INITIAL_ISSUES);
  const [maintenanceList, setMaintenanceList] = useState(INITIAL_MAINTENANCE);
  const [reportsList, setReportsList] = useState(INITIAL_REPORTS);
  const [notificationsList, setNotificationsList] = useState(INITIAL_NOTIFICATIONS);

  // Active selections
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [preselectedEquipmentForInspect, setPreselectedEquipmentForInspect] = useState(null);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Unread notifications count
  const unreadNotificationsCount = notificationsList.filter((n) => !n.read).length;
  // Open issues count
  const openIssuesCount = issuesList.filter((i) => i.status !== 'Resolved').length;

  // Screen Title Mapper
  const getScreenTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Stephenson Equipment';
      case 'equipment':
        return selectedEquipment ? selectedEquipment.assetTag : 'Equipment Assets';
      case 'inspect':
        return 'Inspection Manager';
      case 'issues':
        return selectedIssue ? selectedIssue.assetTag : 'Defects & Issues';
      case 'more':
        return 'More Options';
      default:
        return 'Stephenson Equipment';
    }
  };

  // Start Inspection CTA handler
  const handleStartInspection = (equipment = null) => {
    if (equipment) {
      setPreselectedEquipmentForInspect(equipment);
      setSelectedEquipment(null);
    } else {
      setPreselectedEquipmentForInspect(null);
    }
    setActiveTab('inspect');
  };

  // Save Draft (Save, Switch & Resume feature)
  const handleSaveDraft = (draftPayload) => {
    setDraftsList((prev) => {
      const idx = prev.findIndex((d) => d.id === draftPayload.id || d.hoistId === draftPayload.hoistId);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = draftPayload;
        return copy;
      }
      return [draftPayload, ...prev];
    });

    // Update equipment status to 'In Progress'
    setEquipmentList((prev) =>
      prev.map((eq) =>
        eq.id === draftPayload.hoistId ? { ...eq, status: 'In Progress' } : eq
      )
    );

    showToast(`Draft for ${draftPayload.hoistNumber || draftPayload.assetTag} saved successfully.`);
  };

  // Delete Draft
  const handleDeleteDraft = (draftId) => {
    setDraftsList((prev) => prev.filter((d) => d.id !== draftId));
    showToast('Draft deleted.');
  };

  // Submit Inspection
  const handleSubmitInspection = (reportData, completedDraftId) => {
    // Add to reports list
    setReportsList((prev) => [reportData, ...prev]);

    // Remove draft if existed
    if (completedDraftId) {
      setDraftsList((prev) => prev.filter((d) => d.id !== completedDraftId));
    }

    // Update equipment status to 'Inspected'
    setEquipmentList((prev) =>
      prev.map((eq) =>
        eq.id === reportData.assetId || eq.assetTag === reportData.assetTag
          ? {
              ...eq,
              status: reportData.failCount > 0 ? 'Attention' : 'Inspected',
              lastInspected: reportData.date
            }
          : eq
      )
    );

    showToast(`Inspection submitted and sent to ${reportData.branch} operations.`);
  };

  // Update Issue
  const handleUpdateIssue = (updatedIssue) => {
    setIssuesList((prev) =>
      prev.map((item) => (item.id === updatedIssue.id ? updatedIssue : item))
    );
    setSelectedIssue(updatedIssue);
    showToast(`Issue ${updatedIssue.id} updated (${updatedIssue.status}).`);
  };

  // Notifications
  const handleMarkNotificationRead = (notifId) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Sidebar navigation handler
  const handleSidebarNavigate = (tab, subScreen = null) => {
    setActiveTab(tab);
    if (tab === 'more') {
      setMoreSubScreen(subScreen);
    } else {
      setMoreSubScreen(null);
    }
    setSelectedEquipment(null);
    setSelectedIssue(null);
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-white flex justify-center overflow-hidden selection:bg-[#e01f1a] selection:text-white">
      {/* 
        Solid Mobile App Layout Container:
        - Viewport height strictly 100dvh, overflow-hidden.
        - Pinned TopBar at the top (shrink-0).
        - Pinned BottomNav at the bottom (shrink-0) - permanently visible, never hides before or during scroll.
        - Scrollable main content viewport (flex-1 overflow-y-auto overscroll-contain).
      */}
      <div className="w-full max-w-md h-full bg-white flex flex-col relative border-x border-zinc-200/60 shadow-xs overflow-hidden">
        {/* Pinned Top Bar Header */}
        <TopBar
          title={getScreenTitle()}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          unreadNotificationsCount={unreadNotificationsCount}
          onNotificationClick={() => {
            setActiveTab('more');
            setMoreSubScreen('notifications');
          }}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold shadow-lg animate-fadeIn flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e01f1a]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Slide-out Left Sidebar Drawer */}
        <SidebarDrawer
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeDestination={activeTab}
          onNavigate={handleSidebarNavigate}
          activeBranch={activeBranch}
          onSelectBranch={(branch) => {
            setActiveBranch(branch);
            showToast(`Active facility changed to ${branch}`);
          }}
          unreadNotificationsCount={unreadNotificationsCount}
          openIssuesCount={openIssuesCount}
        />

        {/* Scrollable Main Content Viewport */}
        <main className="flex-1 w-full bg-white overflow-y-auto overscroll-contain">
          {/* TAB 1: HOME DASHBOARD */}
          {activeTab === 'home' && (
            <HomeView
              onStartInspection={() => handleStartInspection(null)}
              onNavigateToIssues={() => {
                setActiveTab('issues');
                setSelectedIssue(null);
              }}
              onNavigateToEquipment={() => {
                setActiveTab('equipment');
                setSelectedEquipment(null);
              }}
              onNavigateToMaintenance={() => {
                setActiveTab('more');
                setMoreSubScreen('maintenance');
              }}
              onSelectIssue={(issue) => {
                setSelectedIssue(issue);
                setActiveTab('issues');
              }}
              issuesList={issuesList}
              maintenanceList={maintenanceList}
              activeBranch={activeBranch}
            />
          )}

          {/* TAB 2: EQUIPMENT & HOISTS */}
          {activeTab === 'equipment' && (
            <EquipmentView
              equipmentList={equipmentList}
              selectedEquipment={selectedEquipment}
              onSelectEquipment={(eq) => setSelectedEquipment(eq)}
              onCloseEquipmentDetail={() => setSelectedEquipment(null)}
              onStartInspection={(eq) => handleStartInspection(eq)}
            />
          )}

          {/* TAB 3: INSPECT & DRAFTS */}
          {activeTab === 'inspect' && (
            <InspectView
              equipmentList={equipmentList}
              draftsList={draftsList}
              onSaveDraft={handleSaveDraft}
              onDeleteDraft={handleDeleteDraft}
              onSubmitInspection={handleSubmitInspection}
              preselectedEquipment={preselectedEquipmentForInspect}
              onClearPreselected={() => setPreselectedEquipmentForInspect(null)}
              onNavigateToReports={() => {
                setActiveTab('more');
                setMoreSubScreen('reports');
              }}
            />
          )}

          {/* TAB 4: ISSUES & DEFECTS */}
          {activeTab === 'issues' && (
            <IssuesView
              issuesList={issuesList}
              onUpdateIssue={handleUpdateIssue}
              selectedIssue={selectedIssue}
              onSelectIssue={(iss) => setSelectedIssue(iss)}
              onCloseDetail={() => setSelectedIssue(null)}
            />
          )}

          {/* TAB 5: MORE OPTIONS */}
          {activeTab === 'more' && (
            <MoreView
              initialSubScreen={moreSubScreen}
              maintenanceList={maintenanceList}
              reportsList={reportsList}
              notificationsList={notificationsList}
              activeBranch={activeBranch}
              onSelectBranch={(branch) => {
                setActiveBranch(branch);
                showToast(`Facility updated to ${branch}`);
              }}
              onNavigateToTab={(tab, targetId) => {
                setActiveTab(tab);
                setMoreSubScreen(null);
                if (tab === 'issues' && targetId) {
                  const found = issuesList.find((i) => i.id === targetId);
                  if (found) setSelectedIssue(found);
                } else if (tab === 'equipment' && targetId) {
                  const found = equipmentList.find((e) => e.id === targetId || e.assetTag === targetId);
                  if (found) setSelectedEquipment(found);
                }
              }}
              onMarkNotificationRead={handleMarkNotificationRead}
              onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
            />
          )}
        </main>

        {/* Pinned Bottom Navigation: NEVER HIDES */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setMoreSubScreen(null);
            setSelectedEquipment(null);
            setSelectedIssue(null);
          }}
          openIssuesCount={openIssuesCount}
        />
      </div>
    </div>
  );
}

export default App;
