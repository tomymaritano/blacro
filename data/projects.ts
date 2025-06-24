// data/projects.ts
import { Project } from "./types";
import { myricaGin } from "./myrica-gin";
import { unicoinCampaign } from "./unicoin-campaing";

export const projects: Project[] = [
  myricaGin,
  unicoinCampaign
  // otros proyectos
];

// Derivar featuredProjects
export const featuredProjects: Project[] = projects.filter(
  (p) => p.featured === true
);