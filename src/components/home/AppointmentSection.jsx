'use client';

import { Calendar, Sparkles, MapPin, Clock, ShieldCheck } from 'lucide-react';
import businessData from '@/data/business.json';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function AppointmentSection({ onOpenAppointment }) {
  return (
    <section className="py-10 sm:py-14 md:py-28 bg-[#121215] text-[#FAF8F5] relative border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#18181d] to-[#121215] border border-[#C5A059]/30 rounded-sm p-5 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Ambient Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Showroom Viewing</span>
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] leading-tight">
                Book A Personal Jewellery Consultation
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                Whether selecting an heirloom bridal suite, an engagement solitaire, or exploring custom design karigari, let our master consultants reserve an undivided private viewing suite for you at our Nagpur showroom.
              </p>

              <div className="pt-1 sm:pt-2 flex flex-wrap gap-3 sm:gap-4 text-xs text-neutral-400 font-sans">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
                  <span>Private Suite</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
                  <span>Flexible Viewing Slots</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 min-touch-target"
              >
                <Calendar className="w-4 h-4" />
                <span>Book A Private Visit</span>
              </button>

              <WhatsAppButton
                variant="outline"
                size="md"
                message="Hi Pukhraj Jewellers, I would like to book an in-store jewellery appointment."
                className="w-full justify-center text-xs min-touch-target"
              >
                Book via WhatsApp
              </WhatsAppButton>

              <p className="text-[10px] sm:text-[11px] text-center text-neutral-400 font-sans mt-0.5">
                Prefer to call directly?{' '}
                <a href={`tel:${businessData.phoneRaw || '+917120000000'}`} className="text-[#C5A059] hover:underline">
                  {businessData.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
