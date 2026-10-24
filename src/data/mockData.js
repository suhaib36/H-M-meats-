// Stephenson Equipment Mock Dataset & Configuration
export const BRANCHES = [
  { id: 'winnipeg', name: 'Winnipeg Branch', address: 'Unit B 21 Murray Park Road', phone: '204-831-9633' },
  { id: 'regina', name: 'Regina Branch', address: '450 Henderson Drive', phone: '306-757-1776' }
];

export const CURRENT_USER = {
  name: 'Marcus Vance',
  role: 'Lead Field Inspector / Tech',
  techId: 'SE-8842',
  branch: 'Winnipeg Branch',
  shift: 'Shift Active (07:00 - 15:30)',
  certifications: [
    'ALI Certified Lift Inspector (#ALI-9924)',
    'CVOR / Commercial Vehicle Safety Inspector',
    'Industrial Hydraulics Level 3'
  ],
  email: 'm.vance@stephensonequipment.ca',
  phone: '204-555-0192',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
};

export const BUILDINGS = [
  {
    id: 'bld-1',
    name: 'Building 1 — Main Service & Commercial Bays',
    code: 'BLD-01',
    description: 'Primary inspection & servicing bays housing heavy commercial vehicle hoists 01 through 20.',
    hoistCount: 20,
    hoistRange: 'Hoist 01 - Hoist 20',
    address: 'Bay Complex North, Murray Park',
    inspectedCount: 14,
    pendingCount: 4,
    inProgressCount: 2
  },
  {
    id: 'bld-2',
    name: 'Building 2 — Fleet Alignment & Heavy Maintenance',
    code: 'BLD-02',
    description: 'High-clearance alignment racks & tandem column lifts housing hoists 21 through 40.',
    hoistCount: 20,
    hoistRange: 'Hoist 21 - Hoist 40',
    address: 'Bay Complex South, Murray Park',
    inspectedCount: 11,
    pendingCount: 7,
    inProgressCount: 2
  },
  {
    id: 'bld-3',
    name: 'Building 3 — Wash & Industrial Systems',
    code: 'BLD-03',
    description: 'Specialized compressor rooms, high-pressure wash skids, and hydraulic testing rigs.',
    hoistCount: 0,
    hoistRange: 'Compressors & Skids',
    address: 'Ancillary Plant East',
    inspectedCount: 3,
    pendingCount: 1,
    inProgressCount: 0
  }
];

// Generate Hoists 01 through 40 realistically
const generateHoists = () => {
  const hoists = [];
  const liftModels = [
    { name: 'Rotary SPOA10 2-Post Symmetric Lift', cap: '10,000 lbs (4,536 kg)', mfg: 'Rotary Lift', model: 'SPOA10-TA-TRIO' },
    { name: 'Forward Lift 14,000 lb 4-Post Alignment Hoist', cap: '14,000 lbs (6,350 kg)', mfg: 'Forward Lift', model: 'CR14-L2' },
    { name: 'Challenger CL10V3 Heavy 2-Post Lift', cap: '10,000 lbs (4,536 kg)', mfg: 'Challenger Lifts', model: 'CL10-V3' },
    { name: 'BendPak HDS-14X Extended Commercial 4-Post', cap: '14,000 lbs (6,350 kg)', mfg: 'BendPak Corp', model: 'HDS-14X' },
    { name: 'Stertil-Koni Heavy Duty 2-Post Electro-Hydraulic', cap: '16,000 lbs (7,250 kg)', mfg: 'Stertil-Koni', model: 'SK-2016' }
  ];

  for (let i = 1; i <= 40; i++) {
    const numStr = i < 10 ? `0${i}` : `${i}`;
    const bldId = i <= 20 ? 'bld-1' : 'bld-2';
    const bldName = i <= 20 ? 'Building 1' : 'Building 2';
    const modelInfo = liftModels[(i - 1) % liftModels.length];

    // Distribute realistic statuses: Inspected, In Progress, Pending, Due for Inspection, Attention
    let status = 'Inspected';
    let lastInspected = '2026-09-28';
    let nextDue = '2026-10-28';

    if (i === 1) {
      status = 'In Progress';
      lastInspected = '2026-09-12';
      nextDue = '2026-10-14';
    } else if (i === 4) {
      status = 'Due for Inspection';
      lastInspected = '2026-09-10';
      nextDue = '2026-10-12';
    } else if (i === 8) {
      status = 'In Progress';
      lastInspected = '2026-09-14';
      nextDue = '2026-10-14';
    } else if (i === 12) {
      status = 'Attention';
      lastInspected = '2026-09-18';
      nextDue = '2026-10-18';
    } else if (i === 16 || i === 23 || i === 29 || i === 35) {
      status = 'Pending';
      lastInspected = '2026-09-20';
      nextDue = '2026-10-20';
    } else if (i === 24) {
      status = 'In Progress';
      lastInspected = '2026-09-15';
      nextDue = '2026-10-15';
    }

    hoists.push({
      id: `SE-HST-${numStr}`,
      assetTag: `SE-HST-${i < 10 ? '0' : ''}${i + 200}`,
      number: `Hoist ${numStr}`,
      hoistNum: numStr,
      name: `${modelInfo.name} — Hoist ${numStr}`,
      baseName: modelInfo.name,
      buildingId: bldId,
      buildingName: bldName,
      location: `${bldName} — Bay ${numStr}`,
      bay: `Bay ${numStr}`,
      category: 'Hoists & Lifts',
      capacity: modelInfo.cap,
      manufacturer: modelInfo.mfg,
      model: modelInfo.model,
      serialNumber: `SE-${modelInfo.mfg.substring(0, 3).toUpperCase()}-2024-${8800 + i}`,
      status,
      lastInspected,
      nextDue,
      inspector: 'Marcus Vance',
      operatingHours: `${1200 + i * 18} cycles`,
      notes: `Standard commercial bay hoist in ${bldName}. Periodic cable tension and hydraulic ram checks required.`,
      inspectionHistory: [
        {
          date: '2026-09-28',
          type: 'ALI/ANSI Periodic Inspection',
          result: 'Passed',
          inspector: 'Marcus Vance',
          notes: 'Full capacity load test verified. Arm restraints and safety locks operating correctly.'
        },
        {
          date: '2026-06-15',
          type: 'Quarterly Safety Audit',
          result: 'Passed with Advisory',
          inspector: 'Dave Miller',
          notes: 'Slight equalizer cable slack detected. Retorqued to 45 ft-lbs OEM specification.'
        }
      ]
    });
  }
  return hoists;
};

export const NUMBERED_HOISTS = generateHoists();

export const ANCILLARY_EQUIPMENT = [
  {
    id: 'EQ-002',
    assetTag: 'SE-CMP-018',
    number: 'Compressor 01',
    name: 'DV Systems 15HP Heavy Rotary Screw Compressor',
    baseName: 'DV Systems 15HP Heavy Rotary Screw Compressor',
    buildingId: 'bld-3',
    buildingName: 'Building 3',
    category: 'Air Compressors',
    manufacturer: 'DV Systems',
    model: 'B15-175-TD',
    serialNumber: 'DVS-2023-44102',
    location: 'Building 3 — Compressor Enclosure Room B',
    bay: 'Room B',
    status: 'Operational',
    lastInspected: '2026-10-02',
    inspector: 'Dave Miller',
    nextDue: '2026-11-02',
    operatingHours: '4,880 hrs',
    capacity: '58.5 CFM @ 150 PSI',
    notes: 'Main shop compressed air feed supplying all pneumatic tool circuits and lift pneumatic locks.',
    inspectionHistory: [
      { date: '2026-10-02', type: 'Pressure Vessel Inspection', result: 'Passed', inspector: 'Dave Miller', notes: 'Tank safety relief valve tested. Pressure switch cut-in/out normal.' }
    ]
  },
  {
    id: 'EQ-004',
    assetTag: 'SE-ALN-007',
    number: 'Alignment 01',
    name: 'Hunter Hawkeye Elite Optical Alignment System',
    baseName: 'Hunter Hawkeye Elite Optical Alignment System',
    buildingId: 'bld-2',
    buildingName: 'Building 2',
    category: 'Alignment & Wheel',
    manufacturer: 'Hunter Engineering',
    model: 'HE421-LZ-PREM',
    serialNumber: 'HNT-2021-9921',
    location: 'Building 2 — Bay 21 Tech Console',
    bay: 'Bay 21',
    status: 'Operational',
    lastInspected: '2026-10-08',
    inspector: 'Marcus Vance',
    nextDue: '2026-11-08',
    operatingHours: 'Calibration Active',
    capacity: 'Heavy Bus & Light Duty',
    notes: 'Target cameras calibrated. Integrated with Stephenson central fleet alignment database.',
    inspectionHistory: [
      { date: '2026-10-08', type: 'Optical Calibration Check', result: 'Passed', inspector: 'Marcus Vance', notes: 'ISO test bar zero verified.' }
    ]
  },
  {
    id: 'EQ-005',
    assetTag: 'SE-FLT-102',
    number: 'Service Truck 01',
    name: 'Ford F-550 Stephenson Mobile Service Truck',
    baseName: 'Ford F-550 Stephenson Mobile Service Truck',
    buildingId: 'bld-2',
    buildingName: 'Building 2',
    category: 'Fleet & Vehicles',
    manufacturer: 'Ford Commercial / Stephenson Fleet',
    model: 'F-550 Super Duty 4x4 Crew Cab',
    serialNumber: '1FDOW5HT8NEB91230',
    location: 'Winnipeg Fleet Yard — Stall 12',
    bay: 'Stall 12',
    status: 'Operational',
    lastInspected: '2026-10-05',
    inspector: 'Ken Kowalski',
    nextDue: '2026-10-19',
    operatingHours: '94,200 km',
    capacity: '19,500 lbs GVWR',
    notes: 'Equipped with 6,000 lb hydraulic crane boom, compressor, and mobile oil dispensing system.',
    inspectionHistory: [
      { date: '2026-10-05', type: 'CVOR Commercial Vehicle Inspection', result: 'Passed', inspector: 'Ken Kowalski', notes: 'Brake stroke inspection passed.' }
    ]
  },
  {
    id: 'EQ-006',
    assetTag: 'SE-ENG-031',
    number: 'Pressure Wash 02',
    name: 'Honda GX390 Heavy Commercial Industrial Engine Skid',
    baseName: 'Honda GX390 Heavy Commercial Industrial Engine Skid',
    buildingId: 'bld-3',
    buildingName: 'Building 3',
    category: 'Pressure Washers',
    manufacturer: 'Honda Power Products / Stephenson Wash Rig',
    model: 'GX390-QXB9-Hotsy',
    serialNumber: 'GCAKT-4419208',
    location: 'Building 3 — Pressure Wash Skid 2',
    bay: 'Skid Bay 2',
    status: 'Attention',
    lastInspected: '2026-09-30',
    inspector: 'Ken Kowalski',
    nextDue: '2026-10-13',
    operatingHours: '340 hrs',
    capacity: '3,800 PSI @ 4.0 GPM',
    notes: 'Hot water burner unit. Emergency stop button mechanical sticky behavior observed.',
    inspectionHistory: [
      { date: '2026-09-30', type: 'Safety Interlock Inspection', result: 'Advisory', inspector: 'Ken Kowalski', notes: 'Emergency stop circuit mushroom button sticky.' }
    ]
  }
];

export const ALL_EQUIPMENT = [...NUMBERED_HOISTS, ...ANCILLARY_EQUIPMENT];

// Active Drafts (Save, Switch & Resume feature)
export const INITIAL_DRAFTS = [
  {
    id: 'draft-001',
    hoistId: 'SE-HST-01',
    hoistNumber: 'Hoist 01',
    assetTag: 'SE-HST-201',
    equipmentName: 'Rotary SPOA10 2-Post Symmetric Lift — Hoist 01',
    buildingId: 'bld-1',
    buildingName: 'Building 1 — Main Service & Commercial Bays',
    category: 'Equipment Inspection',
    type: 'Equipment Inspection',
    progress: 58,
    completedItems: 7,
    totalItems: 12,
    lastSaved: '15 min ago',
    savedTimestamp: '2026-10-24 16:45',
    checklistState: {
      'eq-1': { status: 'pass', note: 'Posts clean, concrete anchor torques verified.' },
      'eq-2': { status: 'pass', note: 'Rubber lift pads in good condition.' },
      'eq-3': { status: 'pass', note: 'Manual lock release operating smoothly.' },
      'eq-4': { status: 'fail', note: 'Minor hydraulic weeping around cylinder #1 wiper seal.', photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
      'eq-5': { status: 'pass', note: 'Equalizer cables aligned.' },
      'eq-6': { status: 'pass', note: 'Limit switch cut-out working.' },
      'eq-7': { status: 'pass', note: 'Pushbutton control box clean.' }
    }
  },
  {
    id: 'draft-002',
    hoistId: 'SE-HST-08',
    hoistNumber: 'Hoist 08',
    assetTag: 'SE-HST-208',
    equipmentName: 'BendPak HDS-14X Extended Commercial 4-Post — Hoist 08',
    buildingId: 'bld-1',
    buildingName: 'Building 1 — Main Service & Commercial Bays',
    category: 'Equipment Inspection',
    type: 'Equipment Inspection',
    progress: 33,
    completedItems: 4,
    totalItems: 12,
    lastSaved: '45 min ago',
    savedTimestamp: '2026-10-24 16:15',
    checklistState: {
      'eq-1': { status: 'pass', note: 'Runways clear and level.' },
      'eq-2': { status: 'pass', note: 'Drive-on ramps secure.' },
      'eq-3': { status: 'pass', note: 'Cable slack safety switches responsive.' },
      'eq-4': { status: 'na', note: 'Auxiliary rolling jack not installed on this unit.' }
    }
  },
  {
    id: 'draft-003',
    hoistId: 'SE-HST-24',
    hoistNumber: 'Hoist 24',
    assetTag: 'SE-HST-224',
    equipmentName: 'Forward Lift 14,000 lb 4-Post Alignment Hoist — Hoist 24',
    buildingId: 'bld-2',
    buildingName: 'Building 2 — Fleet Alignment & Heavy Maintenance',
    category: 'Safety Inspection',
    type: 'Safety Inspection',
    progress: 40,
    completedItems: 4,
    totalItems: 10,
    lastSaved: '2 hours ago',
    savedTimestamp: '2026-10-24 14:30',
    checklistState: {
      'sf-1': { status: 'pass', note: 'Fire extinguisher inspected.' },
      'sf-2': { status: 'pass', note: 'Yellow floor hazard stripes visible.' },
      'sf-3': { status: 'pass', note: 'Lockout/tagout padlock present.' },
      'sf-4': { status: 'pass', note: 'Emergency lighting batteries functional.' }
    }
  }
];

export const INITIAL_ISSUES = [
  {
    id: 'ISS-104',
    title: 'Hydraulic Cylinder Weeping on Post 2',
    assetId: 'SE-HST-12',
    assetName: 'Forward Lift 14,000 lb 4-Post Alignment Hoist — Hoist 12',
    assetTag: 'SE-HST-412',
    buildingName: 'Building 1 — Bay 12',
    severity: 'Critical',
    status: 'Open',
    reportedDate: '2026-10-09',
    dueDate: '2026-10-14',
    assignedTo: 'Dave Miller (Lead Tech)',
    description: 'Noticeable fluid weeping observed around the wiper seal of cylinder #2 during loaded descent test. Minor pressure drop recorded under 10k lbs test load.',
    location: 'Winnipeg — Bay 12',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    correctiveActions: [
      { id: 'CA-1', timestamp: '2026-10-09 14:20', author: 'Marcus Vance', text: 'Initial defect identified during hoist weekly cycle check. Tagged lock-out notice.' },
      { id: 'CA-2', timestamp: '2026-10-10 09:15', author: 'Dave Miller', text: 'OEM seal kit (P/N 992-041) ordered from Stephenson Parts warehouse. Delivery expected Tuesday.' }
    ]
  },
  {
    id: 'ISS-103',
    title: 'Emergency Stop Button Sticking',
    assetId: 'EQ-006',
    assetName: 'Honda GX390 Heavy Commercial Industrial Engine Skid',
    assetTag: 'SE-ENG-031',
    buildingName: 'Building 3 — Skid Bay 2',
    severity: 'Critical',
    status: 'Open',
    reportedDate: '2026-10-10',
    dueDate: '2026-10-13',
    assignedTo: 'Ken Kowalski',
    description: 'Emergency stop circuit mushroom button failed to release freely when twisted. Switch contacts require contact cleaner and mechanical spring replacement.',
    location: 'Winnipeg — Pressure Wash Skid 2',
    photoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    correctiveActions: [
      { id: 'CA-1', timestamp: '2026-10-10 11:00', author: 'Ken Kowalski', text: 'Unit placed on temporary standby tag. Spares requisition SE-PO-491 submitted.' }
    ]
  },
  {
    id: 'ISS-102',
    title: 'Equalizer Cable Slack Unbalanced by 6mm',
    assetId: 'SE-HST-04',
    assetName: 'Rotary SPOA10 2-Post Symmetric Lift — Hoist 04',
    assetTag: 'SE-HST-204',
    buildingName: 'Building 1 — Bay 04',
    severity: 'Moderate',
    status: 'In Progress',
    reportedDate: '2026-10-11',
    dueDate: '2026-10-16',
    assignedTo: 'Dave Miller (Lead Tech)',
    description: 'Left-to-right carriage latch engagement variance of 6mm noted during unladen ascent. Lock pawls do not click synchronously at tier 3.',
    location: 'Winnipeg — Bay 04',
    photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    correctiveActions: [
      { id: 'CA-1', timestamp: '2026-10-11 16:40', author: 'Marcus Vance', text: 'Slack documented during bi-weekly fleet check.' },
      { id: 'CA-2', timestamp: '2026-10-12 08:30', author: 'Dave Miller', text: 'Tension locknuts adjusted. Re-measurement scheduled for post-shift test.' }
    ]
  },
  {
    id: 'ISS-101',
    title: 'Air Intake Filter Differential High (25 mbar)',
    assetId: 'EQ-002',
    assetName: 'DV Systems 15HP Heavy Rotary Screw Compressor',
    assetTag: 'SE-CMP-018',
    buildingName: 'Building 3 — Room B',
    severity: 'Low',
    status: 'Resolved',
    reportedDate: '2026-09-29',
    dueDate: '2026-10-01',
    assignedTo: 'Marcus Vance',
    description: 'Pressure differential indicator on screw compressor intake canister turned red indicating particulate accumulation.',
    location: 'Winnipeg — Compressor Enclosure Room B',
    photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    correctiveActions: [
      { id: 'CA-1', timestamp: '2026-09-30 10:15', author: 'Marcus Vance', text: 'Replaced element with OEM Mann-Filter C1140. Differential gauge reset to 4 mbar nominal.' }
    ]
  }
];

export const INITIAL_MAINTENANCE = [
  {
    id: 'MAINT-01',
    title: 'Annual ALI/ANSI Hoist Certification',
    assetId: 'SE-HST-25',
    assetName: 'Rotary SM30 Heavy Commercial 4-Post Hoist — Hoist 25',
    assetTag: 'SE-HST-601',
    type: 'Hoist Certification',
    scheduledDate: '2026-10-15',
    status: 'Scheduled',
    assignedTo: 'Marcus Vance (ALI Certified)',
    location: 'Winnipeg — Bay 25',
    frequency: 'Annual',
    description: 'Comprehensive ALI/ANSI certified structural, hydraulic, and electrical compliance inspection.'
  },
  {
    id: 'MAINT-02',
    title: 'Compressor Oil & Synthetic Separator Flush',
    assetId: 'EQ-002',
    assetName: 'DV Systems 15HP Heavy Rotary Screw Compressor',
    assetTag: 'SE-CMP-018',
    type: 'Preventative Service',
    scheduledDate: '2026-10-18',
    status: 'Scheduled',
    assignedTo: 'Dave Miller',
    location: 'Winnipeg — Compressor Room B',
    frequency: '2,000 Operating Hours',
    description: 'Drain synthetic lubricant, install new spin-on oil filter and air-oil separator canister.'
  },
  {
    id: 'MAINT-03',
    title: 'Quarterly Cable Tension & Sheave Verification',
    assetId: 'bld-1',
    assetName: 'Building 1 Hoists 01 through 10',
    assetTag: 'SE-HST-B1-GROUP',
    type: 'Cable Calibration',
    scheduledDate: '2026-10-22',
    status: 'Pending Tech Assignment',
    assignedTo: 'Unassigned',
    location: 'Building 1 — Service Bays 01-10',
    frequency: 'Quarterly',
    description: 'Verify equalization cable wire ropes for kinks, fatigue wire breaks, and sheave bearing runout.'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'REP-2026-1041',
    title: 'Equipment Inspection Certificate — Hoist 04',
    type: 'Equipment Inspection',
    assetId: 'SE-HST-04',
    assetName: 'Rotary SPOA10 2-Post Symmetric Lift — Hoist 04',
    assetTag: 'SE-HST-204',
    buildingName: 'Building 1 — Bay 04',
    date: '2026-10-08',
    inspector: 'Marcus Vance',
    branch: 'Winnipeg Branch',
    status: 'Delivered',
    result: 'Passed with Advisory',
    recipients: 'Winnipeg Operations Desk (ops@stephensonequipment.ca), Dave Miller (Lead Tech)',
    deliveryStatus: 'Sent & Archived',
    deliveredAt: '2026-10-08 17:15',
    itemsCount: 12,
    passCount: 11,
    failCount: 1,
    photoCount: 1,
    summary: 'ALI certified inspection completed. Minor equalizer cable variance noted and ticketed in Defects.'
  },
  {
    id: 'REP-2026-1038',
    title: 'Annual Facility Lift Safety Audit — Building 1',
    type: 'Facility Compliance Audit',
    assetId: 'bld-1',
    assetName: 'Building 1 Service Bays (Hoists 01-20)',
    assetTag: 'SE-FAC-BLD1',
    buildingName: 'Building 1',
    date: '2026-10-01',
    inspector: 'Marcus Vance & Dave Miller',
    branch: 'Winnipeg Branch',
    status: 'Delivered',
    result: 'Passed (98.4%)',
    recipients: 'Stephenson Compliance Board, Manitoba Workplace Safety',
    deliveryStatus: 'Signed & Certified',
    deliveredAt: '2026-10-02 08:30',
    itemsCount: 48,
    passCount: 47,
    failCount: 1,
    photoCount: 4,
    summary: 'Full multi-hoist annual compliance audit for hoists 01 through 20.'
  },
  {
    id: 'REP-2026-1025',
    title: 'Fleet Service Vehicle Pre-Trip — Ford F-550',
    type: 'Vehicle Inspection',
    assetId: 'EQ-005',
    assetName: 'Ford F-550 Stephenson Mobile Service Truck',
    assetTag: 'SE-FLT-102',
    buildingName: 'Fleet Yard Stall 12',
    date: '2026-09-24',
    inspector: 'Ken Kowalski',
    branch: 'Winnipeg Branch',
    status: 'Delivered',
    result: 'Passed',
    recipients: 'Fleet Safety Manager (fleet@stephensonequipment.ca)',
    deliveryStatus: 'Sent & Verified',
    deliveredAt: '2026-09-24 07:15',
    itemsCount: 18,
    passCount: 18,
    failCount: 0,
    photoCount: 0,
    summary: 'CVOR commercial vehicle pre-trip circle check passed. Tires, brakes, and crane cert verified.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    title: 'Mandatory Inspection Overdue',
    message: 'Rotary SPOA10 (#SE-HST-204, Hoist 04) 30-day interval elapsed. Complete checklist prior to shift end.',
    timestamp: '25 min ago',
    read: false,
    type: 'urgent',
    targetTab: 'equipment',
    targetId: 'SE-HST-04'
  },
  {
    id: 'NOTIF-02',
    title: 'Critical Defect Assigned',
    message: 'Hydraulic Cylinder Weeping on Post 2 (#SE-HST-412) assigned to Lead Tech. Lock-out tag confirmed.',
    timestamp: '2 hours ago',
    read: false,
    type: 'critical',
    targetTab: 'issues',
    targetId: 'ISS-104'
  },
  {
    id: 'NOTIF-03',
    title: 'Maintenance Due Soon',
    message: 'Annual ALI/ANSI Certification for Hoist 25 (#SE-HST-601) scheduled for Oct 15.',
    timestamp: '5 hours ago',
    read: true,
    type: 'info',
    targetTab: 'more',
    targetId: 'maintenance'
  },
  {
    id: 'NOTIF-04',
    title: 'Draft Saved Successfully',
    message: 'Inspection draft for Hoist 01 in Building 1 saved at 58% completion. Ready to resume.',
    timestamp: '15 min ago',
    read: false,
    type: 'success',
    targetTab: 'inspect',
    targetId: 'draft-001'
  }
];

// Standard Inspection Checklists by Category
export const CHECKLIST_TEMPLATES = {
  'Equipment Inspection': [
    { id: 'eq-1', section: 'Structural & Anchors', text: 'Columns, crossbeam, overhead structure and base plate floor anchor bolts (torqued to spec, no concrete cracks).' },
    { id: 'eq-2', section: 'Carriages & Lift Arms', text: 'Swing arms, arm restraint locking teeth, adapter pins, rubber lift pads (no tears, cuts or excessive wear).' },
    { id: 'eq-3', section: 'Mechanical Safety Locks', text: 'Locking pawls, latch bars, audible engagement clicks at all lock increments, manual/pneumatic release rods.' },
    { id: 'eq-4', section: 'Hydraulic Cylinders & Fluid', text: 'Hydraulic cylinders, piston rods, wiper seals (no weeping or pooling), hoses, fittings, and reservoir oil level.' },
    { id: 'eq-5', section: 'Equalizer Cables & Sheaves', text: 'Wire rope cables, pulleys/sheaves, balance tension, cotter pins, and slack cable shut-off sensors.' },
    { id: 'eq-6', section: 'Controls & Emergency Stops', text: 'Pushbutton control station, power disconnect switch, motor contactor, and overhead limit shut-off bar.' },
    { id: 'eq-7', section: 'Safety Decals & Signage', text: 'ALI safety placarding, rated capacity warning badges, operator instructions clearly legible.' },
    { id: 'eq-8', section: 'Loaded Descent & Ascent Test', text: 'Smooth raising and lowering under test load with no vibration, chatter, or unusual hydraulic cavitation.' },
    { id: 'eq-9', section: 'Secondary Lock Dog Mechanism', text: 'Secondary backup lock dogs operate freely and prevent uncommanded lowering upon pressure drop.' },
    { id: 'eq-10', section: 'Power Unit & Motor Wiring', text: 'Electric motor 208-230V enclosure ground bonding, wiring conduit, starter solenoid seals.' },
    { id: 'eq-11', section: 'Bay Cleanliness & Clearances', text: 'Minimum 24-inch perimeter aisle clearance around vehicle envelope free of oil spills and trip hazards.' },
    { id: 'eq-12', section: 'Final Inspector Certification', text: 'Overall operational road-readiness stamp and Stephenson ALI certification tagging.' }
  ],
  'Safety Inspection': [
    { id: 'sf-1', section: 'Emergency Protection', text: 'Fire extinguishers inspected, tagged, and pressure needle in green zone; unobstructed access.' },
    { id: 'sf-2', section: 'Walkway & Floor Hazards', text: 'Safety perimeter yellow striping, no oil slicks, dry absorption compound applied where required.' },
    { id: 'sf-3', section: 'Lockout / Tagout Stations', text: 'LOTO safety padlocks, lockout hasps, Danger tags readily accessible at main panel.' },
    { id: 'sf-4', section: 'Emergency Eyewash & First Aid', text: 'Emergency eyewash station inspected, tested, dust covers in place, sterile kit stocked.' },
    { id: 'sf-5', section: 'Overhead Lighting & Exits', text: 'Emergency battery backup lights, lighted exit placards functioning on simulated circuit break.' },
    { id: 'sf-6', section: 'Ventilation & Airflow', text: 'Exhaust extraction hoses and shop bay air turnover ventilation running within CFM limits.' },
    { id: 'sf-7', section: 'Compressed Air Line Regulators', text: 'Drop line pressure regulators, whip-check safety cables on 1/2" air lines.' },
    { id: 'sf-8', section: 'Chemical Storage & WHMIS', text: 'Solvent barrels, degreasers, and waste oil bins labeled with updated GHS/WHMIS symbols.' },
    { id: 'sf-9', section: 'PPE Compliance Check', text: 'CSA-approved safety glasses, steel-toe boots, ear protection stocked for bay operators.' },
    { id: 'sf-10', section: 'Electrical Ground Faults', text: 'GFCI outlets along workbenches tested and verified with circuit tester.' }
  ],
  'Vehicle Inspection': [
    { id: 'vh-1', section: 'Pre-Trip Walkaround', text: 'Fluids (engine oil, coolant, brake fluid, windshield washer), belts, and battery terminals.' },
    { id: 'vh-2', section: 'Lighting & Turn Signals', text: 'Headlights, amber hazard flashers, strobe beacon, brake lights, reverse alarm audible.' },
    { id: 'vh-3', section: 'Braking System & Air Pressure', text: 'Air brake pressure buildup rate, governor cut-out (120-135 PSI), parking brake hold.' },
    { id: 'vh-4', section: 'Tires, Wheels & Lug Nuts', text: 'Tread depth minimum 4/32", wheel rim cracks, lug nut torque witness marks intact.' },
    { id: 'vh-5', section: 'Hydraulic Crane & Boom', text: 'Service crane boom outriggers deployed, lock pins inserted, remote pendant emergency stop.' },
    { id: 'vh-6', section: 'Steering & Suspension', text: 'Steering lash under 2 inches, kingpin play, leaf spring shackles secure.' },
    { id: 'vh-7', section: 'Cargo Securement & Toolboxes', text: 'Side compartments latched, nitrogen bottles chained in upright DOT racks.' },
    { id: 'vh-8', section: 'Cab & Safety Equipment', text: 'Seatbelts, fire extinguisher 5-lb ABC certified, emergency reflective triangles present.' }
  ]
};
