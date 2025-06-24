"use client";


import { Project } from "../../../../data/projects";
import MasonryProjectCard from "../../project/MansoryProjectCard";

interface MasonryGridProps {
  projects: Project[];
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  return (
    <div
      className="
        columns-1
        sm:columns-2
        lg:columns-3
        gap-4
        w-full
        space-y-4
      "
    >
      {projects.map((project, index) => (
        <div key={index} className="break-inside-avoid w-full">
          <MasonryProjectCard
            slug={project.slug}
            imageSrc={project.imageSrc}
            title={project.title}
            category={project.category}
            logo={project.logo}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}