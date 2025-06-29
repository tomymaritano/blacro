# Blacro Studio

**Blacro Studio** is a comprehensive creative agency website built with **Next.js 15** and **TypeScript**. This repository contains the complete source code for the portfolio website, including project showcases, informational sections, and a contact form with email API integration.

## 🌟 Features

- **Next.js 15 (App Router)** with dynamic routes and static page generation
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS 4** for utility-first styling with custom configuration
- **Framer Motion** for smooth animations and transitions
- **React Hook Form + Zod** for form validation and handling
- **Nodemailer** integration for contact form email delivery
- **Portfolio Management** through TypeScript data files
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags and Open Graph support

## 🏗️ Architecture

### Project Structure

```
src/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── contact/        # Contact form API endpoint
│   ├── components/
│   │   ├── Hero/           # Hero section components
│   │   ├── Layout/         # Layout components (Navbar, Footer, Grid)
│   │   └── ui/             # Reusable UI components
│   ├── contact/            # Contact page and form
│   ├── lib/
│   │   ├── env.ts          # Environment validation
│   │   └── schemas/        # Zod validation schemas
│   ├── portfolio/          # Portfolio listing page
│   ├── project/            # Project-related components
│   │   └── [slug]/         # Dynamic project pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── data/                   # Content management
│   ├── types.ts            # TypeScript type definitions
│   ├── projects.ts         # Project registry
│   ├── aboutParagraphs.ts  # About page content
│   ├── Logos.ts            # Client logos
│   ├── myrica-gin.ts       # Project case study
│   └── unicoin-campaing.ts # Project case study
└── public/                 # Static assets
    └── images/             # Project images and assets
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- SMTP email credentials for contact form

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # SMTP Configuration for Contact Form
   SMTP_HOST=your-smtp-host.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@domain.com
   SMTP_PASSWORD=your-app-password
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## 🎨 Content Management

### Adding New Projects

1. **Create Project Data File**
   ```typescript
   // data/your-project.ts
   import { Project } from './types';

   export const yourProject: Project = {
     slug: 'your-project',
     title: 'Project Title',
     imageSrc: '/images/your-project/main.jpg',
     category: 'Branding',
     featured: true,
     // ... other properties
   };
   ```

2. **Register in Projects Registry**
   ```typescript
   // data/projects.ts
   import { yourProject } from './your-project';

   export const projects: Project[] = [
     yourProject,
     // ... other projects
   ];
   ```

### Content Types

- **Project**: Main portfolio items with metadata, images, and content blocks
- **ProjectContentBlock**: Flexible content blocks (text, images, quotes)
- **ProjectImage**: Optimized image definitions with size variants

## 🔧 API Endpoints

### Contact Form (`/api/contact`)

**POST** request with form validation:

```typescript
interface ContactRequest {
  name: string;     // 2-100 characters
  email: string;    // Valid email, max 255 chars
  message: string;  // 10-2000 characters
}
```

**Responses:**
- `200`: Message sent successfully
- `400`: Validation errors
- `500`: Server/SMTP errors

## 🎯 Key Features

### Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing
- **Package Optimization**: Optimized imports for Framer Motion and Lucide React
- **Static Generation**: Pre-built pages for better performance
- **Font Optimization**: Google Fonts with proper loading strategies

### SEO & Accessibility

- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt Text**: All images include descriptive alt text
- **Keyboard Navigation**: Full keyboard accessibility support

### Type Safety

- **Environment Validation**: Runtime validation of environment variables
- **Content Validation**: Zod schemas for form and data validation
- **TypeScript Strict Mode**: Maximum type safety enforcement

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your Git repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

Compatible with any Next.js hosting platform:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

**Environment Variables Required:**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`

## 🛠️ Development

### Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled
- **Import Organization**: Consistent import ordering
- **Component Structure**: Modular, reusable components

### Best Practices

- **Component Composition**: Favor composition over inheritance
- **Type Safety**: Comprehensive TypeScript coverage
- **Performance**: Optimized re-renders and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structured data

## 📋 Project Requirements

### System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **TypeScript**: 5.0.0 or higher

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please consult with the authors before using in production.

---

**Built with ❤️ by Blacro Studio**