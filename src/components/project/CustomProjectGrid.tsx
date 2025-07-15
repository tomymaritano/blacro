"use client";

import { Project } from "@/data/types";
import MasonryProjectCard from "./cards/MasonryProjectCard";
import { useMemo } from "react";

interface CustomProjectGridProps {
  projects: Project[];
}

export default function CustomProjectGrid({ projects }: CustomProjectGridProps) {
  // Memoize project groups to prevent recalculation on every render
  const projectGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < projects.length; i += 7) {
      const group = projects.slice(i, i + 7);
      groups.push({
        firstRow: group.slice(0, 2),
        secondRow: group.slice(2, 5), 
        thirdRow: group.slice(5, 7)
      });
    }
    return groups;
  }, [projects]);

  return (
    <div className="w-full max-w-screen-full mx-auto space-y-12">
      {projectGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-6">
          
          {/* Fila 1: 2 proyectos grandes */}
          {group.firstRow.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.firstRow.map((project, index) => (
                <div key={project.slug}>
                  <MasonryProjectCard
                    slug={project.slug}
                    imageSrc={project.imageSrc}
                    title={project.title}
                    category={project.category}
                    logo={project.logo}
                    index={groupIndex * 7 + index}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Fila 2: 3 proyectos medianos */}
          {group.secondRow.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.secondRow.map((project, index) => (
                <div key={project.slug}>
                  <MasonryProjectCard
                    slug={project.slug}
                    imageSrc={project.imageSrc}
                    title={project.title}
                    category={project.category}
                    logo={project.logo}
                    index={groupIndex * 7 + index + 2}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Fila 3: 2 proyectos grandes */}
          {group.thirdRow.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.thirdRow.map((project, index) => (
                <div key={project.slug}>
                  <MasonryProjectCard
                    slug={project.slug}
                    imageSrc={project.imageSrc}
                    title={project.title}
                    category={project.category}
                    logo={project.logo}
                    index={groupIndex * 7 + index + 5}
                  />
                </div>
              ))}
            </div>
          )}
          
        </div>
      ))}
    </div>
  );
}