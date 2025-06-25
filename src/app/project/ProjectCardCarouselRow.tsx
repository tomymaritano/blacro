"use client";

import { featuredProjects } from "../../../data/projects";
import ProjectCardCarousel from "./ProjectCardCarousel";

export default function ProjectCarouselRow() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Gradientes */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24  z-10"></div>

      {/* Track marquee */}
      <div className="flex animate-marquee-infinite space-x-8 w-[200%]">
        {featuredProjects.concat(featuredProjects).map((project, index) => (
          <ProjectCardCarousel key={index} {...project} />
        ))}
      </div>
    </div>
  );
}