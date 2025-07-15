# Cache Configuration Documentation

## Overview
This document outlines the cache configuration implemented in the Blacro app to optimize performance and loading speeds.

## Cache Headers Configuration

### Static Assets
- **Path**: `/_next/static/*`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Duration**: 1 year
- **Description**: Next.js static assets with hash-based filenames

### Images
- **Path**: `/images/*`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Duration**: 1 year
- **Description**: Static image assets

### Fonts
- **Path**: `/fonts/*`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Duration**: 1 year
- **Description**: Font files

### API Routes
- **Path**: `/api/*`
- **Cache-Control**: `public, s-maxage=60, stale-while-revalidate=300`
- **Duration**: 60 seconds server cache, 5 minutes stale-while-revalidate
- **Description**: Dynamic API responses with fallback to stale content

## Incremental Static Regeneration (ISR)

### Home Page (`/`)
- **Revalidate**: 86400 seconds (24 hours)
- **Description**: Main landing page, updates daily

### Portfolio Page (`/portfolio`)
- **Revalidate**: 43200 seconds (12 hours)
- **Description**: Portfolio grid, updates twice daily

### Project Pages (`/project/[slug]`)
- **Revalidate**: 3600 seconds (1 hour)
- **Description**: Individual project pages, updates hourly

## Cloudinary Images
- **minimumCacheTTL**: 31536000 seconds (1 year)
- **Formats**: AVIF, WebP with automatic format selection
- **Description**: Optimized image delivery with long-term caching

## Performance Benefits

1. **Reduced Server Load**: Static assets cached for 1 year
2. **Faster Page Loads**: ISR serves pre-rendered pages
3. **Better UX**: Stale-while-revalidate prevents loading delays
4. **Optimized Images**: Cloudinary handles image optimization and caching

## Cache Invalidation

To manually invalidate cache:
1. **Development**: `rm -rf .next && npm run dev`
2. **Production**: Deploy new version or use Vercel's cache purge
3. **Cloudinary**: Add version parameter to image URLs (`?v=2`)

## Monitoring

Cache effectiveness can be monitored through:
- Browser DevTools Network tab (check Cache-Control headers)
- Vercel Analytics (for deployed apps)
- Lighthouse performance scores