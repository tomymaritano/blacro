// components/project/ProjectsCarousel.tsx
"use client";

import ProjectCard from "./ProjectCard";
import { Project } from "../../../data/types";

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradientes laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Carrusel horizontal */}
      <div className="flex animate-marquee space-x-6 will-change-transform">
        {[...projects, ...projects].map((project, i) => (
          <ProjectCard
            key={`${project.slug}-${i}`}
            {...project}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}