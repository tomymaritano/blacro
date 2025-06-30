// components/project/ProjectDescription.tsx
import { Project } from "../../../data/types";

interface ProjectDescriptionProps {
  project: Project;
}

export default function ProjectDescription({ project }: ProjectDescriptionProps) {
  if (!project.description) return null;
  return (
    <p className="leading-relaxed opacity-80 whitespace-pre-line font-sans">
      {project.description}
    </p>
  );
}