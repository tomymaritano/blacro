

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
 * Rate limiting storage - IMPORTANT LIMITATION:
 * This uses in-memory Map which has the following issues:
 * - In serverless environments (Vercel, AWS Lambda): resets on each function execution
 * - In multi-instance deployments: each instance has its own Map, defeating rate limiting
 * - In production with clustering: not shared between workers
 * 
 * PRODUCTION SOLUTION:
 * Replace with external storage like Redis, database, or use a service like:
 * - Upstash Redis
 * - Vercel Edge Config
 * - AWS DynamoDB
 * - Cloudflare KV
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting implementation
 * WARNING: Current implementation only works reliably in single-instance, long-running processes
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