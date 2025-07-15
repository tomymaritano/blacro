import { Project } from "@/data/types";

/**
 * Filters projects to only include those that should appear on the main page
 * @param projects - Array of all projects
 * @returns Array of projects that should appear on main page, ordered by mainOrder
 */
export function getMainProjects(projects: Project[]): Project[] {
  // Safety check for empty or undefined projects array
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return [];
  }

  return projects
    .filter(project => project.showInMain === true)
    .sort((a, b) => (a.mainOrder || 0) - (b.mainOrder || 0));
}