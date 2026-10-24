# Stephenson Equipment — Mobile Inspection Management App

Mobile-first inspection management web application for **Stephenson Equipment**, built for field operators, technicians, and compliance personnel in Winnipeg and Regina.

## Key Features

- **Mobile-Responsive Architecture**: Native iOS-style UI with locked viewport (`100dvh`), permanently pinned top bar, permanently pinned bottom navigation bar, and fluid momentum-scrolling main content.
- **Equipment & Hoist Management**:
  - Organized by facility (Building 1 — Main Service & Commercial Bays, Building 2 — Fleet Alignment, Building 3 — Wash & Industrial Systems).
  - Individually numbered hoists (Hoist 01 through Hoist 40) with real-time status indicators (*Operational, Due for Inspection, Draft in Progress, Attention, Pending*).
  - Detailed asset specifications and historical compliance inspection records.
- **Inspection Checklist & Mandatory Photo Evidence**:
  - Standardized inspection templates: *Equipment Inspection* (ALI/ANSI), *Safety Inspection* (OSHA), and *Vehicle Inspection* (CVOR/DOT).
  - Pass / Fail / N/A 3-way toggle controls.
  - **Mandatory Photo Validation**: Submissions are strictly validated to require photographic evidence for all failure findings.
- **Save, Switch & Resume Inspections**:
  - Inspectors can save drafts mid-inspection, switch between hoists (e.g. Hoist 01 to Hoist 08), and resume from the exact last saved item.
- **Defects & Corrective Actions**:
  - Severity tracking (*Critical, Moderate, Low*) and status filters (*All, Open, In Progress, Resolved*).
  - Interactive issue detail view with photo evidence, status updating, technician reassignment, and corrective action audit log.
- **Maintenance Scheduling**: Upcoming preventative service, annual ALI/ANSI certifications, and cable tension verification.
- **Reports & Document Management**: Inspection certificates, office delivery status tracking, and simulated export to PDF and Word.
- **Slide-out Sidebar Drawer**: Stephenson vector branding, user profile, facility switcher, and quick navigation.

## Technology Stack

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```
