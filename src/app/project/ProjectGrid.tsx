// components/project/ProjectGrid.tsx
"use client";

import ProjectCard from "./ProjectCard";
import { Project } from "../../../data/types";

interface ProjectGridProps {
  projects: Project[];
  title?: string;
  variant?: "featured" | "regular"; // te deja cambiar estilos
  cols?: number; // para que sea dinámico
}

export default function ProjectGrid({
  projects,
  title,
  variant = "regular",
  cols = 2,
}: ProjectGridProps) {
  return (
    <section className="w-full max-w-full mx-auto space-y-6">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      <div
        className={`
          grid gap-4 sm:gap-6
          grid-cols- sm:grid-cols-${cols}
          ${variant === "featured" ? "bg-black/5 p-4 rounded-sm" : ""}
        `}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}