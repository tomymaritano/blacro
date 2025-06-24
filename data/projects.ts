// data/projects.ts
export interface Project {
  href: string;
  imageSrc: string;
  title: string;
  category?: string;
  logo?: string;
}

export const projects: Project[] = [
  {
    href: "/project-1",
    imageSrc: "/images/test.jpg",
    title: "Brand Identity",
    category: "Branding",
    logo: "/images/logos/brand-logo.svg",
  },
  {
    href: "/project-2",
    imageSrc: "/images/test1.jpg",
    title: "Retail Space",
    category: "Interior Design",
    logo: "/images/logos/retail-logo.svg",
  },
    {
    href: "/project-3",
    imageSrc: "/images/test2.jpg",
    title: "Retail Space",
    category: "Interior Design",
    logo: "/images/logos/retail-logo.svg",
  },
  // ...agregá los demás
];