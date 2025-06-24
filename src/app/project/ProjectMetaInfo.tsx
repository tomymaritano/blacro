// components/project/ProjectMetaInfo.tsx
import { Project } from "../../../data/projects";

interface ProjectMetaInfoProps {
  project: Project;
}

export default function ProjectMetaInfo({ project }: ProjectMetaInfoProps) {
  return (
    <div className="space-y-6 sticky top-24 self-start">
      <div className="grid grid-cols-2 gap-8 text-sm opacity-80">
        {project.location && (
          <div>
            <span className="font-semibold uppercase">(Ubication)</span>
            <p>{project.location}</p>
          </div>
        )}
        {project.year && (
          <div>
            <span className="font-semibold uppercase">(Year)</span>
            <p>{project.year}</p>
          </div>
        )}
      </div>

      {project.services && project.services.length > 0 && (
        <div className="text-sm opacity-80">
          <span className="font-semibold uppercase">(Services)</span>
          <p>{project.services.join(", ")}</p>
        </div>
      )}
    </div>
  );
}