import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, User, CheckCircle, Share2, Sparkles, ArrowRight } from 'lucide-react';
import articlesData from '@/data/articles.json';
import businessData from '@/data/business.json';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export async function generateStaticParams() {
  return articlesData.map((art) => ({
    slug: art.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title}`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${businessData.name}`,
      description: article.excerpt,
      images: [{ url: article.image }]
    }
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = articlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <article className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#E2C792] font-sans transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal & Guides</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-sans font-semibold bg-[#C5A059]/15 text-[#E2C792] border border-[#C5A059]/30 rounded">
            {article.category}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-sans pt-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <User className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{article.author}</span>
          </div>
          <span>•</span>
          <div>{article.date}</div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-black/40 mb-10 border border-white/10 shadow-2xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="space-y-6 text-neutral-300 font-sans font-light leading-relaxed text-sm sm:text-base border-b border-white/10 pb-12">
        {article.content?.map((block, idx) => {
          if (block.type === 'heading') {
            return (
              <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] pt-4 text-left">
                {block.text}
              </h2>
            );
          }
          return (
            <p key={idx} className="text-neutral-300 leading-relaxed font-light">
              {block.text}
            </p>
          );
        })}

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="my-8 p-6 bg-[#141418] border border-[#C5A059]/30 rounded-sm space-y-3">
            <h3 className="font-serif text-lg text-[#E2C792] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Connoisseur Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Consult Master Karigars CTA */}
      <div className="my-12 p-8 bg-[#121215] border border-[#C5A059]/25 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-serif text-2xl text-[#FAF8F5]">
            Have Questions About This Guide?
          </h3>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Our certified gemologists in Nagpur are happy to assist you directly on WhatsApp.
          </p>
        </div>
        <WhatsAppButton
          variant="gold"
          size="md"
          message={`Hi Pukhraj Jewellers, I read your article on "${article.title}" and would like to ask a question.`}
        >
          Ask Our Gemologist
        </WhatsAppButton>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="pt-8">
          <h3 className="font-serif text-2xl text-[#FAF8F5] mb-6">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="p-4 bg-[#141418] border border-white/10 hover:border-[#C5A059]/40 rounded-sm group transition-all"
              >
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#E2C792] transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#C5A059] font-sans uppercase tracking-wider">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
