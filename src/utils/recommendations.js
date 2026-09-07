import productsData from '@/data/products.json';

/**
 * Intelligent recommendation engine based on Category, Occasion, Style, and Tags
 */
export function getRelatedProducts(currentProduct, limit = 4) {
  if (!currentProduct) return productsData.slice(0, limit);

  const currentTags = currentProduct.tags || [];
  const currentOccasion = currentProduct.occasion || [];
  const currentStyle = currentProduct.style || [];
  const currentCategory = currentProduct.category || '';
  const currentSubcategory = currentProduct.subcategory || '';

  // Complementary pairings
  const complementaryMap = {
    'Necklaces': ['Earrings', 'Bangles', 'Bridal Sets', 'Maang Tikka'],
    'Bridal Sets': ['Bangles', 'Maang Tikka', 'Nath', 'Rings'],
    'Solitaire Rings': ['Tennis Bracelets', 'Studs', 'Diamond Necklaces'],
    'Bangles': ['Necklaces', 'Kadas', 'Rings'],
    'Earrings': ['Necklaces', 'Chokers', 'Maang Tikka'],
    'Mangalsutra': ['Bangles', 'Studs', 'Chains']
  };

  const desiredComplements = complementaryMap[currentSubcategory] || [];

  const scored = productsData
    .filter((p) => p.id !== currentProduct.id)
    .map((product) => {
      let score = 0;

      // Bonus if it's a complementary piece for pairing
      if (desiredComplements.includes(product.subcategory)) {
        score += 8;
      }

      // Shared occasions
      const sharedOccasions = (product.occasion || []).filter((o) => currentOccasion.includes(o));
      score += sharedOccasions.length * 4;

      // Shared tags
      const sharedTags = (product.tags || []).filter((t) => currentTags.includes(t));
      score += sharedTags.length * 3;

      // Shared style
      const sharedStyles = (product.style || []).filter((s) => currentStyle.includes(s));
      score += sharedStyles.length * 2;

      // Same metal or purity
      if (product.purity === currentProduct.purity) score += 2;
      if (product.category === currentCategory) score += 1;

      return { product, score };
    });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.product);
}
