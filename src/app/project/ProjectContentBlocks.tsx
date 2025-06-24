// components/project/ProjectContentBlocks.tsx
import Image from "next/image";
import { Project } from "../../../data/projects";

interface ProjectContentBlocksProps {
  project: Project;
}

export default function ProjectContentBlocks({ project }: ProjectContentBlocksProps) {
  if (!project.content || project.content.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4 mt-4">
      {project.content.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <p key={i} className="leading-relaxed opacity-80 whitespace-pre-line">
                {block.content}
              </p>
            );
          case "image":
            return (
              <Image
                key={i}
                src={block.content}
                alt={block.imageAlt || project.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-xl"
              />
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-black pl-4 italic opacity-80"
              >
                {block.content}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}