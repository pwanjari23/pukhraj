'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';
import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';
import InstagramButton from '@/components/common/InstagramButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function InstagramSection() {
  const posts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=85',
      likes: '1.4k',
      tag: '#PukhrajBride'
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=85',
      likes: '980',
      tag: '#DiamondSolitaire'
    },
    {
      id: 'ig-3',
      image: '/images/hero/necklace.jpg',
      likes: '2.1k',
      tag: '#TempleJewellery'
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=85',
      likes: '1.2k',
      tag: '#GoldKadas'
    },
    {
      id: 'ig-5',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=85',
      likes: '890',
      tag: '#NagpurJewellers'
    },
    {
      id: 'ig-6',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85',
      likes: '1.7k',
      tag: '#PukhrajSapphire'
    }
  ];

  return (
    <section className="py-10 sm:py-14 md:py-28 bg-[#121215] text-[#FAF8F5] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          tag="Social Connoisseurship"
          title="Follow The Sparkle"
          subtitle={`Join our digital jewellery salon at ${businessData.instagramHandle || '@pukhrajjewellers_nagpur'} for behind-the-scenes karigari and latest bridal reveals.`}
        />

        {/* Mobile: Compact Horizontal Visual Strip */}
        <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2.5 pb-2 mb-6 -mx-4 px-4">
          {posts.map((post) => (
            <a
              key={`mobile-ig-${post.id}`}
              href={businessData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram post ${post.tag}`}
              className="w-[42vw] max-w-[160px] aspect-square rounded-sm overflow-hidden bg-black/40 border border-white/10 shrink-0 snap-start relative block shadow-md"
            >
              <Image
                src={post.image}
                alt={`Instagram Post ${post.tag}`}
                fill
                sizes="160px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] font-sans text-neutral-300 truncate">
                  {post.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop: 6-Grid Social Posts (100% Unchanged) */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={businessData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative aspect-square rounded-sm overflow-hidden bg-black/40 border border-white/10 block shadow-md"
            >
              <Image
                src={post.image}
                alt={`Instagram Post ${post.tag}`}
                fill
                sizes="200px"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center gap-1.5">
                <InstagramIcon className="w-5 h-5 text-[#C5A059]" />
                <span className="text-[11px] font-sans font-medium text-white flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                  {post.likes}
                </span>
                <span className="text-[10px] font-sans text-neutral-300 truncate max-w-full">
                  {post.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Official Instagram Follow CTA */}
        <div className="inline-block">
          <InstagramButton size="lg" variant="gradient">
            Follow {businessData.instagramHandle || '@pukhrajjewellers_nagpur'}
          </InstagramButton>
        </div>
      </div>
    </section>
  );
}
