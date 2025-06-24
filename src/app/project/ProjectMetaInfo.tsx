// components/project/ProjectMetaInfo.tsx
import { Project } from "../../../data/types";
import ProjectMetaItem from "./ProjectMetaItem";

interface ProjectMetaInfoProps {
  project: Project;
}

export default function ProjectMetaInfo({ project }: ProjectMetaInfoProps) {
  return (
    <aside className="space-y-6 top-24 self-start bg-white">
      {/* Ubicación y año */}
      <div className="grid grid-cols-2 gap-8 text-sm opacity-80">
        {project.location && (
          <ProjectMetaItem label="Location">
            {project.location}
          </ProjectMetaItem>
        )}
        {project.year && (
          <ProjectMetaItem label="Year">
            {project.year}
          </ProjectMetaItem>
        )}
      </div>

      {/* Servicios */}
      {project.services && project.services.length > 0 && (
        <ProjectMetaItem label="Services">
          {project.services.join(", ")}
        </ProjectMetaItem>
      )}
    </aside>
  );
}