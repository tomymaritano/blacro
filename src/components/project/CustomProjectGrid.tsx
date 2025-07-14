"use client";

import { Project } from "../../../data/types";
import MasonryProjectCard from "./cards/MansoryProjectCard";

interface CustomProjectGridProps {
  projects: Project[];
}

export default function CustomProjectGrid({ projects }: CustomProjectGridProps) {
  // Asegurar que tenemos al menos 7 proyectos para el layout 2-3-2
  const displayProjects = projects.slice(0, 7);
  
  // Dividir proyectos en las tres filas
  const firstRowProjects = displayProjects.slice(0, 2);   // 2 grandes
  const secondRowProjects = displayProjects.slice(2, 5);  // 3 medianos  
  const thirdRowProjects = displayProjects.slice(5, 7);   // 2 grandes

  return (
    <div className="w-full max-w-screen-full mx-auto space-y-6">
      
      {/* Fila 1: 2 proyectos grandes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {firstRowProjects.map((project, index) => (
          <div key={project.slug}>
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

      {/* Fila 2: 3 proyectos medianos */}
      {secondRowProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {secondRowProjects.map((project, index) => (
            <div key={project.slug}>
              <MasonryProjectCard
                slug={project.slug}
                imageSrc={project.imageSrc}
                title={project.title}
                category={project.category}
                logo={project.logo}
                index={index + 2} // Continuar la secuencia de animación
              />
            </div>
          ))}
        </div>
      )}

      {/* Fila 3: 2 proyectos grandes */}
      {thirdRowProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {thirdRowProjects.map((project, index) => (
            <div key={project.slug}>
              <MasonryProjectCard
                slug={project.slug}
                imageSrc={project.imageSrc}
                title={project.title}
                category={project.category}
                logo={project.logo}
                index={index + 5} // Continuar la secuencia de animación
              />
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}