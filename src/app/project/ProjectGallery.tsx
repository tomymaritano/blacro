// components/project/ProjectGallery.tsx
import Image from "next/image";
import { Project } from "../../../data/projects";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
      {/* Imagen principal */}
      <Image
        src={project.imageSrc}
        alt={project.title}
        width={1200}
        height={800}
        className="w-full h-auto object-cover rounded-xl"
      />

      {/* Imagenes secundarias */}
      {project.images?.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={`${project.title} image ${i + 1}`}
          width={1200}
          height={800}
          className="w-full h-auto object-cover rounded-xl"
        />
      ))}
    </section>
  );
}