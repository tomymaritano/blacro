import DOMPurify from 'dompurify';

// Create a DOMPurify instance for server-side use
const createDOMPurify = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    return DOMPurify;
  } else {
    // Server environment - simplified approach
    // For server-side, we'll use basic text escaping instead of DOMPurify
    return null;
  }
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  const purify = createDOMPurify();
  if (purify) {
    return purify.sanitize(dirty, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3'],
      ALLOWED_ATTR: [],
    });
  } else {
    // Fallback to text sanitization for server-side
    return sanitizeText(dirty);
  }
}

/**
 * Sanitizes plain text content by escaping HTML entities
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates and sanitizes email headers to prevent injection
 */
export function sanitizeEmailHeader(header: string): string {
  // Remove any characters that could be used for header injection
  return header
    .replace(/[\r\n\t]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 100); // Limit length
}

/**
 * Rate limiting storage (in production, use Redis or similar)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting implementation
 * In production, consider using a proper rate limiting service
 */
export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  
  // Clean up old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  const current = rateLimitStore.get(identifier) || { count: 0, resetTime: now + windowMs };
  
  // Reset if window has passed
  if (current.resetTime < now) {
    current.count = 0;
    current.resetTime = now + windowMs;
  }
  
  if (current.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: current.resetTime
    };
  }
  
  current.count++;
  rateLimitStore.set(identifier, current);
  
  return {
    success: true,
    remaining: maxRequests - current.count,
    resetTime: current.resetTime
  };
}

/**
 * Get client IP address for rate limiting
 */
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || clientIP || 'unknown';
}