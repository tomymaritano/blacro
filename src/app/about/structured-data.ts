import { META, SOCIAL_LINKS } from "@/constants/design-tokens";

export const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": META.SITE_NAME,
    "url": META.SITE_URL,
    "description": META.DESCRIPTION,
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Camila Blanco"
      },
      {
        "@type": "Person", 
        "name": "Candela Crosta"
      }
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "Global"
    },
    "areaServed": "Worldwide",
    "sameAs": [
      SOCIAL_LINKS.INSTAGRAM,
      SOCIAL_LINKS.LINKEDIN,
      SOCIAL_LINKS.BEHANCE
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SOCIAL_LINKS.EMAIL,
      "contactType": "customer service"
    },
    "knowsAbout": [
      "Branding",
      "Art Direction", 
      "Set Design",
      "Event Design",
      "Brand Experiences",
      "Activations",
      "Campaigns",
      "Content Creation",
      "Packaging",
      "Web Design",
      "Photography"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creative Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding & Identity",
            "description": "Complete brand identity design and strategy"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Art Direction",
            "description": "Creative direction for campaigns and content"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Set Design",
            "description": "Physical and virtual space design for events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Experiences", 
            "description": "Immersive brand activation and experience design"
          }
        }
      ]
    }
  }
};