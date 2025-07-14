// data/projects.ts
import { Project } from "./types";
import { myricaGin } from "./myrica-gin";
import { unicoinNextgen } from "./unicoin-nextgen";
import { unicoinEverywhere } from "./unicoin-everywhere";
import { londonFashionWeek } from "./london-fashion-week";
import { isolla } from "./isolla";
import { youtubeCDMX } from "./youtube-cdmx";
import { privateLimo } from "./private-limo";

export const projects: Project[] = [
  privateLimo,
  youtubeCDMX,
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