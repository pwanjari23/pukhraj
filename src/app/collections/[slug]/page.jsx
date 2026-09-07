import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import productsData from '@/data/products.json';
import ProductGrid from '@/components/products/ProductGrid';
import businessData from '@/data/business.json';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const col = collectionsData.find((c) => c.slug === slug);
  if (!col) return { title: 'Collection' };

  return {
    title: `${col.name} - Royal Heritage Collection`,
    description: col.description || `Explore ${col.name} at ${businessData.name}, ${businessData.city}.`
  };
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const collection = collectionsData.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Matching products
  const matchingProducts = productsData.filter((p) => {
    return (
      p.category.toLowerCase().includes(collection.name.toLowerCase()) ||
      collection.name.toLowerCase().includes(p.category.toLowerCase()) ||
      p.subcategory.toLowerCase() === collection.name.toLowerCase() ||
      (p.tags || []).some((t) => t.toLowerCase() === collection.slug.toLowerCase())
    );
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Catalogue */}
      <div className="mb-6">
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#E2C792] font-sans transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Collections</span>
        </Link>
      </div>

      {/* Hero Header Banner */}
      <div className="relative rounded-sm overflow-hidden bg-[#141418] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
            {collection.tag || 'Royal Atelier'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5]">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            {collection.description}
          </p>
          <div className="text-xs text-neutral-400 font-sans pt-2">
            Showcasing {matchingProducts.length} certified creations
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141418] to-transparent" />
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={matchingProducts.length > 0 ? matchingProducts : productsData.slice(0, 8)}
        emptyTitle="No Specific Pieces In This Category"
        emptyDescription="Please view our complete catalogue for alternative hallmarked designs."
      />
    </div>
  );
}
