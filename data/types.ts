// data/types.ts
export interface ProjectImage {
  src: string;
  size?: "large" | "medium" | "small";
}

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
  images?: ProjectImage[];
  content?: ProjectContentBlock[];
  featured?: boolean;
}