// components/ProjectGrid.tsx
"use client";

import ProjectCard from "./ProjectCard";
import { Project } from "../../../../data/projects";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-full mx-auto">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          href={project.href}
          imageSrc={project.imageSrc}
          title={project.title}
          category={project.category}
          logo={project.logo}
        />
      ))}
    </section>
  );
}