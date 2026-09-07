import businessData from '@/data/business.json';

/**
 * Returns the verified Google Maps directions URL
 */
export function getDirectionsUrl() {
  return businessData.googleMapsUrl || businessData.googleMaps || 'https://maps.google.com/?q=Pukhraj+Jewellers+Nagpur';
}

/**
 * Returns the embedded Google Maps iframe URL
 */
export function getMapEmbedUrl() {
  if (businessData.googleMapsEmbedUrl) {
    return businessData.googleMapsEmbedUrl;
  }
  const query = encodeURIComponent(`${businessData.name}, ${businessData.city}`);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Returns store coordinates
 */
export function getStoreCoordinates() {
  return {
    latitude: businessData.latitude || '21.1458',
    longitude: businessData.longitude || '79.0882'
  };
}
