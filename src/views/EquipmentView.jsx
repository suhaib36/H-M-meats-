import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Building2,
  ArrowLeft,
  Calendar,
  Wrench,
  FileCheck2,
  PlayCircle,
  ShieldCheck,
  Hash
} from 'lucide-react';
import { BUILDINGS } from '../data/mockData';

export const EquipmentView = ({
  equipmentList = [],
  onStartInspection,
  selectedEquipment,
  onSelectEquipment,
  onCloseEquipmentDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBuildingId, setSelectedBuildingId] = useState('all');

  const categories = ['All', 'Hoists & Lifts', 'Air Compressors', 'Alignment & Wheel', 'Fleet & Vehicles'];

  // Filtered equipment
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Building filter
      if (selectedBuildingId !== 'all' && item.buildingId !== selectedBuildingId) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTag = item.assetTag.toLowerCase().includes(query);
        const matchesNum = item.number ? item.number.toLowerCase().includes(query) : false;
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesModel = item.model ? item.model.toLowerCase().includes(query) : false;
        return matchesName || matchesTag || matchesNum || matchesLoc || matchesModel;
      }
      return true;
    });
  }, [equipmentList, selectedCategory, selectedBuildingId, searchQuery]);

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Inspected':
      case 'Operational':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Operational</span>
          </span>
        );
      case 'Due for Inspection':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Due for Inspection</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Draft in Progress</span>
          </span>
        );
      case 'Attention':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>Attention</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>Pending</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-600">
            {status}
          </span>
        );
    }
  };

  // If an equipment is selected, show detail screen
  if (selectedEquipment) {
    const isHoist = selectedEquipment.category === 'Hoists & Lifts';

    return (
      <div className="pb-8 space-y-4 px-4 pt-3">
        {/* Compact Back Button Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
          <button
            onClick={onCloseEquipmentDetail}
            className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 font-semibold text-sm py-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Back to Equipment</span>
          </button>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
            {selectedEquipment.assetTag}
          </span>
        </div>

        {/* Equipment Title & Badges */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                {selectedEquipment.category}
              </span>
              <h2 className="text-lg font-bold text-zinc-900 leading-snug mt-0.5">
                {selectedEquipment.name}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">{selectedEquipment.location}</p>
            </div>
            <div className="shrink-0">{getStatusBadge(selectedEquipment.status)}</div>
          </div>

          {/* Primary CTA: Start Inspection */}
          <button
            onClick={() => onStartInspection(selectedEquipment)}
            className="w-full bg-[#e01f1a] hover:bg-[#c41814] text-white rounded-xl py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <PlayCircle className="w-5 h-5 stroke-[2.2]" />
            <span>
              {selectedEquipment.status === 'In Progress' ? 'Resume Active Inspection' : 'Start Inspection'}
            </span>
          </button>
        </div>

        {/* Key Specifications Grid */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Manufacturer</span>
              <span className="font-semibold text-zinc-800">{selectedEquipment.manufacturer || 'N/A'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Model Number</span>
              <span className="font-semibold text-zinc-800">{selectedEquipment.model || 'N/A'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Rated Capacity</span>
              <span className="font-semibold text-zinc-800">{selectedEquipment.capacity || 'N/A'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Serial Number</span>
              <span className="font-semibold text-zinc-800">{selectedEquipment.serialNumber || 'N/A'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Last Inspected</span>
              <span className="font-semibold text-zinc-800">{selectedEquipment.lastInspected}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-400 block text-[10.5px]">Next Due Date</span>
              <span className="font-semibold text-[#e01f1a]">{selectedEquipment.nextDue}</span>
            </div>
          </div>

          {selectedEquipment.notes && (
            <div className="pt-2 text-xs text-zinc-600 bg-zinc-50/70 p-3 rounded-xl border border-zinc-200/70">
              <span className="font-bold text-zinc-700 block mb-1">Inspector Notes:</span>
              {selectedEquipment.notes}
            </div>
          )}
        </div>

        {/* Inspection History */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Inspection History
            </h3>
            <span className="text-[11px] text-zinc-400 font-medium">Compliance Log</span>
          </div>

          <div className="space-y-2.5">
            {selectedEquipment.inspectionHistory && selectedEquipment.inspectionHistory.length > 0 ? (
              selectedEquipment.inspectionHistory.map((hist, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-zinc-200/70 bg-zinc-50/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-800">{hist.type}</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                        hist.result.includes('Pass')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {hist.result}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 flex items-center justify-between">
                    <span>By {hist.inspector}</span>
                    <span>{hist.date}</span>
                  </div>
                  <p className="text-xs text-zinc-600 pt-0.5">{hist.notes}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400 py-2">No prior inspection records recorded.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 space-y-3 px-4 pt-3">
      {/* Search Bar matching Image 2 */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search asset, ID, model, serial..."
          className="w-full bg-white border border-zinc-200/90 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#e01f1a] focus:ring-1 focus:ring-[#e01f1a] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Building Filter Tabs (Requirement 1: Organize equipment by building or location) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setSelectedBuildingId('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedBuildingId === 'all'
              ? 'bg-zinc-900 text-white'
              : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-50'
          }`}
        >
          All Locations
        </button>
        {BUILDINGS.map((bld) => (
          <button
            key={bld.id}
            onClick={() => setSelectedBuildingId(bld.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedBuildingId === bld.id
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{bld.code}: {bld.hoistRange}</span>
          </button>
        ))}
      </div>

      {/* Category Pills matching Image 2 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-zinc-900 text-white font-semibold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count & Helper info matching Image 2 */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-500 font-medium pt-1">
        <span>{filteredEquipment.length} Assets Found</span>
        <span>Tap card for details</span>
      </div>

      {/* Equipment List Cards matching Image 2 */}
      <div className="space-y-3">
        {filteredEquipment.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEquipment(item)}
            className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer active:scale-[0.99]"
          >
            {/* Top row: Asset Tag + Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-zinc-100 text-zinc-700">
                {item.assetTag}
              </span>
              <div>{getStatusBadge(item.status)}</div>
            </div>

            {/* Title & Location with Right Chevron */}
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-2">
                <h3 className="font-bold text-sm text-zinc-900 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{item.location}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
            </div>

            {/* Bottom Row: Dates */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
              <span>Last: {item.lastInspected}</span>
              <span className="font-semibold text-zinc-700">Next due: {item.nextDue}</span>
            </div>
          </div>
        ))}

        {filteredEquipment.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-zinc-200">
            <AlertTriangle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <h4 className="font-bold text-zinc-800 text-sm">No equipment found</h4>
            <p className="text-xs text-zinc-500 mt-1">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
