'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, HelpCircle, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import businessData from '@/data/business.json';
import faqsData from '@/data/faqs.json';
import { createAppointmentWhatsAppLink } from '@/utils/whatsapp';
import DirectionsButton from '@/components/common/DirectionsButton';
import CallButton from '@/components/common/CallButton';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    setSubmitted(data);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#DFBA73', '#FAF8F5']
      });
    } catch (e) {}
  };

  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  return (
    <div className="pt-28 pb-24 text-neutral-200">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
          Nagpur Flagship Showroom
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] mt-2 mb-4">
          Connect With Our Connoisseurs
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-xl mx-auto">
          Visit our showroom in Nagpur for an unforgettable jewellery viewing experience, or contact our concierge team directly via WhatsApp or phone.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Showroom Card (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#141418] border border-[#C5A059]/30 rounded-sm space-y-6 shadow-2xl">
              <div>
                <h3 className="font-serif text-2xl text-[#FAF8F5] mb-2">
                  {businessData.name}
                </h3>
                <span className="text-xs text-[#C5A059] uppercase tracking-wider font-sans">
                  {businessData.city}, Maharashtra
                </span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Showroom Address</span>
                    <p className="text-neutral-200 text-sm mt-0.5 leading-relaxed">
                      {businessData.address}
                    </p>
                    <span className="text-[11px] text-[#C5A059] mt-0.5 block">{businessData.landmark}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Telephone Inquiries</span>
                    <a href={`tel:${rawPhone}`} className="text-neutral-200 text-sm font-medium hover:text-[#C5A059]">
                      {businessData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Official Email</span>
                    <a href={`mailto:${businessData.email}`} className="text-neutral-200 text-sm hover:text-[#C5A059]">
                      {businessData.email}
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    Visiting Hours
                  </span>
                  {businessData.openingHours?.map((oh, i) => (
                    <div key={i} className="flex items-center justify-between py-1 text-neutral-300">
                      <span>{oh.days}</span>
                      <span className="text-neutral-400">{oh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <DirectionsButton size="md" variant="gold" className="w-full justify-center text-xs">
                  Get Google Directions
                </DirectionsButton>

                <div className="grid grid-cols-2 gap-2.5">
                  <CallButton size="sm" variant="outline" className="w-full justify-center text-xs">
                    Call Store
                  </CallButton>
                  <WhatsAppButton size="sm" variant="primary" className="w-full justify-center text-xs">
                    WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment / Consultation Form (Right Column) */}
          <div id="appointment" className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#121215] border border-white/10 rounded-sm shadow-2xl">
              {!submitted ? (
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold block mb-1">
                    Direct Booking
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mb-2">
                    Schedule In-Store Consultation
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans mb-8">
                    Let our master jewellery stylists prepare a personalized viewing lounge tailored to your aesthetic.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-sm text-white font-sans focus:outline-none"
                        />
                        {errors.name && (
                          <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.name.message}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: /^[0-9+\s-]{8,15}$/, message: 'Valid number required' }
                          })}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-sm text-white font-sans focus:outline-none"
                        />
                        {errors.phone && (
                          <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.phone.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          {...register('date', { required: 'Please select a date' })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                        />
                        {errors.date && (
                          <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.date.message}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                          Preferred Viewing Time *
                        </label>
                        <select
                          {...register('time', { required: 'Please choose time' })}
                          className="w-full px-3 py-2 bg-[#141418] border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                        >
                          <option value="">Choose Time Slot</option>
                          <option value="Morning (11:00 AM – 1:00 PM)">Morning (11 AM – 1 PM)</option>
                          <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1 PM – 4 PM)</option>
                          <option value="Evening (4:00 PM – 7:30 PM)">Evening (4 PM – 7:30 PM)</option>
                        </select>
                        {errors.time && (
                          <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.time.message}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                        Interested Collection
                      </label>
                      <select
                        {...register('interest')}
                        className="w-full px-3 py-2 bg-[#141418] border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                      >
                        <option value="Bridal Jewellery Suites">Bridal Jewellery Suites</option>
                        <option value="22K Solid Gold Collections">22K Solid Gold Collections</option>
                        <option value="Diamond Solitaires & Rings">Diamond Solitaires & Rings</option>
                        <option value="Polki & Kundan Artistry">Polki & Kundan Artistry</option>
                        <option value="Custom Bespoke Jewellery Design">Custom Bespoke Jewellery Design</option>
                        <option value="Astrological Ceylon Yellow Sapphire (Pukhraj)">Astrological Yellow Sapphire (Pukhraj)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                        Notes or Specific Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        {...register('message')}
                        placeholder="Tell us if you are matching a specific bridal lehenga or require gold karatage testing..."
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition-all"
                    >
                      Confirm Showroom Consultation
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
                      Consultation Booking Reserved
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-[#C5A059] font-medium">{submitted.name}</span>. Our senior jewellery specialist will confirm your private suite appointment for{' '}
                      <span className="text-white font-medium">{submitted.date}</span> ({submitted.time}).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <a
                      href={createAppointmentWhatsAppLink(submitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm Faster via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(null);
                        reset();
                      }}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-neutral-300 text-xs font-sans uppercase tracking-wider rounded-sm"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-white/10">
        <SectionHeading
          tag="Transparency & Clarity"
          title="Frequently Asked Questions"
          subtitle="Clear answers on our hallmarking, old gold exchange, diamond grading, and bespoke design procedures."
        />

        <div className="space-y-3">
          {faqsData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-white/10 rounded-sm overflow-hidden bg-[#121215] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-[#FAF8F5] hover:text-[#C5A059] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
