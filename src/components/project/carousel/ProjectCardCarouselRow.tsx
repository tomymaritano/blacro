"use client";

import { featuredProjects } from "../../../../data/projects";
import ProjectCardCarousel from "./ProjectCardCarousel";

export default function ProjectCarouselRow() {
  return (
    <div className="relative w-full overflow-x-hidden px-4 sm:px-6 min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
      {/* Gradientes */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-white z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-white z-10"></div>

      {/* Track con contenido duplicado */}
      <div className="flex animate-marquee-right space-x-3 sm:space-x-3 w-[200%]">
        {featuredProjects.concat(featuredProjects).map((project, index) => (
          <ProjectCardCarousel key={index} {...project} />
        ))}
      </div>
    </div>
  );
}