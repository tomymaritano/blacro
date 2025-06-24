// components/project/ProjectGallery.tsx
import Image from "next/image";
import { Project } from "../../../data/projects";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  // Detectar tipo de imagen para determinar el grid general
  const hasSmall = project.images?.some(img => img.size === "small");
  const hasMedium = project.images?.some(img => img.size === "medium");
  const layoutClass = hasSmall
    ? "grid-cols-3"
    : hasMedium
    ? "grid-cols-2"
    : "grid-cols-1";

  return (
    <section className="col-span-12 lg:col-span-8 max-h-screen lg:max-h-none overflow-y-auto lg:overflow-y-visible pr-2">
      {/* Imagen principal */}
      <Image
        src={project.imageSrc}
        alt={project.title}
        width={1200}
        height={800}
        className="w-full h-auto object-cover rounded-xl mb-6"
      />

      {/* Imagenes secundarias */}
      {project.images && project.images.length > 0 && (
        <div className={`grid ${layoutClass} gap-4`}>
          {project.images.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={`${project.title} image ${i + 1}`}
              width={1200}
              height={400}
              className={`w-full h-auto object-cover rounded-xl ${
                img.size === "large"
                  ? "col-span-full lg:h-[342px]"
                  : img.size === "medium"
                  ? ""
                  : ""
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}