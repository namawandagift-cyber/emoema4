/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, ServiceCategory, EquipmentItem, PowerAppliance } from "../types";

export const EMOEMA_SERVICES: ServiceItem[] = [
  {
    id: "install",
    title: "Equipment Installation",
    description: "Professional assembly, setup, and commissioning of delicate clinical, testing, and imaging machinery.",
    longDescription: "Deploying healthcare equipment requires mechanical, electrical, and scientific precision. Our certified engineers handle full planning, transport guidance, hardware mounting, physical calibration, software configuration, and on-site testing in total alignment with international safety standards.",
    iconName: "Wrench",
    category: ServiceCategory.BIOMEDICAL,
    benefits: [
      "OEM-standard installation procedures",
      "Immediate pre-commissioning testing",
      "Staff orientation and initial safety walkthroughs",
      "Comprehensive installation certificates and paperwork"
    ]
  },
  {
    id: "pm",
    title: "Preventive Maintenance (PM)",
    description: "Scheduled servicing, internal cleaning, part updates, and safety checks to maximize up-time.",
    longDescription: "Biomedical downtime can be life-threatening. We formulate customized preventive maintenance agreements (PMAs) incorporating visual inspections, thorough dust removal, lubrication, filter replacements, battery cell diagnostics, and minor part refreshment before they degrade.",
    iconName: "CalendarRange",
    category: ServiceCategory.BIOMEDICAL,
    benefits: [
      "Reduction of sudden equipment breakdowns by up to 85%",
      "Extension of hardware lifecycle",
      "Scheduled around your hospital's low-volume/off-peak hours",
      "Compliance with Ministry of Health regulations"
    ]
  },
  {
    id: "repair",
    title: "Repair & Troubleshooting",
    description: "Rapid-response diagnostics, component replacement, and clinical restoration of faulty devices.",
    longDescription: "When an ICU monitor, infant warmer, or laboratory centrifuge fails, every minute counts. EmoEma offers swift dispatch of specialized field technicians in Kampala and across Uganda. We identify faults down to the board level, replacing only what is necessary to return life-critical devices to operation safely.",
    iconName: "Activity",
    category: ServiceCategory.BIOMEDICAL,
    benefits: [
      "Fast response dispatch to Kampala, Kireka, and beyond",
      "Advanced electronic board-level fault tracing",
      "Original spare parts sourcing from globally verified partners",
      "Rigorous electrical safety test prior to clinical release"
    ]
  },
  {
    id: "calibration",
    title: "Equipment Calibration",
    description: "NIST-traceable calibration of monitoring, diagnostics, and lab readouts to ensure absolute clinical accuracy.",
    longDescription: "Faulty values lead to misdiagnoses. EmoEma specializes in premium calibration services, validating sensors, temperature modules, radiation levels, pneumatic pressures, and electrical outputs in our clients' clinical hardware. We secure precise baseline alignments for critical healthcare delivery.",
    iconName: "Compass",
    category: ServiceCategory.BIOMEDICAL,
    benefits: [
      "High-precision reference equipment alignment",
      "Detailed calibration certification indicating deviation margins",
      "Guarantees trustworthy readings for labs and triage",
      "Helps meet accreditation standards for laboratories"
    ]
  },
  {
    id: "supply",
    title: "Medical Equipment Supply",
    description: "Procurement of specialized multi-parameter monitors, diagnostics machines, and genuine medical parts.",
    longDescription: "We source medical equipment from certified global manufacturers with full technical backup. From multiparameter patient monitors and professional diagnostic ultrasound units to essential surgical lighting and laboratory incubators, we verify quality, longevity, and ease-of-maintenance.",
    iconName: "ShoppingBag",
    category: ServiceCategory.BIOMEDICAL,
    benefits: [
      "Rigorous factory checking before delivery",
      "Full manufacturer warranties managed locally by EmoEma",
      "Bundled with installation, training, and 1 year of support",
      "Transparent supply chains and genuine replacement supplies"
    ]
  },
  {
    id: "power",
    title: "Healthcare Power Solutions",
    description: "Supplying soundproof medical and industrial generators with heavy-duty automatic transfer switches.",
    longDescription: "Power outages pose immediate threats to blood bank refrigeration, neonatal warming, and life support systems. We design, supply, install, and service soundproof, high-tier diesel generators (10kVA to 500kVA+). We focus on responsive ATS integration to automate transition within 5-10 seconds of grid failure.",
    iconName: "Zap",
    category: ServiceCategory.POWER,
    benefits: [
      "Instant startup with smart automatic transfer switches (ATS)",
      "High-grade fuel filters engineered specifically for deep reliability",
      "Low sound enclosures and noise dampening for hospital peacefulness",
      "Regular diesel generator maintenance & emergency fuel tuning support"
    ]
  }
];

export const MEDICAL_EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "Multi-Parameter Patient Monitor EM-128",
    category: "patient-care",
    description: "Professional acute-care monitor detailing ECG, SpO2, NIBP, Respiration, Pulse Rate, and Temperature. Features a clean 12.1-inch color touchscreen.",
    specs: [
      "Screen: 12.1\" high-contrast TFT touchscreen display",
      "Parameters: ECG, Resp, NIBP, SpO2, Temp, Pulse Rate",
      "Power backup: Up to 4 hours active lithium battery runtime",
      "Alarms: Acoustic and optical alert triggers with memory history"
    ],
    features: [
      "Arrhythmia analysis and S-T segment detection",
      "Supports central nursing station remote wireless linking",
      "Anti-high-frequency electrosurgical interference built-in",
      "Pediatric, infant, and adult configuration profiles"
    ],
    isFeatured: true,
    public/images: "/src/assets/images/icu_recovery_bed_1780060181871.png"
  },
  {
    id: "eq-2",
    name: "Biomedical Neonatal Incubator CozyWarm II",
    category: "patient-care",
    description: "Highly stable incubator designed with micro-processor temperature regulators to protect neonates with continuous micro-climates.",
    specs: [
      "Control modes: Air mode and baby skin temperature control",
      "Humidity: Seamless passive/active moisture reservoirs",
      "Display: High-visibility LED showing temperature discrepancies",
      "Chamber: Double walled hood isolating outside draft noises"
    ],
    features: [
      "Multi-hazard acoustic signals (air flow, power, sensor failure)",
      "Tilt-adjustable bed to assist breathing and digestive feeding",
      "Built-in neonatal jaundice phototherapy lamp hookups",
      "Infrared safety ray cuts if target threshold is exceeded"
    ],
    isFeatured: true,
   public/images: "/src/assets/images/biomedical_hero_1780057148827.png"
  },
  {
    id: "eq-3",
    name: "High-Resolution Portable Ultrasound Probe system",
    category: "diagnostics",
    description: "Diagnostic ultrasound console paired with multi-frequency transducer arrays, perfect for clinical ob-gyn, abdominal, and vascular imaging.",
    specs: [
      "Imaging: B, B/B, 4B, M, and Color Doppler",
      "Transducers: Convex 3.5MHz, Linear 7.5MHz, Transvaginal 6.5MHz",
      "Weight: 4.8kg including battery packs for full mobility",
      "Storage: Embedded SSD supporting prompt clinical patient reports"
    ],
    features: [
      "Real-time tissue harmonic rendering filters",
      "Instant export options to USB PDF or clinical DICOM systems",
      "Simplified controls with single-touch image adjustments",
      "Highly impact-resistant field transport briefcase included"
    ],
    isFeatured: true,
    public/images: "/src/assets/images/ultrasound_scanner_1780060146128.png"
  },
  {
    id: "eq-4",
    name: "High-Performance Laboratory Centrifuge LC-340",
    category: "laboratory",
    description: "Dynamic brushless laboratory centrifuge holding up to 24 samples with precise RPM control for medical testing and blood-separation.",
    specs: [
      "Max Speed: 5000 RPM (Rotations Per Minute)",
      "Rotor Options: Swing-out or fixed angle options",
      "Safety: Dual-lid mechanical locks with automated imbalance detect",
      "Motor: Brushless maintenance-free low-sound induction drive"
    ],
    features: [
      "Digital speed, time, and centrifugal-force readouts",
      "Rapid deceleration curves to preserve serum layers",
      "Nose-damped housing ensuring quiet diagnostic lab rooms",
      "Easy-clean steel interior cavity supporting sanitation standards"
    ],
    isFeatured: false,
    public/images: "/src/assets/images/calibration_details_1780057964615.png"
  },
  {
    id: "eq-5",
    name: "Soundproof Diesel Generator EM-30kVA",
    category: "power-solutions",
    description: "High-performance backup diesel generator, utilizing noise-damped clinical enclosures and auto-start panels configured for clinical back-up.",
    specs: [
      "Continuous output: 30 kVA (Three-Phase / 24kW output)",
      "Dampening: Ultra soundproof canopy, under 65 dBA at 7 meters",
      "Controller: Smart Gen / Deep Sea automated generator manager",
      "ATS Integration: Automatic power transfer triggering in 5-8 seconds"
    ],
    features: [
      "Heavy duty engine designed to thrive with Uganda's local fuel profiles",
      "Integrated base fuel storage container with 15-hour full-load capacity",
      "Tropical radiator system engineered to run reliably in high heat",
      "Instant short-circuit and oil drop automated shutoff triggers"
    ],
    isFeatured: true,
    public/images: "/src/assets/images/medical_generator_1780057170547.png"
  },
  {
    id: "eq-6",
    name: "Commercial Soundproof Generator EM-100kVA",
    category: "power-solutions",
    description: "Heavy-duty 100kVA backup power plant for large medical facilities, laboratories, surgery centers, and commercial hubs.",
    specs: [
      "Continuous output: 100 kVA (80 kW continuous)",
      "Engine: Heavy-duty multi-cylinder turbocharged diesel engine",
      "Controller: Premium digital console supporting internet monitoring",
      "Transfer mechanism: 160A heavy-duty standalone wall-mounted ATS cabinet"
    ],
    features: [
      "Exceptional block load response supporting heavy X-ray and CT starts",
      "Weatherproof rust-resistant powder coat paint for Uganda's weather",
      "Secure double-doored maintenance layout for simple filters access",
      "Ultra-low vibration chassis with rubber insulation dampeners"
    ],
    isFeatured: false,
    public/images: "/src/assets/images/power_bg_light_1780057945804.png"
  }
];

export const POWER_APPLIANCES: PowerAppliance[] = [
  { id: "app-1", name: "Neonatal Incubator / Warmer", runningWatts: 1500, startingWatts: 2400, category: "life-support" },
  { id: "app-2", name: "Diagnostic Ultrasound System", runningWatts: 800, startingWatts: 1200, category: "imaging" },
  { id: "app-3", name: "Digital X-Ray Unit (Stationary)", runningWatts: 6000, startingWatts: 12000, category: "imaging" },
  { id: "app-4", name: "Clinical Lab Centrifuge", runningWatts: 1200, startingWatts: 2200, category: "laboratory" },
  { id: "app-5", name: "Patient Multi-Parameter Monitor", runningWatts: 150, startingWatts: 200, category: "life-support" },
  { id: "app-6", name: "Vaccine / Blood Bank Refrigerator", runningWatts: 700, startingWatts: 2100, category: "cooling" },
  { id: "app-7", name: "Oxygen Concentrator (High Flow)", runningWatts: 650, startingWatts: 1400, category: "life-support" },
  { id: "app-8", name: "Hematology Lab Analyzer", runningWatts: 450, startingWatts: 600, category: "laboratory" },
  { id: "app-9", name: "Clinical Autoclave (Sterilizer)", runningWatts: 2500, startingWatts: 3000, category: "laboratory" },
  { id: "app-10", name: "Surgical Theater LED Light Console", runningWatts: 400, startingWatts: 400, category: "facility" },
  { id: "app-11", name: "Medical Fluid/Blood Warmer", runningWatts: 1000, startingWatts: 1200, category: "life-support" },
  { id: "app-12", name: "Diagnostic Laboratory Chem Analyzer", runningWatts: 1200, startingWatts: 1800, category: "laboratory" },
  { id: "app-13", name: "Facility Air Conditioner (18,000 BTU)", runningWatts: 2000, startingWatts: 4500, category: "cooling" },
  { id: "app-14", name: "Critical IT Server & Nursing Desks", runningWatts: 1200, startingWatts: 1500, category: "facility" },
  { id: "app-15", name: "Emergency Surgery Suction Pump", runningWatts: 350, startingWatts: 600, category: "life-support" }
];
