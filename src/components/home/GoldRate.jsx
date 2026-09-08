'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import goldRatesData from '@/data/goldRates.json';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function GoldRate() {
  const rates = goldRatesData.rates || {};
  const changes = goldRatesData.changes || {};

  const items = [
    {
      purity: '22K Standard Gold',
      rate: rates['22K'] || '72,850',
      change: changes['22K'] || '+₹240',
      unit: goldRatesData.unitGold,
      badge: '916 Hallmarked'
    },
    {
      purity: '24K Pure Gold',
      rate: rates['24K'] || '79,470',
      change: changes['24K'] || '+₹280',
      unit: goldRatesData.unitGold,
      badge: '999 Bullion'
    },
    {
      purity: '18K Diamond Gold',
      rate: rates['18K'] || '59,600',
      change: changes['18K'] || '+₹190',
      unit: goldRatesData.unitGold,
      badge: '750 Hallmarked'
    },
    {
      purity: 'Pure Silver (999)',
      rate: rates['silver'] || '94,200',
      change: changes['silver'] || '-₹150',
      unit: goldRatesData.unitSilver,
      badge: 'Bullion Grade'
    }
  ];

  return (
    <section id="gold-rate" className="py-12 bg-[#0d0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex flex-col">
              <h2 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] tracking-wide flex items-center gap-2">
                <span>Today&apos;s Bullion & Gold Rates</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#E2C792] font-sans font-normal uppercase tracking-wider">
                  Nagpur Market
                </span>
              </h2>
              <span className="text-xs text-neutral-400 font-sans flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {goldRatesData.lastUpdated}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline">
              Lock in your rate with a zero-discrepancy advance:
            </span>
            <WhatsAppButton
              size="sm"
              variant="outline"
              message="Hi Pukhraj Jewellers, I would like to enquire about today's live booking gold rate."
            >
              Enquire Live Rate
            </WhatsAppButton>
          </div>
        </div>

        {/* Rate Display Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => (
            <motion.div
              key={item.purity}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-sm bg-[#141418] border border-white/10 hover:border-[#C5A059]/40 transition-colors relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider font-sans text-neutral-400">
                  {item.purity}
                </span>
                <span className="text-[9px] font-sans text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>

              <div className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal tracking-tight">
                ₹{item.rate}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-sans">
                <span className="text-neutral-400">{item.unit}</span>
                <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {item.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="mt-4 p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-sm flex items-center gap-2 text-[11px] text-amber-200/90 font-sans">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Prototype Notice:</strong> {goldRatesData.disclaimer}
          </span>
        </div>
      </div>
    </section>
  );
}
