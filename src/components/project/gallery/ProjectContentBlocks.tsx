// components/project/ProjectContentBlocks.tsx
"use client";

import Image from "next/image";
import ExpandableText from "../meta/ExpandableText";
import { Project, ProjectContentBlock } from "../../../../data/types";

interface ProjectContentBlocksProps {
  project: Project;
}

export default function ProjectContentBlocks({ project }: ProjectContentBlocksProps) {
  if (!project.content || project.content.length === 0) return null;

  // Unir solo los bloques tipo "text"
  const fullText = project.content
    .filter((block: ProjectContentBlock) => block.type === "text")
    .map((block) => block.content)
    .join("\n\n"); // 👈 doble salto entre párrafos

  return (
    <div className="flex flex-col space-y-4 mt-20">
      {fullText && <ExpandableText content={fullText} />}

      {project.content
        .filter((block: ProjectContentBlock) => block.type !== "text")
        .map((block: ProjectContentBlock, i: number) => {
          if (block.type === "image") {
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
          }

          if (block.type === "quote") {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-black pl-4 italic opacity-80 font-inter"
              >
                {block.content}
              </blockquote>
            );
          }

          return null;
        })}
    </div>
  );
}