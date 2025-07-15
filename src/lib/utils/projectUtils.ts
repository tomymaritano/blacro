import { Project } from "@/data/types";

// Array of project slugs that should appear on the main page
const MAIN_PROJECT_SLUGS = [
  "private-limo",
  "myrica-gin", 
  "london-fashion-week",
  "isolla",
  "unicoin-nextgen",
  "youtube-cdmx"
];

/**
 * Filters projects to only include those that should appear on the main page
 * @param projects - Array of all projects
 * @returns Array of projects that should appear on main page, ordered by MAIN_PROJECT_SLUGS
 */
export function getMainProjects(projects: Project[]): Project[] {
  const projectMap = new Map(projects.map(project => [project.slug, project]));
  
  return MAIN_PROJECT_SLUGS
    .map(slug => projectMap.get(slug))
    .filter((project): project is Project => project !== undefined);
}

/**
 * Converts a project to MainImage format for compatibility
 * @param project - Project to convert
 * @returns Object compatible with MainImage interface
 */
export function projectToMainImage(project: Project) {
  return {
    id: project.slug,
    imageSrc: project.imageSrc,
    logoSrc: project.logo || "",
    title: project.title,
    href: `/project/${project.slug}`
  };
}