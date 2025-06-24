"use client";

import { featuredProjects } from "../../../data/projects";
import ProjectCardCarousel from "./ProjectCardCarousel";

export default function ProjectCarouselRow() {
    // Duplicar el array para que sean dos secuencias consecutivas
    const loopProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects, ...featuredProjects];

    return (
        <div className="relative w-full ">
            {/* Gradiente lateral izquierda */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 "></div>
            {/* Gradiente lateral derecha */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"></div>

            {/* Track */}
            <div className="flex flex-row space-x-8 animate-marquee-infinite">
                {loopProjects.map((project, index) => (
                    <ProjectCardCarousel key={index} {...project} />
                ))}
            </div>
        </div>
    );
}