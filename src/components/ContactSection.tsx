/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ServiceRequest } from "../types";
import { Phone, Mail, MapPin, Send, HelpCircle, FileCheck, ShieldAlert, CheckCircle, Clock } from "lucide-react";

interface ContactSectionProps {
  preFilledMessage: string;
  setPreFilledMessage: (msg: string) => void;
  serviceTickets: ServiceRequest[];
  onAddTicket: (ticket: ServiceRequest) => void;
}

export default function ContactSection({
  preFilledMessage,
  setPreFilledMessage,
  serviceTickets,
  onAddTicket
}: ContactSectionProps) {
  // Local Form state
  const [facilityName, setFacilityName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Kampala");
  const [requestType, setRequestType] = useState("PREVENTIVE_MAINTENANCE");
  const [equipmentDetails, setEquipmentDetails] = useState("");
  const [urgency, setUrgency] = useState<"routine" | "urgent" | "emergency">("routine");
  const [message, setMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Synchronize prefilled messages
  React.useEffect(() => {
    if (preFilledMessage) {
      setMessage(preFilledMessage);
      // Autofill some diagnostics to help trigger the workflow
      setRequestType("POWER_SENSE");
      setEquipmentDetails("Backup diesel engine review");
    }
  }, [preFilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityName || !contactPerson || !phone) {
      alert("Please fill in the Facility Name, Contact Person and Phone number.");
      return;
    }

    const newTicket: ServiceRequest = {
      id: "EM-" + Math.floor(1000 + Math.random() * 9000),
      facilityName,
      contactPerson,
      phone,
      email: email || "info@client.com",
      location,
      requestType,
      equipmentDetails: equipmentDetails || "General medical instrumentation review",
      urgency,
      message,
      status: "pending",
      createdAt: new Date().toLocaleString()
    };

    onAddTicket(newTicket);
    setFormSubmitted(true);
    
    // Clear form but keep a nice thank you state
    setFacilityName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setLocation("Kampala");
    setEquipmentDetails("");
    setMessage("");
    setPreFilledMessage("");

    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  // Maps request name to nice human labels
  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "INSTALLATION": return "Equipment Installation";
      case "PREVENTIVE_MAINTENANCE": return "Preventive Maintenance";
      case "REPAIR": return "On-site Breakdown Repair";
      case "CALIBRATION": return "Traceable Calibration";
      case "TECHNICAL_SUPPORT": return "24/7 Phone Support";
      case "POWER_SENSE": return "Power/Generator Sizing Audit";
      default: return "General Consultation";
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase block mb-2 font-mono">
            // Client Support Desk
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Schedule a Certified Biomedical Engineer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Submit a support case or request hardware quotes. Our central dispatcher will triage your inquiry and allocate a technician suited to the equipment platform.
          </p>
        </div>

        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Coordinates & Information */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Quick Contact Block */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-6 shadow-sm">
              <h3 className="font-sans font-extrabold text-base text-slate-900">Contact Channels</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-teal-50 text-teal-600 border border-teal-100 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Our Laboratory and Office</h4>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">Kireka – Kamuli Road, Kampala, Uganda</p>
                    <p className="text-xs text-slate-500 mt-1">Visit us for equipment drop-offs, diagnostic calibration testing, or diesel parts procurement inquiries.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-teal-50 text-teal-600 border border-teal-100 rounded-xl flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Central Dispatch Hotlines</h4>
                    <a href="tel:+256764249992" className="text-sm font-extrabold text-teal-700 hover:text-teal-800 transition-colors mt-0.5 block">
                      +256 764 249992
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Available for emergency board issues and field engineer requests.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-teal-50 text-teal-600 border border-teal-100 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Electronic Correspondence</h4>
                    <a href="mailto:emoemaenterprisesltd@gmail.com" className="text-sm font-extrabold text-teal-700 hover:text-teal-850 transition-colors mt-0.5 block break-all">
                      emoemaenterprisesltd@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call-To-Action (Primary Lead Gen) */}
            <a 
              href="https://wa.me/256764249992?text=Hello%20EmoEma%20Biomedical,%20I%20would%20like%2520to%20request%20a%20technical%20quote%20for%20medical%20services%20or%20backup%20generator%20supplies."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-4 rounded-xl transition-all duration-150 shadow-md shadow-emerald-600/10 active:scale-98 cursor-pointer"
            >
              {/* Custom High Quality WhatsApp SVG */}
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-2.32 0-4.207 1.887-4.207 4.207 0 .584.119 1.14.331 1.642L7.307 15l3.123-.815c.48.2 1.009.309 1.601.309 2.32 0 4.207-1.887 4.207-4.207 0-2.32-1.887-4.207-4.207-4.207zm2.525 5.92c-.104.168-.415.244-.664.135-.145-.064-.616-.215-1.173-.711-.433-.386-.725-.863-.811-1.01-.086-.147-.009-.226.064-.299.066-.066.147-.171.221-.257.073-.086.098-.147.147-.245.049-.098.024-.184-.012-.257-.037-.073-.331-.796-.453-1.09-.119-.288-.242-.248-.331-.253-.086-.005-.184-.005-.282-.005-.098 0-.257.037-.392.184-.135.147-.514.502-.514 1.224 0 .722.526 1.419.599 1.517.073.098 1.034 1.579 2.507 2.214.351.151.624.242.837.31.352.112.673.096.927.058.283-.042.871-.356.994-.7.123-.344.123-.639.086-.7-.037-.061-.135-.098-.239-.147zM12 0c-6.627 0-12 5.373-12 12 0 2.112.547 4.095 1.507 5.827L0 24l6.33-1.661C7.994 23.298 9.927 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.014 21.84c-1.854 0-3.673-.491-5.263-1.422l-.377-.223-3.906 1.025 1.042-3.806-.245-.391c-1.021-1.623-1.562-3.498-1.561-5.42C1.708 6.335 6.33 1.71 12.016 1.71c2.753 0 5.342 1.072 7.29 3.024 1.948 1.951 3.019 4.544 3.016 7.298-.006 5.679-4.629 10.302-10.308 10.3025zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c.002 0 .003 0 .005 0 6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              <span>Instant Chat on WhatsApp</span>
            </a>

            {/* Google Maps Location Embed */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-left">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono mb-3 flex items-center gap-1">
                <span>📍</span>
                <span> Kampala Office Location</span>
              </h4>
              <div className="w-full h-48 overflow-hidden rounded-xl border border-slate-150">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.983637827464!2d32.62886733276634!3d0.35416738986873527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db93902fcd2e1%3A0xc31fa0dfc10f82f8!2sKireka%2C%20Kampala!5e0!3m2!1sen!2sug!4v1716999999999!5m2!1sen!2sug" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-normal">
                Located on Kireka – Kamuli Road, Kampala near the highway junction. Clear accessibility for hospital dispatches across central Uganda.
              </p>
            </div>

            {/* Response speed pledge */}
            <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-teal-50 border border-teal-700 rounded-2xl p-6 text-left space-y-4 shadow-md shadow-teal-900/10">
              <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest font-mono text-teal-200">Response Speed Pledge</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-teal-105">
                <li className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong>ICU / Critical Care:</strong> Emergency triage within 2 hours.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Routine PM / Calibration:</strong> Scheduled engineer within 24-48 business hours.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Generator Backup audits:</strong> Site survey planned within 2 business days.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 bg-slate-50/50 border border-slate-100 rounded-2xl p-6 md:p-8">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 tracking-tight mb-6 text-left flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              <span>Biomedical Service Ticket & Consultation Form</span>
            </h3>

            {formSubmitted && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-900 rounded-xl text-left flex items-start gap-3 animate-in fade-in zoom-in-95">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-extrabold text-sm">Ticket Submitted Successfully!</h4>
                  <p className="text-xs text-teal-700 mt-0.5 leading-relaxed">
                    We have registered your equipment support case inside our Kampala system. You can view its dispatch state below in the live Service Tickets Tracker dashboard. An engineer will phone you shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Medical Facility Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hilltop Clinic Kampala, Saint Marys Lab"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Mukasa, Lab Director"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +256 700 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. facility@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    City / Location (Uganda)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kireka, Entebbe, Gulu"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Type of Service Requested
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800 cursor-pointer"
                  >
                    <option value="INSTALLATION">Equipment Installation</option>
                    <option value="PREVENTIVE_MAINTENANCE">Preventive Maintenance (PM)</option>
                    <option value="REPAIR">Emergency Repair & Troubleshooting</option>
                    <option value="CALIBRATION">Sensor Calibration & Alignment</option>
                    <option value="TECHNICAL_SUPPORT">Direct Tech Support Hotline</option>
                    <option value="POWER_SENSE">Power Solutions & ATS Generator Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    Urgency Triage Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "routine", label: "Routine", styling: "border-slate-200 text-slate-700 bg-white" },
                      { key: "urgent", label: "Urgent", styling: "border-amber-200 text-amber-800 bg-amber-50/50" },
                      { key: "emergency", label: "Emergency", styling: "border-rose-200 text-rose-800 bg-rose-50/50" }
                    ].map((urg) => (
                      <button
                        key={urg.key}
                        type="button"
                        onClick={() => setUrgency(urg.key as any)}
                        className={`py-2 px-1 text-center font-bold text-xs rounded-lg border cursor-pointer transition-colors ${
                          urgency === urg.key
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : urg.styling
                        }`}
                      >
                        {urg.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                  Equipment make / model description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mindray multi-parameter monitor, Soundproof silent 30kVA Generator"
                  value={equipmentDetails}
                  onChange={(e) => setEquipmentDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                  Detailed support inquiry message
                </label>
                <textarea
                  rows={4}
                  placeholder="Please write diagnostic issues or list your equipment requirements in full..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800 focus:ring-teal-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md shadow-teal-50n"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Support Request</span>
                </button>
              </div>

            </form>
          </div>

        </div>

        {/* Dynamic Registered Tickets List dashboard */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-sans font-extrabold text-sm text-slate-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Live Active Engineering Dispatch Board</span>
              </h3>
              <p className="text-[10px] text-slate-500">Live ticket triage for Kampala & Central region installations</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] bg-slate-200/60 text-slate-600 py-1 px-2.5 rounded font-mono font-bold tracking-wider">
              <span>ACTIVE SYSTEM CONSOLE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            {serviceTickets.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <p className="font-semibold">No active field service tickets registered at this moment.</p>
                <p className="text-[10px] text-slate-500 mt-1">Submit the ticket dispatcher form above to create a live engineering task.</p>
              </div>
            ) : (
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                    <th className="py-2.5 font-bold">Ticket ID</th>
                    <th className="py-2.5 font-bold">Medical Center Name</th>
                    <th className="py-2.5 font-bold">Type</th>
                    <th className="py-2.5 font-bold">Priority</th>
                    <th className="py-2.5 font-bold">Timestamp</th>
                    <th className="py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {serviceTickets.map((tc) => {
                    let priorityBadge = <span className="px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">Routine</span>;
                    if (tc.urgency === "urgent") {
                      priorityBadge = <span className="px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-800">Urgent</span>;
                    } else if (tc.urgency === "emergency") {
                      priorityBadge = <span className="px-2 py-0.5 rounded font-semibold bg-rose-100 text-rose-850 animate-pulse">EMERGENCY</span>;
                    }

                    return (
                      <tr key={tc.id} className="hover:bg-slate-100/50 transition-colors">
                        <td className="py-3 font-mono font-semibold text-teal-600">{tc.id}</td>
                        <td className="py-3">
                          <p className="font-semibold text-slate-900">{tc.facilityName}</p>
                          <p className="text-[10px] text-slate-500">{tc.contactPerson} • {tc.phone}</p>
                        </td>
                        <td className="py-3">
                          <p className="text-slate-800 font-semibold">{getRequestTypeLabel(tc.requestType)}</p>
                          <p className="text-[10px] text-slate-400 font-mono line-clamp-1 max-w-[200px]">{tc.equipmentDetails}</p>
                        </td>
                        <td className="py-3">{priorityBadge}</td>
                        <td className="py-3 text-[10px] text-slate-500 font-mono">{tc.createdAt}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded font-semibold tracking-wide text-[10px] font-mono leading-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            <span>Pending Dispatcher allocation</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
