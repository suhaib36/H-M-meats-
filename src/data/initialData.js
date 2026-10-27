// H&M Meats & Catering (hmmeats.com) - Nampa, Idaho
// Founded 1963 • Authentic Meat Market & Premier Treasure Valley Catering

export const BUSINESS_INFO = {
  name: "H&M Meats & Catering",
  legalName: "H&M Meats and Catering LLC",
  tagline: "Custom Meat Shop, Smokehouse & Premier BBQ Catering",
  founded: 1963,
  address: "215 14th Ave S",
  city: "Nampa",
  state: "ID",
  zip: "83651",
  fullAddress: "215 14th Ave S, Nampa, ID 83651",
  phone: "(208) 467-0999",
  email: "info@hmmeats.com",
  cateringEmail: "catering@hmmeats.com",
  website: "https://www.hmmeats.com",
  taxRate: 6.0, // 6% Idaho State Sales Tax (editable)
  leadTimeDays: 5,
  serviceArea: "Nampa, Caldwell, Boise, Meridian & Greater Treasure Valley",
  licenseNumber: "ID-FD-83651-HM"
};

export const INITIAL_MENU_ITEMS = [
  // BBQ Meats
  {
    id: "meat-1",
    name: "Smoked Beef Brisket",
    category: "BBQ Meats",
    price: 16.50,
    unit: "per person",
    description: "14-hour slow-smoked over Idaho oak and hickory. Coarse black pepper & sea salt bark, tender sliced brisket.",
    active: true,
    allergens: ["None"],
    minGuests: 15,
    popular: true
  },
  {
    id: "meat-2",
    name: "Applewood Pulled Pork",
    category: "BBQ Meats",
    price: 11.50,
    unit: "per person",
    description: "Hand-pulled Berkshire pork shoulder slow-smoked for 12 hours with brown sugar and house dry rub.",
    active: true,
    allergens: ["None"],
    minGuests: 15,
    popular: true
  },
  {
    id: "meat-3",
    name: "Smoked Tri-Tip",
    category: "BBQ Meats",
    price: 15.00,
    unit: "per person",
    description: "Signature Treasure Valley seasoned beef tri-tip, hardwood smoked to medium rare perfection and hand-carved.",
    active: true,
    allergens: ["None"],
    minGuests: 20,
    popular: true
  },
  {
    id: "meat-4",
    name: "St. Louis Cut BBQ Ribs",
    category: "BBQ Meats",
    price: 14.50,
    unit: "half rack",
    description: "Meaty ribs seasoned with brown sugar chili rub, apple cider spritz, and house tangy BBQ mop sauce.",
    active: true,
    allergens: ["None"],
    minGuests: 15
  },
  {
    id: "meat-5",
    name: "Smoked Turkey Breast",
    category: "BBQ Meats",
    price: 11.00,
    unit: "per person",
    description: "Tender, juicy turkey breast brined in herbs and smoked over sweet pecan wood. Carved thick.",
    active: true,
    allergens: ["None"],
    minGuests: 15
  },
  {
    id: "meat-6",
    name: "House Jalapeño Cheddar Sausage",
    category: "BBQ Meats",
    price: 8.50,
    unit: "per person",
    description: "Fresh handcrafted butcher links from our in-house meat case, stuffed with sharp cheddar & jalapeños.",
    active: true,
    allergens: ["Dairy"],
    minGuests: 10
  },
  {
    id: "meat-7",
    name: "Smoked Chicken Quarters",
    category: "BBQ Meats",
    price: 9.75,
    unit: "per person",
    description: "Crispy skin, herb-infused smoky chicken legs & thighs glazed with sweet house barbecue sauce.",
    active: true,
    allergens: ["None"],
    minGuests: 15
  },
  {
    id: "meat-8",
    name: "Ancho Pork Belly Burnt Ends",
    category: "BBQ Meats",
    price: 13.50,
    unit: "half lb",
    description: "Tender, bite-sized cubes of smoked pork belly caramelized in honey, butter, and sweet ancho pepper sauce.",
    active: true,
    allergens: ["None"],
    minGuests: 20,
    popular: true
  },

  // Side Dishes
  {
    id: "side-1",
    name: "Smokehouse Mac 'n Cheese",
    category: "Side Dishes",
    price: 4.25,
    unit: "per person",
    description: "Cavatappi pasta folded in four-cheese cream sauce (aged cheddar, gouda, jack) topped with smoked panko crunch.",
    active: true,
    allergens: ["Dairy", "Gluten"],
    minGuests: 10,
    popular: true
  },
  {
    id: "side-2",
    name: "Cowboy BBQ Baked Beans",
    category: "Side Dishes",
    price: 3.50,
    unit: "per person",
    description: "Slow-simmered pinto & navy beans with smoked brisket trimmings, bacon, molasses, and cider vinegar.",
    active: true,
    allergens: ["None"],
    minGuests: 10,
    popular: true
  },
  {
    id: "side-3",
    name: "Fresh Skillet Cornbread",
    category: "Side Dishes",
    price: 2.50,
    unit: "per person",
    description: "Golden honey cornbread baked fresh daily in cast iron skillets. Served with whipped Idaho honey butter.",
    active: true,
    allergens: ["Dairy", "Gluten", "Eggs"],
    minGuests: 10,
    popular: true
  },
  {
    id: "side-4",
    name: "Crisp Creamy Coleslaw",
    category: "Side Dishes",
    price: 2.75,
    unit: "per person",
    description: "Hand-shredded green and purple cabbage with matchstick carrots tossed in our tangy butcher house vinaigrette.",
    active: true,
    allergens: ["Eggs"],
    minGuests: 10
  },
  {
    id: "side-5",
    name: "Country Potato Salad",
    category: "Side Dishes",
    price: 3.25,
    unit: "per person",
    description: "Tender Idaho russet potatoes, chopped hard-boiled eggs, sweet pickles, celery, and creamy Dijon dressing.",
    active: true,
    allergens: ["Eggs"],
    minGuests: 10
  },
  {
    id: "side-6",
    name: "Green Beans & Smoked Bacon",
    category: "Side Dishes",
    price: 3.25,
    unit: "per person",
    description: "Whole green beans simmered with sweet onions, cracked pepper, and thick-cut smoked bacon pieces.",
    active: true,
    allergens: ["None"],
    minGuests: 10
  },
  {
    id: "side-7",
    name: "Dutch Oven Cheesy Potatoes",
    category: "Side Dishes",
    price: 4.00,
    unit: "per person",
    description: "Thinly sliced Idaho potatoes baked with melted cheddar, sour cream, and crispy shallot topping.",
    active: true,
    allergens: ["Dairy"],
    minGuests: 15
  },
  {
    id: "side-8",
    name: "Cilantro Lime Long Grain Rice",
    category: "Side Dishes",
    price: 3.00,
    unit: "per person",
    description: "Steamed fluffy rice flavored with fresh chopped cilantro, lime juice, sea salt, and roasted cumin.",
    active: true,
    allergens: ["None"],
    minGuests: 15
  },

  // Desserts
  {
    id: "dessert-1",
    name: "Warm Idaho Peach Cobbler",
    category: "Desserts",
    price: 4.50,
    unit: "per person",
    description: "Locally sourced Idaho peaches simmered with cinnamon & brown sugar beneath a golden buttery biscuit crust.",
    active: true,
    allergens: ["Dairy", "Gluten"],
    minGuests: 15,
    popular: true
  },
  {
    id: "dessert-2",
    name: "Fudge Brownie Bites",
    category: "Desserts",
    price: 3.50,
    unit: "per person",
    description: "Decadent dark chocolate brownies with smoked sea salt and chocolate ganache drizzle.",
    active: true,
    allergens: ["Dairy", "Gluten", "Eggs"],
    minGuests: 12
  },
  {
    id: "dessert-3",
    name: "Classic Smokehouse Banana Pudding",
    category: "Desserts",
    price: 4.00,
    unit: "per person",
    description: "Layers of real vanilla wafer cookies, fresh sliced bananas, and rich bourbon vanilla custard cream.",
    active: true,
    allergens: ["Dairy", "Gluten", "Eggs"],
    minGuests: 15
  },
  {
    id: "dessert-4",
    name: "Interactive S'mores Bar Experience",
    category: "Desserts",
    price: 5.75,
    unit: "per person",
    description: "Custom tabletop roasting station with honey grahams, jumbo marshmallows, Hershey's, and Reese's cups.",
    active: true,
    allergens: ["Dairy", "Gluten", "Peanuts"],
    minGuests: 25,
    popular: true
  },

  // Catering Packages
  {
    id: "pkg-1",
    name: "The Pitmaster BBQ Buffet",
    category: "Catering Packages",
    price: 23.50,
    unit: "per person",
    description: "Choice of 2 BBQ Meats, 2 Homestyle Sides, Fresh Cornbread w/ Honey Butter, BBQ sauces, slider buns & pickles.",
    active: true,
    allergens: ["Check options"],
    minGuests: 20,
    popular: true
  },
  {
    id: "pkg-2",
    name: "Treasure Valley Grand Feast",
    category: "Catering Packages",
    price: 29.50,
    unit: "per person",
    description: "Choice of 3 Meats (including Brisket & Tri-Tip), 3 Sides, Cornbread, Warm Peach Cobbler, Iced Tea & Lemonade.",
    active: true,
    allergens: ["Check options"],
    minGuests: 30,
    popular: true
  },
  {
    id: "pkg-3",
    name: "Smoked Street Taco Bar",
    category: "Catering Packages",
    price: 21.00,
    unit: "per person",
    description: "Shredded Brisket & Pork Birria, warm corn & flour tortillas, cilantro lime rice, black beans, salsa & queso fresco.",
    active: true,
    allergens: ["Dairy"],
    minGuests: 25
  },
  {
    id: "pkg-4",
    name: "Signature Whole Pig Luau",
    category: "Catering Packages",
    price: 33.00,
    unit: "per person",
    description: "Whole locally raised Idaho pig roasted on-site with sweet chili mop sauce, King's Hawaiian rolls, slaw & beans.",
    active: true,
    allergens: ["Gluten"],
    minGuests: 50
  },
  {
    id: "pkg-5",
    name: "Loaded Idaho Baked Potato Bar",
    category: "Catering Packages",
    price: 17.50,
    unit: "per person",
    description: "Jumbo Idaho baked russets topped with smoked pulled pork, brisket chili, warm cheese sauce, bacon, scallions & sour cream.",
    active: true,
    allergens: ["Dairy"],
    minGuests: 20
  }
];

export const INITIAL_REQUESTS = [
  // --- DEMO SCENARIO REQUEST (100 GUESTS BBQ) ---
  {
    id: "REQ-2026-042",
    customerName: "Marcus Miller",
    organization: "Miller Family 50th Reunion",
    email: "marcus.miller@idahovalley.net",
    phone: "(208) 555-8392",
    eventType: "Private Party",
    eventDate: "2026-11-07",
    preferredTime: "1:00 PM - 3:30 PM",
    guestCount: 100,
    venueAddress: "Still Water Hollow, 18120 Dean Ln, Nampa, ID 83687",
    estimatedBudget: 3200,
    dateReceived: "2026-10-25",
    status: "New", // Primary starting point for demo scenario
    dietaryNotes: "6 guests require gluten-free options (GF buns / separated meats). 2 vegetarian requests for hearty mac & cheese.",
    specialInstructions: "Smoker trailer arrival needed 2 hours prior to service (11:00 AM) at outdoor covered pavilion. Provide full buffet chafing dishes, tongs, napkins, and serving staff.",
    deliveryFee: 125,
    staffingFee: 180,
    taxRate: 6.0,
    selectedItems: [
      { itemId: "meat-1", name: "Smoked Beef Brisket", quantity: 100, price: 16.50 },
      { itemId: "meat-2", name: "Applewood Pulled Pork", quantity: 100, price: 11.50 },
      { itemId: "side-1", name: "Smokehouse Mac 'n Cheese", quantity: 100, price: 4.25 },
      { itemId: "side-2", name: "Cowboy BBQ Baked Beans", quantity: 100, price: 3.50 },
      { itemId: "side-3", name: "Fresh Skillet Cornbread", quantity: 100, price: 2.50 }
    ],
    internalNotes: "Marcus called requesting the full H&M smokehouse experience. 50th anniversary gathering with grandparents traveling from Texas. Requested extra mild BBQ sauce bottles.",
    followUpDate: "2026-10-28",
    quoteSentDate: null,
    confirmedDate: null
  },
  {
    id: "REQ-2026-040",
    customerName: "Elena Rodriguez & David Vance",
    organization: "Rodriguez-Vance Wedding",
    email: "elena.rodriguez@gmail.com",
    phone: "(208) 555-6712",
    eventType: "Wedding",
    eventDate: "2026-11-15",
    preferredTime: "4:30 PM - 7:30 PM",
    guestCount: 140,
    venueAddress: "Deer Flat Ranch, 14598 Lake Shore Dr, Nampa, ID 83686",
    estimatedBudget: 4500,
    dateReceived: "2026-10-22",
    status: "Quote Sent",
    dietaryNotes: "Nut allergies present in 3 guests. Bride requested grilled Portobello caps for 6 vegetarian guests.",
    specialInstructions: "Formal rustic outdoor wedding reception. Needs elegant buffet line presentation with vintage wood risers and chalkboard menu labels.",
    deliveryFee: 150,
    staffingFee: 250,
    taxRate: 6.0,
    selectedItems: [
      { itemId: "meat-1", name: "Smoked Beef Brisket", quantity: 140, price: 16.50 },
      { itemId: "meat-5", name: "Smoked Turkey Breast", quantity: 140, price: 11.00 },
      { itemId: "side-7", name: "Dutch Oven Cheesy Potatoes", quantity: 140, price: 4.00 },
      { itemId: "side-6", name: "Green Beans & Smoked Bacon", quantity: 140, price: 3.25 },
      { itemId: "dessert-1", name: "Warm Idaho Peach Cobbler", quantity: 140, price: 4.50 }
    ],
    internalNotes: "Quote #QT-2026-088 sent 10/23. Spoke with wedding planner Sarah. Elena loved our peach cobbler sample. Awaiting final signed contract by Friday.",
    followUpDate: "2026-10-28",
    quoteSentDate: "2026-10-23",
    confirmedDate: null
  },
  {
    id: "REQ-2026-039",
    customerName: "Craig Henderson",
    organization: "Treasure Valley Ag Producers Summit",
    email: "chenderson@tvag.org",
    phone: "(208) 459-2180",
    eventType: "Corporate Event",
    eventDate: "2026-11-12",
    preferredTime: "11:45 AM - 1:30 PM",
    guestCount: 180,
    venueAddress: "Nampa Civic Center, 311 3rd St S, Nampa, ID 83651",
    estimatedBudget: 5200,
    dateReceived: "2026-10-24",
    status: "Reviewing",
    dietaryNotes: "10 gluten-free requests. Fast buffet line flow required for 45-minute keynote lunch break.",
    specialInstructions: "Dual-sided buffet line needed to serve 180 ranchers within 25 minutes. Heavy appetite portions.",
    deliveryFee: 100,
    staffingFee: 200,
    taxRate: 6.0,
    selectedItems: [
      { itemId: "pkg-1", name: "The Pitmaster BBQ Buffet", quantity: 180, price: 23.50 }
    ],
    internalNotes: "Reviewing kitchen smoker capacity for 11/12 morning. Pitmaster Dave confirmed we can stage double racks in Smoker #1.",
    followUpDate: "2026-10-27",
    quoteSentDate: null,
    confirmedDate: null
  },
  {
    id: "REQ-2026-041",
    customerName: "Coach Bradley Hawkins",
    organization: "Boise State Bronco Tailgate Boosters",
    email: "bhawkins@broncosupport.org",
    phone: "(208) 555-9014",
    eventType: "Private Party",
    eventDate: "2026-11-06",
    preferredTime: "4:00 PM - 6:30 PM",
    guestCount: 75,
    venueAddress: "Albertsons Stadium West Lot, Boise, ID 83725",
    estimatedBudget: 1900,
    dateReceived: "2026-10-26",
    status: "New",
    dietaryNotes: "Standard hearty game-day barbecue.",
    specialInstructions: "Tailgate drop-off with disposable insulated warm boxes and disposable table cloths. Blue and orange napkins requested if available.",
    deliveryFee: 95,
    staffingFee: 0,
    taxRate: 6.0,
    selectedItems: [
      { itemId: "meat-2", name: "Applewood Pulled Pork", quantity: 75, price: 11.50 },
      { itemId: "meat-6", name: "House Jalapeño Cheddar Sausage", quantity: 75, price: 8.50 },
      { itemId: "side-2", name: "Cowboy BBQ Baked Beans", quantity: 75, price: 3.50 },
      { itemId: "side-4", name: "Crisp Creamy Coleslaw", quantity: 75, price: 2.75 }
    ],
    internalNotes: "Longtime customer Bradley from Nampa. Need drop-off by 3:45 PM sharp before football traffic.",
    followUpDate: "2026-10-29",
    quoteSentDate: null,
    confirmedDate: null
  },
  {
    id: "REQ-2026-037",
    customerName: "Jessica Sterling",
    organization: "Sterling Family Law Annual Retreat",
    email: "jsterling@sterlinglawidaho.com",
    phone: "(208) 466-3390",
    eventType: "Corporate Event",
    eventDate: "2026-11-20",
    preferredTime: "6:00 PM - 8:30 PM",
    guestCount: 60,
    venueAddress: "Lakeview Park Rotary Pavilion, 1304 7th St N, Nampa, ID",
    estimatedBudget: 2200,
    dateReceived: "2026-10-20",
    status: "Quote Sent",
    dietaryNotes: "No shellfish or peanuts.",
    specialInstructions: "Full cleanup required after event. Evening dinner lighting and chafing candles.",
    deliveryFee: 85,
    staffingFee: 120,
    taxRate: 6.0,
    selectedItems: [
      { itemId: "meat-3", name: "Smoked Tri-Tip", quantity: 60, price: 15.00 },
      { itemId: "meat-7", name: "Smoked Chicken Quarters", quantity: 60, price: 9.75 },
      { itemId: "side-1", name: "Smokehouse Mac 'n Cheese", quantity: 60, price: 4.25 },
      { itemId: "side-3", name: "Fresh Skillet Cornbread", quantity: 60, price: 2.50 }
    ],
    internalNotes: "Quote sent 10/21. Jessica acknowledged receiving estimate, awaiting partner vote on menu.",
    followUpDate: "2026-10-29",
    quoteSentDate: "2026-10-21",
    confirmedDate: null
  },
  {
    id: "REQ-2026-035",
    customerName: "Pastor Kevin Wright",
    organization: "Grace Community Church Fall Picnic",
    email: "kwright@graceidaho.org",
    phone: "(208) 555-1277",
    eventType: "Other",
    eventDate: "2026-10-30",
    preferredTime: "5:00 PM",
    guestCount: 220,
    venueAddress: "Lakeview Park, Nampa, ID",
    estimatedBudget: 1500,
    dateReceived: "2026-10-18",
    status: "Declined",
    dietaryNotes: "None specified.",
    specialInstructions: "Budget limit $1,500 for 220 people.",
    deliveryFee: 50,
    staffingFee: 0,
    taxRate: 6.0,
    selectedItems: [],
    internalNotes: "Client's $1,500 budget translates to under $6.80/person, below our minimum food cost. Politely declined and recommended our bulk meat market wholesale trays instead.",
    followUpDate: null,
    quoteSentDate: null,
    confirmedDate: null
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-101",
    orderNumber: "ORD-2026-101",
    requestId: "REQ-2026-031",
    customerName: "Sarah Jenkins",
    organization: "Micron Technology Global Tech Summit",
    email: "sjenkins@micron.com",
    phone: "(208) 368-4000",
    eventType: "Corporate Event",
    eventDate: "2026-10-29",
    preferredTime: "11:30 AM - 2:00 PM",
    guestCount: 150,
    venueAddress: "Ford Idaho Center - Arena Suites, 16200 N Idaho Center Blvd, Nampa, ID",
    subtotal: 4125.00,
    deliveryFee: 150.00,
    staffingFee: 250.00,
    taxRate: 6.0,
    taxAmount: 271.50,
    totalValue: 4796.50,
    preparationStatus: "In Preparation", // Not Started, In Preparation, Ready, Completed
    paymentStatus: "Deposit Received", // Unpaid, Deposit Received, Paid
    dateConfirmed: "2026-10-19",
    items: [
      { name: "The Pitmaster BBQ Buffet (Brisket & Pulled Pork)", quantity: 150, price: 23.50, total: 3525.00 },
      { name: "Warm Idaho Peach Cobbler", quantity: 150, price: 4.00, total: 600.00 }
    ],
    dietaryNotes: "8 guests need gluten-free meals packaged separately with clear green labels.",
    specialInstructions: "Security check-in at Gate 3 loading dock. Unload by 10:30 AM. VIP executive box service.",
    kitchenChecklist: [
      { step: "Brisket trimmed & seasoned with pepper rub", done: true },
      { step: "Smoker 1 loaded for 14-hour cook (8 PM 10/28)", done: true },
      { step: "Pork shoulders dry-rubbed & rested", done: true },
      { step: "Side dishes baked fresh 7:00 AM 10/29", done: false },
      { step: "Insulated Cambro carriers loaded & temps verified", done: false }
    ],
    notes: "Deposit of $2,398.25 received on 10/20 via corporate check. Final invoice balance due Net 15."
  },
  {
    id: "ORD-2026-102",
    orderNumber: "ORD-2026-102",
    requestId: "REQ-2026-028",
    customerName: "Amanda Bennett & Lucas Koehler",
    organization: "Koehler-Bennett Autumn Wedding",
    email: "amanda.bennett@gmail.com",
    phone: "(208) 555-4120",
    eventType: "Wedding",
    eventDate: "2026-10-31",
    preferredTime: "4:00 PM - 8:00 PM",
    guestCount: 125,
    venueAddress: "Deer Flat Ranch, 14598 Lake Shore Dr, Nampa, ID 83686",
    subtotal: 3950.00,
    deliveryFee: 150.00,
    staffingFee: 300.00,
    taxRate: 6.0,
    taxAmount: 264.00,
    totalValue: 4664.00,
    preparationStatus: "Not Started",
    paymentStatus: "Paid",
    dateConfirmed: "2026-10-15",
    items: [
      { name: "Smoked Tri-Tip (Carved to order)", quantity: 125, price: 15.00, total: 1875.00 },
      { name: "Smoked Turkey Breast", quantity: 125, price: 11.00, total: 1375.00 },
      { name: "Dutch Oven Cheesy Potatoes", quantity: 125, price: 4.00, total: 500.00 },
      { name: "Green Beans & Smoked Bacon", quantity: 125, price: 3.25, total: 406.25 },
      { name: "Interactive S'mores Bar Experience", quantity: 125, price: 5.75, total: 718.75 }
    ],
    dietaryNotes: "Bride requested extra grilled lemon herb chicken breast for 4 dairy-sensitive bridesmaids.",
    specialInstructions: "Setup along rustic barn veranda. Bring 4 chafing stands, copper serving pans, and carved cutting board.",
    kitchenChecklist: [
      { step: "Beef tri-tips marinaded & rubbed", done: false },
      { step: "Turkey breast brining underway", done: false },
      { step: "Prep S'mores bar display & tabletop burners", done: false },
      { step: "Chafers & fuel cans packed in catering van", done: false }
    ],
    notes: "Paid in full ($4,664.00) on 10/16. Client requested our head pitmaster Dave on-site for carving."
  },
  {
    id: "ORD-2026-103",
    orderNumber: "ORD-2026-103",
    requestId: "REQ-2026-033",
    customerName: "Tom Gallagher",
    organization: "Idaho Cattle Association Quarterly Luncheon",
    email: "tom@idahocattle.org",
    phone: "(208) 459-7100",
    eventType: "Corporate Event",
    eventDate: "2026-11-04",
    preferredTime: "12:00 PM - 1:45 PM",
    guestCount: 85,
    venueAddress: "Nampa Civic Center, 311 3rd St S, Nampa, ID 83651",
    subtotal: 2167.50,
    deliveryFee: 90.00,
    staffingFee: 150.00,
    taxRate: 6.0,
    taxAmount: 144.45,
    totalValue: 2551.95,
    preparationStatus: "Not Started",
    paymentStatus: "Deposit Received",
    dateConfirmed: "2026-10-21",
    items: [
      { name: "Smoked Beef Brisket", quantity: 85, price: 16.50, total: 1402.50 },
      { name: "Cowboy BBQ Baked Beans", quantity: 85, price: 3.50, total: 297.50 },
      { name: "Country Potato Salad", quantity: 85, price: 3.25, total: 276.25 },
      { name: "Fresh Skillet Cornbread", quantity: 85, price: 2.50, total: 212.50 }
    ],
    dietaryNotes: "None. Group specifically demanded our certified Idaho beef brisket.",
    specialInstructions: "Civic Center Blue Room. Setup ready for buffet lunch at 11:45 AM prompt.",
    kitchenChecklist: [
      { step: "Reserve 6 prime briskets in meat cooler", done: true },
      { step: "Schedule smoker night cook 11/03", done: false },
      { step: "Mix house dry rub batch", done: false }
    ],
    notes: "50% deposit received ($1,275.98) on 10/22. Balance to be settled day of event."
  },
  {
    id: "ORD-2026-099",
    orderNumber: "ORD-2026-099",
    requestId: "REQ-2026-025",
    customerName: "Rachel Christensen",
    organization: "Snake River Rotary Club Charity Mixer",
    email: "rachel@snakeriverrotary.org",
    phone: "(208) 555-8831",
    eventType: "Other",
    eventDate: "2026-10-24",
    preferredTime: "6:00 PM - 9:00 PM",
    guestCount: 65,
    venueAddress: "Broadmore Country Club, 10100 11th Ave N, Nampa, ID",
    subtotal: 1625.00,
    deliveryFee: 75.00,
    staffingFee: 120.00,
    taxRate: 6.0,
    taxAmount: 109.20,
    totalValue: 1929.20,
    preparationStatus: "Completed",
    paymentStatus: "Paid",
    dateConfirmed: "2026-10-10",
    items: [
      { name: "Smoked Street Taco Bar", quantity: 65, price: 21.00, total: 1365.00 },
      { name: "Fudge Brownie Bites", quantity: 65, price: 3.50, total: 227.50 }
    ],
    dietaryNotes: "Corn tortillas for celiac guests.",
    specialInstructions: "Clean breakdown after 9 PM.",
    kitchenChecklist: [
      { step: "Event completed and signed off by Rotary chair", done: true },
      { step: "Chafers washed and inventoried back to shop", done: true }
    ],
    notes: "Event executed successfully with outstanding feedback. Rachel indicated they want to book us for their Spring 2027 Gala."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Miller Family 50th Reunion",
    message: "New 100-guest BBQ inquiry received. Customer requested brisket, pulled pork & smoker setup.",
    type: "new_request",
    requestId: "REQ-2026-042",
    timeAgo: "2 hours ago",
    priority: "high"
  },
  {
    id: "notif-2",
    title: "Quote Follow-up Reminder",
    message: "Elena & David Wedding ($4,500 quote sent 4 days ago). Bride's review deadline is tomorrow.",
    type: "quote_followup",
    requestId: "REQ-2026-040",
    timeAgo: "5 hours ago",
    priority: "medium"
  },
  {
    id: "notif-3",
    title: "Smoker Prep: Micron Tech Summit",
    message: "150-guest event scheduled for 10/29. Smoker #1 overnight burn starts at 8:00 PM tonight.",
    type: "kitchen_prep",
    orderId: "ORD-2026-101",
    timeAgo: "1 day ago",
    priority: "high"
  },
  {
    id: "notif-4",
    title: "Deposit Received: Amanda Bennett Wedding",
    message: "Full balance payment of $4,664.00 confirmed for Deer Flat Ranch reception on 10/31.",
    type: "payment",
    orderId: "ORD-2026-102",
    timeAgo: "2 days ago",
    priority: "low"
  }
];
