/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import GeneratorCalculator from "./components/GeneratorCalculator";
import EquipmentCatalog from "./components/EquipmentCatalog";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { ServiceRequest } from "./types";
import { Wrench, X, Send, CheckCircle, ShieldAlert, Activity, User, Phone, MapPin } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preFilledMessage, setPreFilledMessage] = useState<string>("");
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Initializing 1 or 2 realistic biomedical tickets so the list has high-quality design integrity on load
  const [serviceTickets, setServiceTickets] = useState<ServiceRequest[]>([
    {
      id: "EM-2384",
      facilityName: "Metropolitan Medical Center, Makerere",
      contactPerson: "Dr. Arthur Mukisa",
      phone: "+256 772 384594",
      email: "arthur@metrohealth.ug",
      location: "Kampala",
      requestType: "REPAIR",
      equipmentDetails: "Infant incubator blower motor vibration alarm faulty",
      urgency: "emergency",
      message: "The heater cycles off prematurely. Highly critical in neonatal ward.",
      status: "pending",
      createdAt: "2026-05-29T10:15:00Z"
    },
    {
      id: "EM-1945",
      facilityName: "Saint Elizabeth Laboratory, Mukono",
      contactPerson: "Sister Bernadette",
      phone: "+256 701 454329",
      email: "berna.lab@mukono.org",
      location: "Mukono",
      requestType: "CALIBRATION",
      equipmentDetails: "Hematology system photometric calibration",
      urgency: "routine",
      message: "Required calibration verification for clinical audits.",
      status: "pending",
      createdAt: "2026-05-29T08:30:00Z"
    }
  ]);

  // Modal input state
  const [bookingFacility, setBookingFacility] = useState("");
  const [bookingPerson, setBookingPerson] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState("");
  const [bookingUrgency, setBookingUrgency] = useState<"routine" | "urgent" | "emergency">("routine");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleAddTicket = (ticket: ServiceRequest) => {
    // Normalizing timezone timestamp to local readable style
    const cleanTicket = {
      ...ticket,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Local Time"
    };
    setServiceTickets((prev) => [cleanTicket, ...prev]);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFacility || !bookingPerson || !bookingPhone) {
      alert("Please enter the Medical Facility, Contact Person, and phone number.");
      return;
    }

    const newTicket: ServiceRequest = {
      id: "EM-" + Math.floor(1000 + Math.random() * 9000),
      facilityName: bookingFacility,
      contactPerson: bookingPerson,
      phone: bookingPhone,
      email: "direct-booking@client.com",
      location: "Kampala region",
      requestType: "REPAIR",
      equipmentDetails: bookingDetails || "Requested rapid field engineer check",
      urgency: bookingUrgency,
      message: "Created through modal technical dispatcher gateway",
      status: "pending",
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (Direct)"
    };

    setServiceTickets((prev) => [newTicket, ...prev]);
    setBookingSuccess(true);
    
    // Clear state
    setBookingFacility("");
    setBookingPerson("");
    setBookingPhone("");
    setBookingDetails("");

    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingModalOpen(false);
    }, 4500);
  };

  const handlePreFillAndNavigate = (text: string) => {
    setPreFilledMessage(text);
    setActiveTab("contact");
    
    // Smooth scroll down to contact section
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Switch tabs view
  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <>
            <Hero setActiveTab={setActiveTab} openBookingModal={() => setIsBookingModalOpen(true)} />
            <Services onBookService={handlePreFillAndNavigate} />
            <GeneratorCalculator onQuoteWithData={handlePreFillAndNavigate} />
            <EquipmentCatalog onQuoteRequested={handlePreFillAndNavigate} cartItems={cartItems} setCartItems={setCartItems} />
            <AboutUs />
            <ContactSection
              preFilledMessage={preFilledMessage}
              setPreFilledMessage={setPreFilledMessage}
              serviceTickets={serviceTickets}
              onAddTicket={handleAddTicket}
            />
          </>
        );
      case "services":
        return <Services onBookService={handlePreFillAndNavigate} />;
      case "calculator":
        return <GeneratorCalculator onQuoteWithData={handlePreFillAndNavigate} />;
      case "catalog":
        return <EquipmentCatalog onQuoteRequested={handlePreFillAndNavigate} cartItems={cartItems} setCartItems={setCartItems} />;
      case "about":
        return <AboutUs />;
      case "contact":
        return (
          <ContactSection
            preFilledMessage={preFilledMessage}
            setPreFilledMessage={setPreFilledMessage}
            serviceTickets={serviceTickets}
            onAddTicket={handleAddTicket}
          />
        );
      default:
        return <Hero setActiveTab={setActiveTab} openBookingModal={() => setIsBookingModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Shared Nav Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openBookingModal={() => setIsBookingModalOpen(true)}
      />

      {/* Main Tab Area */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* Footer Area */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modal Element: Booking Engineer on call */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Top design header bar */}
            <div className="bg-teal-950 text-white p-5 flex justify-between items-center text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-teal-650 rounded text-white">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-sm tracking-tight text-white">Direct Engineer Booking</h3>
                  <p className="text-[10px] text-teal-300 font-mono font-bold">EmoEma Kampala Dispatch Desk</p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 text-teal-300 hover:text-white hover:bg-teal-900 rounded transition-colors cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Info Block */}
            <div className="p-5">
              {bookingSuccess ? (
                <div className="py-6 space-y-4 text-center animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-sm text-slate-900">Support Request Registered</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Your technical repair call has been registered in the EmoEma Kampala central dispatch board. A certified field technician is being assigned to your medical facility.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                  
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      Facility Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paramount Clinic Kireka"
                      value={bookingFacility}
                      onChange={(e) => setBookingFacility(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      Your Name / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Moses, Head of Clinical Services"
                      value={bookingPerson}
                      onChange={(e) => setBookingPerson(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                        Phone Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +256 764..."
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                        Urgency Triage *
                      </label>
                      <select
                        value={bookingUrgency}
                        onChange={(e) => setBookingUrgency(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 cursor-pointer"
                      >
                        <option value="routine">Routine PM</option>
                        <option value="urgent">Urgent calibration</option>
                        <option value="emergency">EMERGENCY failure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                      Brief details of hardware faults
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Multi-parameter monitor power block dead"
                      value={bookingDetails}
                      onChange={(e) => setBookingDetails(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-extrabold tracking-wide shadow-md shadow-teal-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Technical Engineer</span>
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-3 leading-normal">
                      EmoEma Biomedical dispatches medical technicians under global ISO/IEC standards. By submitting this form, you trigger immediate dispatcher logging.
                    </p>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/256764249992?text=Hello%20EmoEma%20Biomedical,%20I%27m%20visiting%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20biomedical%20and%20power%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-700/40 transition-all duration-300 hover:scale-105 active:scale-95 group"
        id="whatsapp-floating-btn"
      >
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-550/20 animate-ping pointer-events-none group-hover:hidden" />
        
        {/* WhatsApp Icon */}
        <svg className="w-4.5 h-4.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-2.32 0-4.207 1.887-4.207 4.207 0 .584.119 1.14.331 1.642L7.307 15l3.123-.815c.48.2 1.009.309 1.601.309 2.32 0 4.207-1.887 4.207-4.207 0-2.32-1.887-4.207-4.207-4.207zm2.525 5.92c-.104.168-.415.244-.664.135-.145-.064-.616-.215-1.173-.711-.433-.386-.725-.863-.811-1.01-.086-.147-.009-.226.064-.299.066-.066.147-.171.221-.257.073-.086.098-.147.147-.245.049-.098.024-.184-.012-.257-.037-.073-.331-.796-.453-1.09-.119-.288-.242-.248-.331-.253-.086-.005-.184-.005-.282-.005-.098 0-.257.037-.392.184-.135.147-.514.502-.514 1.224 0 .722.526 1.419.599 1.517.073.098 1.034 1.579 2.507 2.214.351.151.624.242.837.31.352.112.673.096.927.058.283-.042.871-.356.994-.7.123-.344.123-.639.086-.7-.037-.061-.135-.098-.239-.147zM12 0c-6.627 0-12 5.373-12 12 0 2.112.547 4.095 1.507 5.827L0 24l6.33-1.661C7.994 23.298 9.927 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.014 21.84c-1.854 0-3.673-.491-5.263-1.422l-.377-.223-3.906 1.025 1.042-3.806-.245-.391c-1.021-1.623-1.562-3.498-1.561-5.42C1.708 6.335 6.33 1.71 12.016 1.71c2.753 0 5.342 1.072 7.29 3.024 1.948 1.951 3.019 4.544 3.016 7.298-.006 5.679-4.629 10.302-10.308 10.3025zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c.002 0 .003 0 .005 0 6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
        
        <span className="text-xs font-extrabold tracking-tight hidden sm:inline whitespace-nowrap">
          WhatsApp Dispatch
        </span>
      </a>

    </div>
  );
}
