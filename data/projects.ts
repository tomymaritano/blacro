// data/projects.ts
import { Project } from "./types";
import { myricaGin } from "./myrica-gin";

export const projects: Project[] = [
  myricaGin,
  // otros proyectos
];

// Derivar featuredProjects
export const featuredProjects: Project[] = projects.filter(
  (p) => p.featured === true
);