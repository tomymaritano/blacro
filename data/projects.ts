// data/projects.ts

export interface ProjectContentBlock {
  type: "text" | "image" | "quote";
  content: string;
  imageAlt?: string;
}


export interface Project {
  slug: string; 
  imageSrc: string;
  title: string;
  category?: string;
  client?: string;
  logo?: string;
  location?: string;
  year?: number;
  services?: string[];
  description?: string;
  images?: string[];
  content?: ProjectContentBlock[];
}

// Proyectos para la homepage
export const projects: Project[] = [
  {
    slug: "myrica-gin",
    title: "Myrica Gin",
    imageSrc: "/images/test1.jpg",
    category: "Branding & Packaging",
    client: "Myrica Distillery",
    location: "Buenos Aires",
    year: 2025,
    services: ["Branding", "Visual Identity", "Packaging", "Creative Direction"],
    content: [
      { type: "text", content: "Myrica Gin es una marca que nace de la conexión..." },
      { type: "text", content: "La marca nos convocó para acompañarlos en la creación..." },
      { type: "text", content: "Diseñamos un plan de comunicación alineado con los valores..." },
      { type: "text", content: "El resultado es una marca coherente, lista para ingresar al mercado." }
    ]
  },
  {
    slug: "project-2",
    imageSrc: "/images/test1.jpg",
    title: "Retail Space",
    category: "Interior Design",
    logo: "/images/logos/retail-logo.svg",
  },
  {
    slug: "project-3",
    imageSrc: "/images/test2.jpg",
    title: "Retail Space",
    category: "Interior Design",
    logo: "/images/logos/retail-logo.svg",
  },
];

// Proyectos completos para la página portfolio
export const fullProjects: Project[] = [
  {
    slug: "project-4",
    imageSrc: "/images/test5.jpg",
    title: "Creative Direction",
    category: "Creative",
    logo: "/images/logos/creative-logo.svg",
  },
  {
    slug: "project-5",
    imageSrc: "/images/test6.jpg",
    title: "Brand Identity",
    category: "Branding",
    logo: "/images/logos/brand-logo.svg",

  },
  {
    slug: "project-6",
    imageSrc: "/images/test1.jpg",
    title: "Retail Space",
    category: "Interior Design",
    logo: "/images/logos/retail-logo.svg",
  },
  {
    slug: "project-7",
    imageSrc: "/images/test2.jpg",
    title: "Packaging Design",
    category: "Packaging",
    logo: "/images/logos/packaging-logo.svg",
  },
  // ...etc
];