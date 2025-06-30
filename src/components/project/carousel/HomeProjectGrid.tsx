"use client";

import ProjectCard from "../cards/ProjectCard";
import { Project } from "../../../../data/types";

interface HomeProjectGridProps {
  projects: Project[];
  title?: string;
}

export default function HomeProjectGrid({ projects, title }: HomeProjectGridProps) {
  return (
    <section className="w-full max-w-full mx-auto space-y-6">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}