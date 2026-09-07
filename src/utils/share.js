/**
 * Shares content via native Web Share API or falls back to clipboard
 */
export async function shareContent({ title, text, url }) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'Pukhraj Jewellers, Nagpur';

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: text || shareTitle,
        url: shareUrl
      });
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, aborted: true };
      }
    }
  }

  // Fallback: Copy link to clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      return { success: true, method: 'clipboard' };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  return { success: false };
}

/**
 * Generates direct WhatsApp share link
 */
export function getWhatsAppShareUrl(text, url) {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const message = `${text ? text + '\n' : ''}${targetUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
