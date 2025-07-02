// data/projects.ts
import { Project } from "./types";
import { myricaGin } from "./myrica-gin";
import { unicoinNextgen } from "./unicoin-nextgen";
import { unicoinEverywhere } from "./unicoin-everywhere";
import { londonFashionWeek } from "./london-fashion-week";
import { isolla } from "./isolla";

export const projects: Project[] = [
  myricaGin,
  londonFashionWeek,
  unicoinNextgen,
  unicoinEverywhere,
  isolla,
];

// Derivar featuredProjects
export const featuredProjects: Project[] = projects.filter(
  (p) => p.featured === true
);