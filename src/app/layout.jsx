import './globals.css';
import RootClientLayout from '@/components/layout/RootClientLayout';
import businessData from '@/data/business.json';

export const metadata = {
  metadataBase: new URL('https://pukhrajjewellers.co.in'),
  title: {
    default: `${businessData.name}, ${businessData.city} | Royal Heritage Gold, Diamond & Bridal Jewellery`,
    template: `%s | ${businessData.name}, ${businessData.city}`
  },
  description: `${businessData.name}, ${businessData.city}. Discover timeless 22K BIS hallmarked gold jewellery, certified diamond solitaires, royal bridal suites, and custom karigari.`,
  keywords: [
    'Pukhraj Jewellers',
    'Jewellers in Nagpur',
    'Gold Jewellery Nagpur',
    'Bridal Jewellery Nagpur',
    'Diamond Solitaire Nagpur',
    '22K Hallmarked Gold',
    'Ceylon Yellow Sapphire Pukhraj'
  ],
  authors: [{ name: businessData.name }],
  creator: businessData.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://pukhrajjewellers.co.in',
    title: `${businessData.name}, ${businessData.city} | Digital Flagship`,
    description: "Handcrafted 22K gold, certified diamonds, and regal bridal trousseaus in Nagpur.",
    siteName: businessData.name
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessData.name}, ${businessData.city}`,
    description: "Digital flagship showroom of Pukhraj Jewellers, Nagpur."
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0c'
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: businessData.name,
    image: 'https://pukhrajjewellers.co.in/images/hero-poster.webp',
    '@id': 'https://pukhrajjewellers.co.in',
    url: 'https://pukhrajjewellers.co.in',
    telephone: businessData.phoneRaw || '+917120000000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessData.address,
      addressLocality: businessData.city,
      addressRegion: 'Maharashtra',
      postalCode: '440002',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessData.latitude,
      longitude: businessData.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '20:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '19:00'
      }
    ],
    priceRange: '₹₹₹₹'
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0c] text-neutral-100 antialiased selection:bg-[#C5A059] selection:text-black">
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  );
}
