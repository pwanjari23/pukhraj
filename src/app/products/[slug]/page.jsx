import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import businessData from '@/data/business.json';
import ProductDetailView from './ProductDetailView';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found'
    };
  }

  return {
    title: `${product.name} (${product.purity || '22K'})`,
    description: `${product.description} Handcrafted by ${businessData.name}, ${businessData.city}. BIS Hallmarked.`,
    openGraph: {
      title: `${product.name} | ${businessData.name}`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: product.name
        }
      ]
    }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
