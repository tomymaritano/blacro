// data/projects.ts
import { Project } from "./types";
import { myricaGin } from "./myrica-gin";
import { unicoinCampaign } from "./unicoin-campaing";
import { isolla } from "./isolla";

export const projects: Project[] = [
  myricaGin,
  isolla,
  unicoinCampaign,
  // otros proyectos
];

// Derivar featuredProjects
export const featuredProjects: Project[] = projects.filter(
  (p) => p.featured === true
);