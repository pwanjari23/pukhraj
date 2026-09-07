'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

export default function ProductGallery({ images = [], productName = 'Jewellery Piece' }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const galleryImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'];

  const activeImage = galleryImages[selectedIdx] || galleryImages[0];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      {galleryImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIdx(index)}
              className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-sm overflow-hidden shrink-0 border transition-all duration-300 ${
                selectedIdx === index
                  ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                  : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Showcase Image with Hover Zoom */}
      <div
        className="relative flex-1 aspect-[4/5] bg-[#18181d] rounded-sm overflow-hidden border border-white/10 group cursor-crosshair select-none"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover object-center transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                    }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Hint Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-sm border border-white/10 flex items-center gap-1.5 text-[11px] text-neutral-300 font-sans pointer-events-none group-hover:opacity-0 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Hover to Zoom</span>
        </div>
      </div>
    </div>
  );
}
