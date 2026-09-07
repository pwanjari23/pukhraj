'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, MessageCircle, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createAppointmentWhatsAppLink } from '@/utils/whatsapp';
import businessData from '@/data/business.json';

export default function AppointmentModal({ isOpen, onClose }) {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    setSubmittedData(data);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#DFBA73', '#FAF8F5']
      });
    } catch (e) {}
  };

  const handleReset = () => {
    setSubmittedData(null);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-modal rounded-sm p-6 sm:p-8 z-10 border border-[#C5A059]/40 shadow-2xl"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleReset}
            aria-label="Close appointment modal"
            className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          {!submittedData ? (
            <div>
              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
                  Private Showroom Viewing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1">
                  Book A Personal Consultation
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-2">
                  Experience undivided attention from our senior diamond and bridal specialists at our Nagpur flagship showroom.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Please enter your name' })}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-sm text-white font-sans placeholder:text-neutral-500 focus:outline-none"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.name.message}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                    Mobile Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\s-]{8,15}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-sm text-white font-sans placeholder:text-neutral-500 focus:outline-none"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.phone.message}</span>
                  )}
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      {...register('date', { required: 'Please pick a date' })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                    />
                    {errors.date && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.date.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                      Preferred Time *
                    </label>
                    <select
                      {...register('time', { required: 'Please select a time' })}
                      className="w-full px-3 py-2 bg-[#121215] border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning (11:00 AM – 1:00 PM)">Morning (11 AM – 1 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1 PM – 4 PM)</option>
                      <option value="Evening (4:00 PM – 7:30 PM)">Evening (4 PM – 7:30 PM)</option>
                    </select>
                    {errors.time && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.time.message}</span>
                    )}
                  </div>
                </div>

                {/* Interested In */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                    Interested In
                  </label>
                  <select
                    {...register('interest')}
                    className="w-full px-3 py-2 bg-[#121215] border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans focus:outline-none"
                  >
                    <option value="Bridal Jewellery Suites">Bridal Jewellery Suites</option>
                    <option value="22K Solid Gold Collections">22K Solid Gold Collections</option>
                    <option value="Diamond Solitaires & Rings">Diamond Solitaires & Rings</option>
                    <option value="Polki & Kundan Artistry">Polki & Kundan Artistry</option>
                    <option value="Custom Bespoke Jewellery Design">Custom Bespoke Jewellery Design</option>
                    <option value="Astrological Ceylon Yellow Sapphire (Pukhraj)">Astrological Yellow Sapphire (Pukhraj)</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-sans mb-1">
                    Special Requests or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    {...register('message')}
                    placeholder="Mention specific designs, weight preferences, or family member count..."
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/15 focus:border-[#C5A059] rounded-sm text-xs text-white font-sans placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black text-xs font-sans uppercase tracking-widest font-semibold rounded-sm transition-all shadow-lg shadow-[#C5A059]/20 hover:brightness-110"
                >
                  Confirm In-Store Appointment
                </button>
              </form>
            </div>
          ) : (
            /* Submission Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#FAF8F5]">
                  Consultation Request Received
                </h3>
                <p className="text-xs text-neutral-300 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-[#C5A059] font-medium">{submittedData.name}</span>. Our concierge at the Nagpur showroom will confirm your private suite appointment for{' '}
                  <span className="text-white font-medium">{submittedData.date}</span> ({submittedData.time}).
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-xs font-sans text-neutral-300 text-left space-y-1.5 max-w-sm mx-auto">
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{businessData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Mon-Sat: 10:30 AM – 8:30 PM</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={createAppointmentWhatsAppLink(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue on WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-sans text-neutral-400 hover:text-white uppercase tracking-wider py-1"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
