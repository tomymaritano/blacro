"use client";

import { projects } from '@/data/projects';
import { Project } from '@/data/types';

export function useProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function useProjects(): Project[] {
  return projects;
}

// Helper functions for server components
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjects(): Project[] {
  return projects;
}