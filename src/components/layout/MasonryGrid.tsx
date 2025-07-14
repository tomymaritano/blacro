"use client";

import { Project } from "../../../data/types";
import MasonryProjectCard from "../project/cards/MansoryProjectCard";

interface MasonryGridProps {
  projects: Project[];
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  return (
    <div className="w-full max-w-screen-full mx-auto columns-1 sm:columns-2 lg:columns-3 gap-3">
      {projects.map((project) => (
        <div key={project.slug} className="mb-6 break-inside-avoid">
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