import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, Calendar } from 'lucide-react';
import businessData from '@/data/business.json';
import SectionHeading from '@/components/common/SectionHeading';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export const metadata = {
  title: 'Our Heritage & Artistry',
  description: `Discover the royal legacy of ${businessData.name}, Nagpur. Handcrafted 22K hallmarked gold and certified diamonds.`
};

export default function AboutPage() {
  const values = [
    {
      title: '100% BIS Hallmarked Purity',
      desc: 'Every gram of gold is certified with the government 6-digit HUID stamp. Purity testing is transparently available using on-site XRF analyzers.',
      icon: ShieldCheck
    },
    {
      title: 'Master Karigari of Vidarbha',
      desc: 'Our jewellery honors traditional Maharashtrian Peshwai and imperial Central Indian motifs, sculpted by master craftsmen over decades.',
      icon: Award
    },
    {
      title: 'Private Lounge Experience',
      desc: 'We treat every bridal family with royal deference in our dedicated private viewing suites with personalized styling.',
      icon: HeartHandshake
    }
  ];

  return (
    <div className="pt-28 pb-24 text-neutral-200">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
          The Legacy of Nagpur
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] mt-2 mb-4">
          Heirloom Craftsmanship, Sacred Devotion
        </h1>
        <p className="text-xs sm:text-base text-neutral-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
          At Pukhraj Jewellers, jewellery is not simply an ornament—it is a sacred vessel of family emotion, blessings, and everlasting legacy.
        </p>
      </div>

      {/* Main Story Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-sm overflow-hidden border border-[#C5A059]/30 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Master karigar sculpting 22K gold necklace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm font-sans font-light leading-relaxed text-neutral-300">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold block">
              The Pukhraj Origin
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal leading-tight">
              Named After Jupiter's Most Auspicious Gem
            </h2>
            <p>
              Our establishment takes its revered name from <em>Pukhraj</em>—the radiant Yellow Sapphire associated with Jupiter (Brihaspati). In Indian tradition, Pukhraj symbolizes cosmic wisdom, supreme virtue, prosperity, and joy.
            </p>
            <p>
              Located in the commercial heart of Nagpur, Maharashtra, Pukhraj Jewellers was envisioned as a sanctuary where families can acquire authentic hallmarked gold, diamond solitaires, and sacred pooja silver with total peace of mind.
            </p>
            <p>
              Every diamond is graded with strict laboratory standards, and every piece of gold carries the Government of India's BIS 916 hallmarking laser inscription.
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-xs space-y-1">
              <span className="text-[#C5A059] font-medium block">Showroom Legacy (Verification Note)</span>
              <p className="text-neutral-400">
                Detailed founding milestones and historical family archives: <span className="text-white">VERIFY_WITH_OWNER</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Values */}
      <div className="bg-[#121215] py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Uncompromising Integrity"
            title="The Three Pillars of Pukhraj"
            subtitle="How we maintain lifelong bonds with Central India's most discerning families."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-8 bg-[#16161c] border border-white/10 hover:border-[#C5A059]/40 rounded-sm space-y-4 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-[#FAF8F5]">{v.title}</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Showroom Visit CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] mb-3">
          We Welcome You to Our Nagpur Showroom
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-lg mx-auto leading-relaxed mb-8">
          Walk in to experience our jewellery collections in person, or pre-book a private suite viewing with our master stylists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20"
          >
            Showroom Location & Directions
          </Link>
          <WhatsAppButton
            variant="outline"
            size="lg"
            message="Hi Pukhraj Jewellers, I would like to schedule a visit to your showroom."
            className="text-xs"
          >
            Connect on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
