import businessData from '@/data/business.json';

/**
 * Clean phone number for WhatsApp wa.me URL
 */
export function getCleanWhatsAppNumber() {
  // Extract digits and optional plus sign, default to safe fallback
  const raw = businessData.whatsappRaw || businessData.whatsapp || '919800000000';
  return raw.replace(/[^0-9]/g, '');
}

/**
 * Generic WhatsApp link creator
 */
export function createWhatsAppLink(message = '') {
  const number = getCleanWhatsAppNumber();
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * WhatsApp link for single product enquiry
 */
export function createProductWhatsAppLink(product) {
  if (!product) {
    return createWhatsAppLink(`Hi ${businessData.name}, I would like to enquire about your jewellery collection.`);
  }

  const message = `Hi ${businessData.name}, I am interested in the ${product.name} (Code: ${product.id}, Purity: ${product.purity || '22K'}, Weight: ${product.weight || 'N/A'}). Please share the current price, availability, and more details.`;
  return createWhatsAppLink(message);
}

/**
 * WhatsApp link for wishlist enquiry
 */
export function createWishlistWhatsAppLink(products = []) {
  if (!products || products.length === 0) {
    return createWhatsAppLink(`Hi ${businessData.name}, I am browsing your website and would like to enquire about your latest jewellery collections.`);
  }

  const itemsList = products
    .map((p, idx) => `${idx + 1}. ${p.name} [${p.purity || '22K'}, ~${p.weight || 'N/A'}]`)
    .join('\n');

  const message = `Hi ${businessData.name}, I have saved these jewellery designs to my wishlist on your website:\n\n${itemsList}\n\nPlease share price estimates, customization options, and showroom availability.`;
  return createWhatsAppLink(message);
}

/**
 * WhatsApp link for appointment booking
 */
export function createAppointmentWhatsAppLink(appointmentData = {}) {
  const { name, phone, date, time, interest, message: note } = appointmentData;
  const message = `Hi ${businessData.name}, I would like to schedule a personal jewellery consultation:
- Name: ${name || 'Prospective Customer'}
- Contact: ${phone || 'Provided in form'}
- Preferred Date: ${date || 'Upcoming week'}
- Preferred Time: ${time || 'Afternoon'}
- Interested In: ${interest || 'Bridal & Gold Jewellery'}
${note ? `- Special Requests: ${note}` : ''}

Kindly confirm availability at your Nagpur showroom.`;

  return createWhatsAppLink(message);
}

/**
 * WhatsApp link for custom bespoke design inquiry
 */
export function createCustomJewelleryWhatsAppLink(customDetails = {}) {
  const { jewelleryType, metalPreference, estimatedBudget, notes } = customDetails;
  const message = `Hi ${businessData.name}, I would like to discuss a bespoke custom jewellery design:
- Piece Type: ${jewelleryType || 'Custom Jewellery'}
- Metal / Purity: ${metalPreference || '22K Gold / Diamond'}
${estimatedBudget ? `- Estimated Budget: ${estimatedBudget}\n` : ''}${notes ? `- Design Vision: ${notes}\n` : ''}
I would love to consult with your master karigars.`;

  return createWhatsAppLink(message);
}

/**
 * WhatsApp link for Bridal Look Builder export
 */
export function createBridalLookWhatsAppLink(lookItems = []) {
  const itemsText = lookItems
    .map((item) => `- ${item.pieceType.toUpperCase()}: ${item.name} (${item.purity || '22K'})`)
    .join('\n');

  const message = `Hi ${businessData.name}, I designed my personalized bridal look on your website with these pieces:\n\n${itemsText}\n\nPlease share the total package estimate, delivery timelines, and arrange a private bridal suite consultation for me.`;

  return createWhatsAppLink(message);
}
