# Component Documentation

This document provides detailed information about the component architecture and usage patterns in the Blacro Studio website.

## 🏗️ Architecture Overview

The component system follows a **hierarchical structure** with clear separation of concerns:

- **Layout Components**: Global layout elements (Navbar, Footer, Grid)
- **Page Components**: Page-specific components 
- **UI Components**: Reusable, generic components
- **Project Components**: Portfolio-specific components
- **Hero Components**: Landing page sections

## 📁 Component Structure

```
src/app/components/
├── Hero/
│   ├── HeroLogo.tsx        # Animated floating logo
│   ├── HeroSection.tsx     # Main hero component
│   └── FloatingLogo.module.css
├── Layout/
│   ├── Footer.tsx          # Site footer
│   ├── GridWrapper.tsx     # 12-column grid container
│   ├── Header.tsx          # Page headers
│   ├── MansonryGrid.tsx    # Masonry layout for projects
│   └── Navbar.tsx          # Navigation component
├── ui/
│   ├── AnimatedLink.tsx    # Hover-animated links
│   ├── AppLink.tsx         # Application navigation links
│   ├── ButtonTalk.tsx      # CTA button component
│   ├── CustomCursor.tsx    # Custom cursor implementation
│   └── LogosMarquee.tsx    # Scrolling logos display
├── StyledLink.tsx          # Base styled link component
└── WhatWeDo.tsx           # Services section component
```

## 🎯 Core Layout Components

### GridWrapper (`components/Layout/GridWrapper.tsx`)
**Purpose**: Provides consistent 12-column grid layout across all pages.

```typescript
interface GridWrapperProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage**:
```tsx
<GridWrapper className="py-8">
  <main className="col-span-12">
    {children}
  </main>
</GridWrapper>
```

### Navbar (`components/Layout/Navbar.tsx`)
**Purpose**: Responsive navigation with mobile menu support.

**Features**:
- Scroll-based background opacity changes
- Mobile hamburger menu with full-screen overlay
- Logo switching based on route (floating vs static)
- Animated menu transitions with Framer Motion

**Key States**:
- `scrolled`: Tracks scroll position for styling
- `isOpen`: Mobile menu visibility

### Footer (`components/Layout/Footer.tsx`)
**Purpose**: Site footer with contact information and social links.

## 🎨 Hero Components

### HeroSection (`components/Hero/HeroSection.tsx`)
**Purpose**: Main landing section with customizable margin.

```typescript
interface HeroSectionProps {
  marginTopClass?: string;
}
```

### HeroLogo (`components/Hero/HeroLogo.tsx`)
**Purpose**: Animated floating logo with custom CSS animations.

## 🔗 UI Components

### AnimatedLink (`components/ui/AnimatedLink.tsx`)
**Purpose**: Navigation links with hover animations.

```typescript
interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Features**:
- Underline animation on hover
- Support for external links
- Click handlers for menu closing

### ButtonTalk (`components/ui/ButtonTalk.tsx`)
**Purpose**: Call-to-action button with responsive variants.

```typescript
interface ButtonTalkProps {
  href: string;
  mobile?: boolean;
  onClick?: () => void;
}
```

**Variants**:
- Desktop: Rounded button with hover effects
- Mobile: Full-width variant for mobile menus

### LogosMarquee (`components/ui/LogosMarquee.tsx`)
**Purpose**: Infinite scrolling display of client logos.

**Features**:
- CSS-based infinite scroll animation
- Gradient fade edges
- Responsive logo sizing
- Optimized image loading

## 📱 Project Components

### Project Grid System

Located in `src/app/project/`, these components handle portfolio display:

#### ProjectGrid (`project/ProjectGrid.tsx`)
Main grid container for project listings.

#### MansoryProjectCard (`project/MansoryProjectCard.tsx`)
Individual project cards with hover effects.

#### ProjectCard (`project/ProjectCard.tsx`)
Base project card component with image and metadata.

#### ProjectCardCarousel (`project/ProjectCardCarousel.tsx`)
Carousel implementation for project images.

### Project Detail Components

#### ProjectDescription (`project/ProjectDescription.tsx`)
Rich text description with expandable content.

#### ProjectGallery (`project/ProjectGallery.tsx`)
Image gallery with lightbox functionality.

#### ProjectContentBlocks (`project/ProjectContentBlocks.tsx`)
Flexible content block renderer supporting text, images, and quotes.

#### ProjectMetaInfo (`project/ProjectMetaInfo.tsx`)
Project metadata display (client, year, services).

## 🎯 Component Patterns

### 1. Composition Pattern
Components favor composition over inheritance:

```tsx
// Good: Composable
<GridWrapper>
  <Header title="Portfolio" />
  <ProjectGrid projects={projects} />
</GridWrapper>

// Avoid: Inheritance-based
<PortfolioPage projects={projects} />
```

### 2. Props Interface Pattern
All components use explicit TypeScript interfaces:

```typescript
interface ComponentProps {
  required: string;
  optional?: boolean;
  children?: React.ReactNode;
}
```

### 3. Conditional Rendering Pattern
Components handle multiple states gracefully:

```tsx
const Navbar = () => {
  const isHome = pathname === "/";
  
  return (
    <nav>
      {isHome ? <FloatingLogo /> : <StaticLogo />}
    </nav>
  );
};
```

### 4. Animation Pattern
Framer Motion is used consistently for animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

## 🎨 Styling Conventions

### 1. Tailwind Classes
Components use Tailwind utility classes with consistent patterns:

```tsx
// Layout
className="grid grid-cols-12 gap-4"

// Spacing
className="px-4 sm:px-6 md:px-8 lg:px-12"

// Typography
className="text-lg font-semibold text-black/80"
```

### 2. Responsive Design
Mobile-first approach with consistent breakpoints:

```tsx
className="col-span-12 md:col-span-6 lg:col-span-4"
```

### 3. Color System
Consistent color usage:
- Primary: `#171717` (dark)
- Secondary: `#fffcf7` (light cream)
- Text: `text-black` / `text-black/80`

## 🔧 Best Practices

### 1. Component Organization
- One component per file
- Clear naming conventions
- Logical folder grouping
- Index files for exports

### 2. TypeScript Usage
- Explicit prop interfaces
- Generic types where appropriate
- Strict type checking

### 3. Performance
- Lazy loading for heavy components
- Optimized re-renders with React.memo
- Efficient event handlers

### 4. Accessibility
- Semantic HTML elements
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility

## 🚀 Usage Examples

### Basic Page Layout
```tsx
export default function Page() {
  return (
    <GridWrapper className="py-8">
      <Header title="Page Title" />
      <main className="col-span-12">
        <YourContent />
      </main>
    </GridWrapper>
  );
}
```

### Project Display
```tsx
<ProjectGrid projects={projects}>
  {projects.map(project => (
    <MansoryProjectCard 
      key={project.slug}
      project={project}
    />
  ))}
</ProjectGrid>
```

### Form Integration
```tsx
<form onSubmit={handleSubmit}>
  <input {...register("email")} />
  <ButtonTalk href="/submit">
    Send Message
  </ButtonTalk>
</form>
```

This component system provides a solid foundation for building consistent, maintainable, and scalable user interfaces for the Blacro Studio website.