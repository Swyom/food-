import React, { useState } from 'react';
import { Calendar, Clock, Users, Mail, User, Phone, CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';
import { ReservationData } from '../types';

export const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketID, setTicketID] = useState('');
  const [selectedTable, setSelectedTable] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return setErrorMessage('Full name is required to secure a host.');
    if (!formData.email.trim()) return setErrorMessage('Please provide a secure email address.');
    if (!formData.phone.trim()) return setErrorMessage('Please provide a contact phone number.');
    if (!formData.date) return setErrorMessage('When would you like to dine with us? Select a date.');
    if (!formData.time) return setErrorMessage('Please pick your preferred reservation arrival time.');
    if (formData.guests < 1) return setErrorMessage('Seating is limited. Select a guest count of at least one.');

    setLoading(true);
    setErrorMessage('');

    // Mock network lag for authentic fine-dining system sync
    setTimeout(() => {
      setLoading(false);
      // Generate randomized ticket data
      const randomSeatingNum = Math.floor(Math.random() * 24) + 1;
      const refCode = 'FLV-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      
      setTicketID(refCode);
      setSelectedTable(`Alcov-Table ${randomSeatingNum}`);
      setBookingConfirmed(true);
    }, 1500);
  };

  const resetBooking = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: ''
    });
    setBookingConfirmed(false);
    setTicketID('');
  };

  return (
    <section id="reservation" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Dynamic decorative backdrop grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015]" />
      <div className="absolute -bottom-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-amber-500" />
              <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase">
                RESERVATIONS
              </span>
              <span className="w-6 h-[1px] bg-amber-500" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              Make Your Reservation
            </h2>
            <p className="font-sans text-xs text-neutral-400 mt-2 font-light max-w-sm mx-auto uppercase tracking-wider">
              Experience dining redefined with custom host assignments.
            </p>
          </AnimatedSection>
        </div>

        {/* Content Box */}
        <AnimatedSection animation="scale-in" duration={0.9} delay={0.2}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            {!bookingConfirmed ? (
              // Active Booking Panel
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left Side: Detail column */}
                <div className="md:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-neutral-950 to-neutral-900/40 border-r border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[10px] tracking-widest text-amber-500 font-bold uppercase block mb-2">
                      ✦ FLAVORO EXPERIENCE ✦
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-4">
                      Book Your Dining Sanctuary
                    </h3>
                    <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      To safeguard our serene dining environment, we manage limited host allocations. Reserve early to experience seasonal specialties with customized butler support.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 text-xs text-neutral-300 font-sans font-light">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Lunch: 11:30 AM — 2:30 PM</span>
                    </div>
                    <div className="flex items-center gap-3.5 text-xs text-neutral-300 font-sans font-light">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Dinner: 5:00 PM — 10:00 PM</span>
                    </div>
                    <div className="flex items-center gap-3.5 text-xs text-neutral-400 font-sans font-medium">
                      <Smartphone className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
                      <span>Hotline: +1 (555) 794.0200</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Responsive Form */}
                <form onSubmit={handleBookNow} className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                  
                  {/* Validation Toast */}
                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {/* Full Name */}
                    <div className="relative">
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        FULL NAME
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. James Watson"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 focus:border-amber-500 font-sans tracking-wide outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        EMAIL ADDRESS
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. james@gmail.com"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 focus:border-amber-500 font-sans tracking-wide outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        PHONE NUMBER
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +1 555-0192"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 focus:border-amber-500 font-sans tracking-wide outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Guest Capacity */}
                    <div>
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        NUMBER OF GUESTS
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:border-amber-500/80 font-sans tracking-wide outline-none transition-colors appearance-none"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons</option>
                          <option value="6">6 Persons</option>
                          <option value="8">8+ (Private Room)</option>
                        </select>
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        SELECT DATE
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 focus:border-amber-500/80 font-sans tracking-wide outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time Picker */}
                    <div>
                      <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                        PREFERRED TIME
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:border-amber-500/80 font-sans tracking-wide outline-none transition-colors appearance-none"
                        >
                          <option value="">Choose arrival slot...</option>
                          <option value="11:30 AM">11:30 AM (Lunch)</option>
                          <option value="12:30 PM">12:30 PM (Lunch)</option>
                          <option value="01:30 PM">1:30 PM (Lunch)</option>
                          <option value="05:30 PM">5:30 PM (Dinner)</option>
                          <option value="06:30 PM">6:30 PM (Dinner)</option>
                          <option value="07:30 PM">7:30 PM (Dinner)</option>
                          <option value="08:30 PM">8:30 PM (Dinner)</option>
                          <option value="09:30 PM">9:30 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special notes */}
                  <div className="mb-6">
                    <label className="block text-[10px] tracking-wider text-neutral-400 uppercase font-sans mb-1.5 font-semibold">
                      DIETARY / ALLERGIES / PRIVATE SEATING COMMENTS
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="..."
                      rows={2}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-600 focus:border-amber-500/80 font-sans outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Action */}
                  <div className="mt-2 text-right">
                    <Magnet range={25}>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-widest uppercase roundedtransition-colors cursor-pointer font-sans shadow shadow-amber-500/10 flex items-center gap-2 justify-center ml-auto active:scale-95 disabled:opacity-50"
                      >
                        {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        {loading ? 'SYNCHRONIZING...' : 'BOOK MY TABLE'}
                      </button>
                    </Magnet>
                  </div>

                </form>

              </div>
            ) : (
              // Seating Ticket Confirmation View
              <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-neutral-900 to-neutral-950 flex flex-col items-center justify-center relative">
                
                {/* Embedded Ticket Graphic */}
                <div className="max-w-md w-full border border-dashed border-amber-500/40 bg-neutral-950 rounded-2xl p-6 sm:p-8 relative shadow-2xl overflow-hidden mb-6">
                  {/* Punch Hole effects */}
                  <div className="h-6 w-6 rounded-full bg-neutral-900 absolute -left-3 top-1/2 -translate-y-1/2 border-r border-neutral-800/80" />
                  <div className="h-6 w-6 rounded-full bg-neutral-900 absolute -right-3 top-1/2 -translate-y-1/2 border-l border-neutral-800/80" />

                  {/* Ticket Header */}
                  <div className="flex flex-col items-center pb-4 border-b border-neutral-800/80 mb-6">
                    <CheckCircle2 className="w-12 h-12 text-amber-500 mb-3 animate-bounce" />
                    <span className="text-[9px] tracking-[0.4em] text-amber-500 font-bold uppercase">
                      RESERVATION TICKET
                    </span>
                    <h4 className="font-serif text-white font-bold text-xl mt-1">Confirmed & Secured</h4>
                  </div>

                  {/* Ticket core content */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 text-left text-neutral-300 font-sans text-xs mb-6">
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">TICKET ID</span>
                      <strong className="text-white text-base font-serif font-bold text-amber-500">{ticketID}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">ASSIGNED TABLE</span>
                      <strong className="text-white text-xs">{selectedTable}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">VIP GUEST</span>
                      <span className="text-white font-semibold truncate block">{formData.name}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">PARTY SIZE</span>
                      <span className="text-white font-semibold block">{formData.guests} Guest(s)</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">DATE</span>
                      <span className="text-white font-semibold block">{formData.date}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">HOST DESK IN</span>
                      <span className="text-white font-semibold block">{formData.time}</span>
                    </div>
                  </div>

                  {/* Ticket Footer details */}
                  <div className="pt-4 border-t border-dashed border-neutral-800 text-[9px] text-neutral-500 text-center font-sans">
                    Present this ticket ID or Name barcode upon your arrival at the host podium.
                  </div>
                </div>

                {/* Return actions */}
                <span className="text-xs text-neutral-400 font-sans mb-6">
                  A verification confirmation has been sent to <strong className="text-white">{formData.email}</strong>. See you soon!
                </span>

                <button
                  onClick={resetBooking}
                  className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs tracking-wide uppercase rounded flex items-center gap-2 cursor-pointer duration-300 transition-all font-sans"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  BOOK ANOTHER TABLE
                </button>

              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
