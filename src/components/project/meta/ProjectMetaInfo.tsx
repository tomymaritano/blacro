// components/project/ProjectMetaInfo.tsx
import { Project } from "../../../../data/types";
import ProjectMetaItem from "./ProjectMetaItem";

interface ProjectMetaInfoProps {
  project: Project;
}

export default function ProjectMetaInfo({ project }: ProjectMetaInfoProps) {
  return (
    <aside className="space-y-6 top-24 self-start">
      {/* Grid para todos los campos */}
      <div className="grid grid-cols-2 gap-3 text-sm opacity-80 font-sans">
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

        {project.services && project.services.length > 0 && (
          <ProjectMetaItem label="Services">
            {project.services.join(", ")}
          </ProjectMetaItem>
        )}
        {project.client && (
          <ProjectMetaItem label="Client">
            {project.client}
          </ProjectMetaItem>
        )}

      </div>
    </aside>
  );
}