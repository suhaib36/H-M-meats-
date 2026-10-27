# H&M Catering Order Manager

A modern, professional frontend-only web application prototype designed for **H&M Meats & Catering** ([hmmeats.com](https://www.hmmeats.com)), a celebrated custom meat shop, BBQ smokehouse, and premier catering business based in **Nampa, Idaho** (Est. 1963).

---

## 1. Project Objective & Context

This prototype demonstrates how **H&M Meats & Catering** can modernize and streamline its catering sales workflow—consolidating incoming inquiries, menu selections, quotation drafting, and confirmed kitchen orders in one unified system.

> **Note:** This is a dedicated business application prototype for the sales and kitchen catering team, **not** a redesign of the public marketing website.

### Company Profile
* **Business:** H&M Meats and Catering LLC
* **Location:** 215 14th Ave S, Nampa, ID 83651
* **Service Area:** Nampa, Caldwell, Boise, Meridian, and the greater Treasure Valley
* **Specialties:** Slow-smoked beef brisket, Berkshire pulled pork, tri-tip, scratch-made sides, grazing tables, and on-site whole hog luaus
* **Contact:** (208) 467-0999 | info@hmmeats.com | [hmmeats.com](https://www.hmmeats.com)

---

## 2. Main Application Modules

1. **Dashboard Overview**
   * Key operational metric cards:
     * *New Catering Requests* (with pending review badge)
     * *Quotes Awaiting Response* (with potential pipeline revenue)
     * *Confirmed Upcoming Events* (with scheduled queue status)
     * *Events This Month* (with total booked revenue)
   * **Recent Requests Table** with customer name, event type, date, guest count, estimated value, and status actions.
   * **Upcoming Events Feed** showing event time, location, guest count, and kitchen preparation stages.
   * **Follow-up Reminders Panel** detailing inquiries awaiting quotes, quotes awaiting client responses, and overnight smoker shifts.
   * **Quick 100-Guest Demo Scenario Banner** for instant sales presentations.

2. **Catering Requests Pipeline**
   * Multi-criteria search (name, email, phone, venue)
   * Status filter chips: `All`, `New`, `Reviewing`, `Quote Sent`, `Confirmed`, `Declined`
   * Event type filter: `Wedding`, `Corporate Event`, `Private Party`, `Other`
   * Sorters: Newest inquiries, event date (soonest), guest count (high to low), budget (high to low)
   * Toggle between structured **Table View** and **Detailed Cards View**
   * Prominent **+ New Catering Request** button with comprehensive intake form

3. **Request Details & Quotation Builder**
   * Customer and contact details (editable)
   * Event specifications: venue address, date, service window, guest count
   * Live **Menu Selection & Cost Estimator**:
     * Add smoked meats, sides, desserts, and packages directly from the catalog
     * Portion steppers and quantity adjustments
     * Auto-calculated food subtotal
     * Delivery, chafers & setup fee controls
     * On-site pitmaster carving & staffing fee controls
     * Idaho State Sales Tax calculation (defaults to 6.0%, editable)
     * Live grand estimate total
   * Special dietary requirements & allergen notes (e.g., gluten-free, dairy-free)
   * Event logistics, smoker arrival timeline, and internal team notes
   * One-click actions:
     * **Quotation Preview:** Generates a formal, printable catering proposal with H&M branding, itemized table, and booking terms
     * **Send Quote:** Transitions request to `Quote Sent` status
     * **Mark as Confirmed:** Automatically creates an active order in the kitchen prep queue
     * **Decline Request:** Confirmation-gated cancellation

4. **Confirmed Orders & Kitchen Preparation Queue**
   * Order tracker displaying: Order # (`ORD-2026-xxx`), customer name, event date, guest count, order value, prep stage, and payment status
   * Kitchen preparation stages: `Not Started`, `In Preparation`, `Ready`, `Completed`
   * Payment status tracker: `Unpaid`, `Deposit Received`, `Paid`
   * Order detail drawer with packing slip, ingredient requirements, and interactive **Kitchen & Smoker Prep Checklist**
   * Clean printable kitchen prep sheet (`@media print`)

5. **Event Schedule & Calendar**
   * Interactive monthly calendar grid with month navigation and **Today** shortcut
   * Visual distinction between **Tentative Inquiries** (amber dashed outline) and **Confirmed Orders** (solid crimson/green badges)
   * Clickable events with detail popover modal
   * Toggle between **Month Grid** and **Agenda List** views

6. **Menu Catalog & Catering Packages**
   * Categorized catalog: *BBQ Meats*, *Side Dishes*, *Desserts*, *Catering Packages*
   * Real published menu items from H&M Meats (Smoked Brisket, Pulled Pork, Tri-Tip, Mac 'n Cheese, Cowboy Beans, Cast-Iron Cornbread, Peach Cobbler, Street Taco Bar, Whole Pig Luau)
   * Active/Inactive availability toggles
   * Add new custom catering items
   * Edit item prices, units, and descriptions

---

## 3. The 100-Guest BBQ Sales Demonstration Scenario

To showcase how intuitive the system is during a live demonstration, the prototype includes a built-in interactive walkthrough accessible via the **"100-Guest Demo Scenario"** button in the header and sidebar.

### Scenario Details:
* **Customer:** Marcus Miller (*Miller Family 50th Reunion*)
* **Event:** Private Party for **100 Guests** on November 7, 2026
* **Location:** *Still Water Hollow*, 18120 Dean Ln, Nampa, ID
* **Menu Preferences:** Smoked Beef Brisket, Applewood Pulled Pork, Smokehouse Mac 'n Cheese, Cowboy BBQ Beans, and Fresh Skillet Cornbread

### 7-Step Demonstration Flow:
1. **Open Incoming Request:** Click on `REQ-2026-042` from the dashboard or requests table.
2. **Review Specifications:** Note the 100 guests, 2-hour smoker arrival lead time, and gluten-free accommodations.
3. **Select Menu Items & Quantities:** Verify the auto-scaled 100-serving portions.
4. **Prepare Quotation:** Review the automatic subtotal, delivery, staffing, and 6% Idaho sales tax. Open the clean printable proposal.
5. **Update to 'Quote Sent':** Mark the quote as sent to client.
6. **Mark Request Confirmed:** Click "Mark as Confirmed" to convert into Order `ORD-2026-104`.
7. **Verify Event:** Find the confirmed event immediately active on both the **Orders** page and the **Calendar**.

---

## 4. Technical Architecture

* **Frontend Framework:** React 19 + Vite 6
* **Icons:** Lucide React
* **Styling:** Custom CSS design system with CSS custom properties (`--hm-primary: #8F1D1D`, `--hm-amber: #D97706`, `--hm-charcoal: #1C1917`), responsive breakpoints, and print stylesheets
* **Data Layer:** Pure client-side state with `localStorage` persistence and a **"Reset Data"** button to restore clean sample data anytime
* **Zero Backend Requirements:** Fully self-contained prototype suitable for offline pitching, static hosting, or demo presentation

---

## 5. Development & Build

### Running Locally

```bash
# Start Vite development server
npm run dev
```

### Production Build

```bash
# Compile optimized production bundle
npm run build

# Preview production build
npm run preview
```
