'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, ArrowDown, ShieldCheck, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import businessData from '@/data/business.json';

export default function Hero({ onOpenAppointment }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const heroPosterSrc = businessData.heroPoster || '/images/hero-poster.webp';
  const heroVideoSrc = businessData.heroVideo || '/videos/pukhraj-hero.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Autoplay fallback to user play:', err);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#09090b]">
      {/* 0ms: Full-Screen Cinematic Video Hero with Poster Fallback */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Poster Image (graceful fallback) */}
        <Image
          src={heroPosterSrc}
          alt="Pukhraj Jewellers Royal Indian Gold & Diamond Suite"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-85'
          }`}
        />

        {/* Cinematic Video Element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          onLoadedData={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          onTimeUpdate={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        >
          <source src={heroVideoSrc} type="video/mp4" />
          <source src="/videos/pukhraj-hero.webm" type="video/webm" />
        </video>

        {/* Multilayer Darkened Luxury Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/35" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#09090b]/30 to-[#09090b]" />
      </motion.div>

      {/* Hero Video Controls Badge in bottom corner */}
      <div className="absolute bottom-8 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-neutral-300 text-xs select-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] uppercase font-sans tracking-widest text-[#E2C792] font-medium">Cinematic Reel</span>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
          className="p-1 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Hero Audio" : "Mute Hero Audio"}
          className="p-1 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Hero Core Content with Staggered Framer Motion Sequence */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* 300ms: Eyebrow text badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E2C792] text-xs uppercase tracking-[0.25em] font-sans font-medium mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>The Digital Flagship • Nagpur</span>
        </motion.div>

        {/* 500ms: Staggered Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF8F5] uppercase font-light leading-[1.08] max-w-4xl"
        >
          JEWELLERY THAT <br className="hidden sm:inline" />
          <span className="text-gold-gradient font-normal italic">TELLS YOUR STORY</span>
        </motion.h1>

        {/* Gold Hairline Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
          className="h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent my-6"
        />

        {/* 800ms: Description Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl font-sans text-neutral-300 font-light max-w-2xl leading-relaxed mb-8 sm:mb-10"
        >
          {businessData.subTagline || "Timeless craftsmanship for life's most unforgettable moments."}
        </motion.p>

        {/* 1000ms & 1300ms: Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] hover:brightness-110 text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 transition-all transform hover:-translate-y-0.5 inline-block text-center"
            >
              Explore Collection
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
            className="w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-[#FAF8F5] border border-white/20 hover:border-[#C5A059] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>Book A Store Visit</span>
            </button>
          </motion.div>
        </div>

        {/* Purity Guarantee Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-400 font-sans tracking-wider"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>100% BIS Hallmarked 22K/18K</span>
          </div>
          <span className="text-white/20">•</span>
          <div>IGI / SGL Certified Diamonds</div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="hidden sm:inline">Nagpur Showroom</div>
        </motion.div>
      </div>

      {/* 1600ms: Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-neutral-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
