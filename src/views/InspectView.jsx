import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Camera,
  Save,
  Send,
  ArrowLeft,
  Clock,
  AlertTriangle,
  Building2,
  Plus,
  Trash2,
  FileCheck2,
  Check,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { CHECKLIST_TEMPLATES, BUILDINGS } from '../data/mockData';

export const InspectView = ({
  equipmentList = [],
  draftsList = [],
  onSaveDraft,
  onDeleteDraft,
  onSubmitInspection,
  preselectedEquipment = null,
  onClearPreselected,
  onNavigateToReports
}) => {
  // Navigation within Inspect tab: 'categories' | 'select_hoist' | 'checklist' | 'submitted'
  const [subMode, setSubMode] = useState('categories');
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'drafts'

  // Current inspection state
  const [selectedType, setSelectedType] = useState('Equipment Inspection');
  const [selectedAsset, setSelectedAsset] = useState(preselectedEquipment);
  const [activeDraftId, setActiveDraftId] = useState(null);

  // Checklist responses: { [itemId]: { status: 'pass'|'fail'|'na', note: '', photo: '' } }
  const [checklistResponses, setChecklistResponses] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [lastSubmittedReport, setLastSubmittedReport] = useState(null);

  // If preselectedEquipment was passed from outside
  React.useEffect(() => {
    if (preselectedEquipment) {
      setSelectedAsset(preselectedEquipment);
      setSelectedType('Equipment Inspection');
      setSubMode('checklist');
      // Check if draft exists for this equipment
      const existing = draftsList.find((d) => d.hoistId === preselectedEquipment.id);
      if (existing) {
        setActiveDraftId(existing.id);
        setChecklistResponses(existing.checklistState || {});
      } else {
        setActiveDraftId(null);
        setChecklistResponses({});
      }
    }
  }, [preselectedEquipment]);

  // Available checklist items for selected type
  const templateItems = CHECKLIST_TEMPLATES[selectedType] || CHECKLIST_TEMPLATES['Equipment Inspection'];

  // Calculate completion progress
  const answeredCount = Object.keys(checklistResponses).filter(
    (key) => checklistResponses[key]?.status
  ).length;
  const totalCount = templateItems.length;
  const progressPercent = Math.round((answeredCount / totalCount) * 100);

  // Launch checklist for an inspection category
  const handleSelectCategory = (type) => {
    setSelectedType(type);
    if (selectedAsset) {
      setSubMode('checklist');
    } else {
      setSubMode('select_hoist');
    }
  };

  // Launch checklist for a specific hoist/asset
  const handleSelectAssetForInspection = (asset) => {
    setSelectedAsset(asset);
    // Check if an existing draft exists for this hoist
    const existingDraft = draftsList.find(
      (d) => d.hoistId === asset.id || d.assetTag === asset.assetTag
    );
    if (existingDraft) {
      setActiveDraftId(existingDraft.id);
      setChecklistResponses(existingDraft.checklistState || {});
    } else {
      setActiveDraftId(null);
      setChecklistResponses({});
    }
    setSubMode('checklist');
  };

  // Resume an existing draft
  const handleResumeDraft = (draft) => {
    const matchedAsset = equipmentList.find((eq) => eq.id === draft.hoistId || eq.assetTag === draft.assetTag);
    setSelectedAsset(matchedAsset || {
      id: draft.hoistId,
      assetTag: draft.assetTag,
      name: draft.equipmentName,
      number: draft.hoistNumber,
      location: draft.buildingName,
      buildingName: draft.buildingName,
      category: draft.category || 'Hoists & Lifts'
    });
    setSelectedType(draft.type || 'Equipment Inspection');
    setActiveDraftId(draft.id);
    setChecklistResponses(draft.checklistState || {});
    setSubMode('checklist');
  };

  // Handle Pass / Fail / NA button click
  const handleSetStatus = (itemId, status) => {
    setChecklistResponses((prev) => {
      const existing = prev[itemId] || { note: '', photo: '' };
      return {
        ...prev,
        [itemId]: {
          ...existing,
          status: existing.status === status ? null : status
        }
      };
    });
    setValidationError(null);
  };

  // Update note for an item
  const handleUpdateNote = (itemId, note) => {
    setChecklistResponses((prev) => {
      const existing = prev[itemId] || { status: null, photo: '' };
      return {
        ...prev,
        [itemId]: {
          ...existing,
          note
        }
      };
    });
  };

  // Simulate attaching a photo (Mandatory for Fail / Advisory)
  const handleAttachPhoto = (itemId) => {
    // Realistic sample inspection defect photo
    const samplePhotos = [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
    ];
    const picked = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];

    setChecklistResponses((prev) => {
      const existing = prev[itemId] || { status: 'fail', note: '' };
      return {
        ...prev,
        [itemId]: {
          ...existing,
          photo: picked
        }
      };
    });
    setValidationError(null);
  };

  const handleRemovePhoto = (itemId) => {
    setChecklistResponses((prev) => {
      const existing = prev[itemId] || {};
      return {
        ...prev,
        [itemId]: {
          ...existing,
          photo: ''
        }
      };
    });
  };

  // Save Draft (Save, Switch & Resume feature)
  const handleSaveDraftAction = () => {
    if (!selectedAsset) return;

    const draftPayload = {
      id: activeDraftId || `draft-${Date.now()}`,
      hoistId: selectedAsset.id,
      hoistNumber: selectedAsset.number || selectedAsset.name,
      assetTag: selectedAsset.assetTag,
      equipmentName: selectedAsset.name,
      buildingId: selectedAsset.buildingId,
      buildingName: selectedAsset.buildingName || 'Winnipeg Service Center',
      category: selectedAsset.category,
      type: selectedType,
      progress: progressPercent,
      completedItems: answeredCount,
      totalItems: totalCount,
      lastSaved: 'Just now',
      savedTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      checklistState: checklistResponses
    };

    onSaveDraft(draftPayload);
    setActiveDraftId(draftPayload.id);
  };

  // Submit Inspection with photo validation
  const handleSubmitAction = () => {
    // 1. Check if all items answered
    const unanswered = templateItems.filter((item) => !checklistResponses[item.id]?.status);
    if (unanswered.length > 0) {
      setValidationError({
        title: 'Checklist Incomplete',
        message: `Please complete all items before submitting. ${unanswered.length} item(s) remaining.`
      });
      return;
    }

    // 2. Mandatory photo validation: Every failure MUST have a photo
    const failedWithoutPhoto = templateItems.filter((item) => {
      const resp = checklistResponses[item.id];
      return resp?.status === 'fail' && !resp?.photo;
    });

    if (failedWithoutPhoto.length > 0) {
      setValidationError({
        title: 'Mandatory Photo Missing',
        message: `Stephenson Compliance requires photo evidence for all failed or advisory findings. Please attach a photo to: "${failedWithoutPhoto[0].section}".`
      });
      return;
    }

    // Submission successful
    const reportData = {
      id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `${selectedType} Certificate — ${selectedAsset.number || selectedAsset.assetTag}`,
      type: selectedType,
      assetId: selectedAsset.id,
      assetName: selectedAsset.name,
      assetTag: selectedAsset.assetTag,
      buildingName: selectedAsset.buildingName || 'Winnipeg Service Center',
      date: new Date().toISOString().substring(0, 10),
      inspector: 'Marcus Vance',
      branch: 'Winnipeg Branch',
      status: 'Delivered',
      result: Object.values(checklistResponses).some((r) => r.status === 'fail')
        ? 'Passed with Defects'
        : 'Passed (Full Compliance)',
      recipients: 'Winnipeg Operations Desk (ops@stephensonequipment.ca), Dave Miller (Lead Tech)',
      deliveryStatus: 'Sent to Operations & Client Archive',
      deliveredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      itemsCount: totalCount,
      passCount: Object.values(checklistResponses).filter((r) => r.status === 'pass').length,
      failCount: Object.values(checklistResponses).filter((r) => r.status === 'fail').length,
      photoCount: Object.values(checklistResponses).filter((r) => !!r.photo).length,
      summary: `Comprehensive ${selectedType} finalized according to Stephenson ALI/ANSI standards. All safety interlocks checked.`
    };

    onSubmitInspection(reportData, activeDraftId);
    setLastSubmittedReport(reportData);
    setSubMode('submitted');
  };

  // Exit checklist back to overview
  const handleExitChecklist = () => {
    // If user has unsaved responses, save draft automatically
    if (answeredCount > 0 && selectedAsset) {
      handleSaveDraftAction();
    }
    setSubMode('categories');
    setSelectedAsset(null);
    if (onClearPreselected) onClearPreselected();
  };

  /* -------------------------------------------------------------
     SCREEN: SUBMISSION CONFIRMATION
  ------------------------------------------------------------- */
  if (subMode === 'submitted' && lastSubmittedReport) {
    return (
      <div className="pb-8 space-y-4 px-4 pt-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Inspection Submitted Successfully
          </span>
          <h2 className="text-xl font-bold text-zinc-900 mt-2">Compliance Verified</h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-[320px] mx-auto">
            Audit certificate registered with Stephenson Equipment Compliance System.
          </p>
        </div>

        {/* Report Card */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs text-left space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <div>
              <span className="text-[11px] text-zinc-400 font-medium">Certificate Number</span>
              <div className="font-bold text-sm text-zinc-800">{lastSubmittedReport.id}</div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
              {lastSubmittedReport.date}
            </span>
          </div>

          <div className="text-xs space-y-1.5 text-zinc-600">
            <div>
              <span className="text-zinc-400">Equipment:</span>{' '}
              <strong className="text-zinc-800">{lastSubmittedReport.assetName}</strong>
            </div>
            <div>
              <span className="text-zinc-400">Result:</span>{' '}
              <span className="font-bold text-emerald-700">{lastSubmittedReport.result}</span>
            </div>
            <div>
              <span className="text-zinc-400">Inspector:</span>{' '}
              <span className="text-zinc-800 font-semibold">{lastSubmittedReport.inspector}</span>
            </div>
            <div>
              <span className="text-zinc-400">Delivered To:</span>{' '}
              <span className="text-zinc-800">{lastSubmittedReport.recipients}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => {
              setSubMode('categories');
              setSelectedAsset(null);
              if (onNavigateToReports) onNavigateToReports();
            }}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>View Completed Report & PDF</span>
          </button>

          <button
            onClick={() => {
              setSubMode('categories');
              setSelectedAsset(null);
            }}
            className="w-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 rounded-xl py-3 px-4 font-semibold text-sm transition-colors"
          >
            Start Another Inspection
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     SCREEN: ACTIVE CHECKLIST & MANDATORY PHOTO VERIFICATION
  ------------------------------------------------------------- */
  if (subMode === 'checklist' && selectedAsset) {
    return (
      <div className="space-y-3 px-4 pt-3 pb-3 bg-white relative">
        {/* Top Header with Back & Save Draft */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={handleExitChecklist}
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 font-semibold text-xs py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Save & Exit</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraftAction}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* Hoist & Inspection Header Banner */}
        <div className="bg-white rounded-2xl p-3.5 border border-zinc-200/80 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-[#e01f1a]/10 text-[#e01f1a]">
                  {selectedType}
                </span>
                <span className="text-xs font-bold text-zinc-700">{selectedAsset.assetTag}</span>
              </div>
              <h2 className="text-base font-bold text-zinc-900 mt-1 leading-snug">
                {selectedAsset.number ? `${selectedAsset.number} — ${selectedAsset.baseName || selectedAsset.name}` : selectedAsset.name}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">{selectedAsset.location || selectedAsset.buildingName}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base font-bold text-[#e01f1a]">{progressPercent}%</span>
              <span className="block text-[10.5px] text-zinc-400">
                {answeredCount}/{totalCount} Items
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-[#e01f1a] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Validation Error Alert Banner */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-start gap-3 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-[#e01f1a] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-[#e01f1a]">{validationError.title}</h4>
              <p className="text-xs text-red-700 mt-0.5">{validationError.message}</p>
            </div>
            <button
              onClick={() => setValidationError(null)}
              className="text-xs font-bold text-red-500 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Checklist Items List */}
        <div className="space-y-3 pt-1">
          {templateItems.map((item, index) => {
            const resp = checklistResponses[item.id] || {};
            const isPass = resp.status === 'pass';
            const isFail = resp.status === 'fail';
            const isNA = resp.status === 'na';
            const hasPhoto = !!resp.photo;
            const isNotesOpen = expandedNotes[item.id] || !!resp.note;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-3.5 border transition-all ${
                  isFail
                    ? 'border-red-300 ring-1 ring-red-100'
                    : isPass
                    ? 'border-emerald-200/80'
                    : 'border-zinc-200/80'
                }`}
              >
                {/* Item Section & Text */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                      {item.section}
                    </span>
                    <p className="text-xs text-zinc-800 font-medium leading-relaxed mt-0.5">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Controls: Pass / Fail / N/A */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {/* PASS Button */}
                  <button
                    onClick={() => handleSetStatus(item.id, 'pass')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isPass
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pass</span>
                  </button>

                  {/* FAIL Button */}
                  <button
                    onClick={() => handleSetStatus(item.id, 'fail')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isFail
                        ? 'bg-[#e01f1a] text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Fail</span>
                  </button>

                  {/* N/A Button */}
                  <button
                    onClick={() => handleSetStatus(item.id, 'na')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isNA
                        ? 'bg-zinc-800 text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>N/A</span>
                  </button>
                </div>

                {/* MANDATORY PHOTO REQUIREMENT FOR FAIL */}
                {isFail && (
                  <div className="mt-3 p-2.5 rounded-xl bg-red-50/90 border border-red-200/90 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[#e01f1a] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Photo Required for Failed Findings</span>
                      </div>
                      {hasPhoto && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Attached
                        </span>
                      )}
                    </div>

                    {hasPhoto ? (
                      <div className="relative rounded-lg overflow-hidden border border-red-200 max-w-[200px] mt-2">
                        <img
                          src={resp.photo}
                          alt="Defect evidence"
                          className="w-full h-24 object-cover"
                        />
                        <button
                          onClick={() => handleRemovePhoto(item.id)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-black"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAttachPhoto(item.id)}
                        className="w-full py-2 px-3 bg-[#e01f1a] hover:bg-[#c41814] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-colors mt-1"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take / Attach Required Photo</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Notes and Optional Photo Toggle */}
                <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() =>
                      setExpandedNotes((p) => ({ ...p, [item.id]: !p[item.id] }))
                    }
                    className="text-zinc-500 hover:text-zinc-800 font-medium flex items-center gap-1"
                  >
                    <span>{resp.note ? 'Edit Notes' : '+ Add Note'}</span>
                  </button>

                  {!isFail && (
                    <button
                      onClick={() => handleAttachPhoto(item.id)}
                      className="text-zinc-500 hover:text-zinc-800 font-medium flex items-center gap-1"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{hasPhoto ? 'Change Photo' : 'Attach Photo'}</span>
                    </button>
                  )}
                </div>

                {/* Note input field */}
                {isNotesOpen && (
                  <div className="mt-2">
                    <textarea
                      value={resp.note || ''}
                      onChange={(e) => handleUpdateNote(item.id, e.target.value)}
                      placeholder="Add observation, measurements, or corrective note..."
                      rows={2}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#e01f1a] focus:ring-1 focus:ring-[#e01f1a] bg-zinc-50/50"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Bar at Bottom of Checklist docked right above bottom nav */}
        <div className="sticky bottom-0 left-0 right-0 -mx-4 px-4 py-2.5 bg-white border-t border-zinc-200 flex items-center gap-2 z-20 shadow-md">
          <button
            onClick={handleSaveDraftAction}
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-800 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleSubmitAction}
            className="flex-[2] bg-[#e01f1a] hover:bg-[#c41814] active:bg-[#a51410] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Send className="w-4 h-4 stroke-[2.2]" />
            <span>Submit Inspection ({progressPercent}%)</span>
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     SCREEN: SELECT NUMBERED HOIST / BUILDING PICKER
  ------------------------------------------------------------- */
  if (subMode === 'select_hoist') {
    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={() => setSubMode('categories')}
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 font-semibold text-xs py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </button>
          <span className="text-xs font-bold text-zinc-800">{selectedType}</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Select Building & Hoist</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Choose a numbered hoist (Hoist 01 - Hoist 40) or facility equipment to inspect.
          </p>
        </div>

        {/* Building Groups */}
        <div className="space-y-4">
          {BUILDINGS.map((bld) => {
            const bldEquipment = equipmentList.filter((eq) => eq.buildingId === bld.id);

            return (
              <div key={bld.id} className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#e01f1a] tracking-wider uppercase">
                      {bld.code}
                    </span>
                    <h3 className="font-bold text-sm text-zinc-900">{bld.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{bld.description}</p>
                  </div>
                </div>

                {/* Hoist Grid (Numbered Hoist 01 through Hoist 20 / 40) */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                  {bldEquipment.map((item) => {
                    const hasDraft = draftsList.some(
                      (d) => d.hoistId === item.id || d.assetTag === item.assetTag
                    );

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectAssetForInspection(item)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          hasDraft
                            ? 'bg-blue-50 border-blue-300 text-blue-900'
                            : item.status === 'Due for Inspection'
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : item.status === 'Inspected'
                            ? 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100'
                            : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">
                          {item.number ? item.number.replace('Hoist ', 'H-') : item.assetTag.substring(7)}
                        </div>
                        <div className="text-[9.5px] mt-0.5 text-zinc-500 truncate">
                          {hasDraft ? (
                            <span className="text-blue-600 font-bold">Draft</span>
                          ) : (
                            item.status.substring(0, 8)
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     MAIN SCREEN: CATEGORIES OR SAVED DRAFTS
  ------------------------------------------------------------- */
  return (
    <div className="pb-8 space-y-4 px-4 pt-3">
      {/* Top Segmented Control: New vs Saved Drafts (Client Requirement 4) */}
      <div className="bg-zinc-100 p-1 rounded-xl flex items-center">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'new'
              ? 'bg-white text-zinc-900 shadow-xs'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          New Inspection
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'drafts'
              ? 'bg-white text-zinc-900 shadow-xs'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <span>Saved Drafts</span>
          {draftsList.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#e01f1a] text-white">
              {draftsList.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'new' ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Select Inspection Category</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Choose a standardized Stephenson Equipment checklist to begin.
            </p>
          </div>

          {/* 3 Large Selectable Cards matching Image 3 */}
          <div className="space-y-3">
            {/* Card 1: Equipment Inspection */}
            <div
              onClick={() => handleSelectCategory('Equipment Inspection')}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e01f1a] flex items-center justify-center">
                  <Wrench className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                  ALI / ANSI Certified
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900">Equipment Inspection</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Post hoists, 4-post racks, compressors, and hydraulic lifting units.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#e01f1a] mt-3 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Safety Inspection */}
            <div
              onClick={() => handleSelectCategory('Safety Inspection')}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e01f1a] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                  OSHA / Compliance
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900">Safety Inspection</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Shop hazard checks, emergency stops, lockout/tagout, and fire safety.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#e01f1a] mt-3 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Vehicle Inspection */}
            <div
              onClick={() => handleSelectCategory('Vehicle Inspection')}
              className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e01f1a] flex items-center justify-center">
                  <Truck className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-600">
                  CVOR / DOT Pre-Trip
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900">Vehicle Inspection</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Service trucks, outriggers, crane booms, and utility fleet vehicles.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#e01f1a] mt-3 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SAVED DRAFTS & IN-PROGRESS (Requirement 4) */
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Saved & In-Progress Inspections</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Resume partially completed inspections from where you last saved.
            </p>
          </div>

          {draftsList.length > 0 ? (
            draftsList.map((draft) => (
              <div
                key={draft.id}
                className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700">
                      {draft.type}
                    </span>
                    <h3 className="font-bold text-sm text-zinc-900 mt-1">
                      {draft.hoistNumber ? `${draft.hoistNumber} — ` : ''}
                      {draft.equipmentName}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{draft.buildingName}</p>
                  </div>
                  <button
                    onClick={() => onDeleteDraft(draft.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg"
                    title="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-1">
                    <span>
                      {draft.completedItems} of {draft.totalItems} items completed
                    </span>
                    <span className="text-[#e01f1a]">{draft.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#e01f1a] h-2 rounded-full"
                      style={{ width: `${draft.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                  <span className="text-zinc-400 text-[11px]">Saved {draft.lastSaved}</span>
                  <button
                    onClick={() => handleResumeDraft(draft)}
                    className="bg-[#e01f1a] hover:bg-[#c41814] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Resume Inspection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
              <Clock className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <h4 className="font-bold text-zinc-800 text-sm">No saved drafts</h4>
              <p className="text-xs text-zinc-500 mt-1">
                When you save an inspection in progress, it will appear here so you can switch between hoists easily.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
