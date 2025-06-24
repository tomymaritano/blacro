"use client";

import { Project } from "../../../../data/types";
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
      "
    >
      {projects.map((project) => (
        <div key={project.slug} className="break-inside-avoid mb-4">
          <MasonryProjectCard
            slug={project.slug}
            imageSrc={project.imageSrc}
            title={project.title}
            category={project.category}
            logo={project.logo}
          />
        </div>
      ))}
    </div>
  );
}