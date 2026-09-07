'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Calendar, Trash2, CheckCircle2, Plus } from 'lucide-react';
import productsData from '@/data/products.json';
import { createBridalLookWhatsAppLink } from '@/utils/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';

export default function BridalLookBuilder({ onOpenAppointment }) {
  // Available pool of pieces from JSON
  const necklaces = productsData.filter((p) => p.bridalPieceType === 'necklace' || p.subcategory === 'Necklaces');
  const earrings = productsData.filter((p) => p.bridalPieceType === 'earrings' || p.subcategory === 'Earrings' || p.subcategory === 'Chandbalis');
  const bangles = productsData.filter((p) => p.bridalPieceType === 'bangles' || p.subcategory === 'Bangles');
  const maangTikkas = productsData.filter((p) => p.bridalPieceType === 'maangTikka' || p.tags?.includes('bridal'));
  const naths = productsData.filter((p) => p.bridalPieceType === 'nath');

  // Selected state for each component of the bridal suite
  const [selectedNecklace, setSelectedNecklace] = useState(necklaces[0] || null);
  const [selectedEarrings, setSelectedEarrings] = useState(earrings[0] || null);
  const [selectedBangles, setSelectedBangles] = useState(bangles[0] || null);
  const [selectedMaangTikka, setSelectedMaangTikka] = useState(maangTikkas[0] || null);
  const [selectedNath, setSelectedNath] = useState(naths[0] || null);

  const [activeSlot, setActiveSlot] = useState('necklace'); // current slot for selecting from list
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Array of currently chosen items
  const currentSuite = [
    { slotId: 'necklace', title: 'Royal Choker / Haar', item: selectedNecklace, pool: necklaces, setter: setSelectedNecklace },
    { slotId: 'earrings', title: 'Earrings / Jhumkas', item: selectedEarrings, pool: earrings, setter: setSelectedEarrings },
    { slotId: 'bangles', title: 'Bridal Bangles / Kadas', item: selectedBangles, pool: bangles, setter: setSelectedBangles },
    { slotId: 'maangTikka', title: 'Maang Tikka', item: selectedMaangTikka, pool: maangTikkas, setter: setSelectedMaangTikka },
    { slotId: 'nath', title: 'Maharashtrian Motya Nath', item: selectedNath, pool: naths, setter: setSelectedNath }
  ];

  const selectedCount = currentSuite.filter((s) => Boolean(s.item)).length;

  const handleSaveLook = () => {
    try {
      const savedLook = currentSuite
        .filter((s) => Boolean(s.item))
        .map((s) => ({ pieceType: s.slotId, name: s.item.name, purity: s.item.purity, id: s.item.id }));
      localStorage.setItem('pukhraj_custom_bridal_look', JSON.stringify(savedLook));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (e) {}
  };

  // WhatsApp link preparation
  const lookItemsForWhatsApp = currentSuite
    .filter((s) => Boolean(s.item))
    .map((s) => ({
      pieceType: s.title,
      name: s.item.name,
      purity: s.item.purity || '22K'
    }));

  const whatsappUrl = createBridalLookWhatsAppLink(lookItemsForWhatsApp);

  const activeSlotObj = currentSuite.find((s) => s.slotId === activeSlot) || currentSuite[0];

  return (
    <section className="py-20 md:py-28 bg-[#09090b] relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Interactive Atelier"
          title="Bridal Look Builder"
          subtitle="Assemble your bespoke wedding trousseau piece by piece. Mix royal chokers, jhumkas, kadas, and naths to visualize your complete bridal majesty."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Assembled Look Board (Visual Silhouette) */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#C5A059]/30 rounded-sm p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans">
                  The Royal Trousseau
                </span>
                <h3 className="font-serif text-2xl text-[#FAF8F5]">
                  Your Customized Suite ({selectedCount} of 5 Adornments)
                </h3>
              </div>
              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-sans animate-fade">
                  <CheckCircle2 className="w-4 h-4" />
                  Look Saved!
                </span>
              )}
            </div>

            {/* Assembled Slots List */}
            <div className="space-y-3">
              {currentSuite.map((slot) => {
                const isSelectedSlot = activeSlot === slot.slotId;
                const piece = slot.item;

                return (
                  <div
                    key={slot.slotId}
                    onClick={() => setActiveSlot(slot.slotId)}
                    className={`p-3.5 rounded-sm border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelectedSlot
                        ? 'bg-[#C5A059]/15 border-[#C5A059] ring-1 ring-[#C5A059]/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-black/60 shrink-0 border border-white/10">
                        {piece ? (
                          <Image
                            src={piece.image}
                            alt={piece.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                            Empty
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans block">
                          {slot.title}
                        </span>
                        <h4 className="font-serif text-base text-[#FAF8F5]">
                          {piece ? piece.name : 'Tap to select this piece'}
                        </h4>
                        {piece && (
                          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-sans">
                            <span>{piece.purity}</span>
                            <span>•</span>
                            <span>~{piece.weight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {piece ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            slot.setter(null);
                          }}
                          aria-label={`Remove ${slot.title}`}
                          className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="p-1.5 rounded-full bg-[#C5A059]/20 text-[#C5A059]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSaveLook}
                className="flex-1 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF8F5] text-xs font-sans uppercase tracking-widest font-medium rounded-sm transition-colors"
              >
                Save Look
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex-1 py-3 bg-[#C5A059] hover:bg-[#b08d47] text-black text-xs font-sans uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Column: Piece Selector Drawer */}
          <div className="lg:col-span-5 bg-[#141418] border border-white/10 rounded-sm p-6 sm:p-8">
            <div className="border-b border-white/10 pb-4 mb-5">
              <span className="text-xs uppercase tracking-wider text-[#C5A059] font-sans">
                Choose Options For
              </span>
              <h4 className="font-serif text-xl text-[#FAF8F5] mt-1">
                {activeSlotObj.title}
              </h4>
            </div>

            {/* Selector Grid */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
              {activeSlotObj.pool.map((product) => {
                const isCurrentChoice = activeSlotObj.item?.id === product.id;

                return (
                  <div
                    key={product.id}
                    onClick={() => activeSlotObj.setter(product)}
                    className={`p-3 rounded-sm border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                      isCurrentChoice
                        ? 'bg-[#C5A059]/20 border-[#C5A059]'
                        : 'bg-white/5 border-white/10 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-black shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-sm text-[#FAF8F5] line-clamp-1">
                          {product.name}
                        </h5>
                        <div className="text-[10px] text-neutral-400 font-sans mt-0.5">
                          {product.purity} • {product.weight || 'On Request'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-2.5 py-1 text-[11px] font-sans rounded-sm uppercase tracking-wider ${
                        isCurrentChoice
                          ? 'bg-[#C5A059] text-black font-semibold'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {isCurrentChoice ? 'Selected' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
