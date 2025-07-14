// components/project/ProjectGallery.tsx
import CloudinaryImage from "../../common/CloudinaryImage";
import { Project } from "../../../../data/types";

interface ProjectGalleryProps {
    project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
    return (
        <section className="col-span-12 lg:col-span-8 max-h-screen lg:max-h-none overflow-y-auto lg:overflow-y-visible pr-2">
            {/* Imagen principal */}
            <CloudinaryImage
                src={project.imageSrc}
                alt={project.title}
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="w-full h-auto object-cover rounded-none mb-6"
            />

            {/* Imagenes secundarias */}
            {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {project.images.map((img, i) => (
                        <CloudinaryImage
                            key={i}
                            src={img.src}
                            alt={`${project.title} image ${i + 1}`}
                            width={img.size === "large" ? 1920 : img.size === "medium" ? 1280 : 800}
                            height={img.size === "large" ? 542 : img.size === "medium" ? 707 : 466}
                            sizes={
                                img.size === "large" ? "(max-width: 768px) 100vw, 100vw" :
                                img.size === "medium" ? "(max-width: 768px) 100vw, 50vw" :
                                "(max-width: 768px) 50vw, 33vw"
                            }
                            priority={i < 2}
                            className={`w-full object-cover rounded-none ${
                                img.size === "large" ? "col-span-2 md:col-span-6 h-[300px] md:h-[542px]" : 
                                img.size === "medium" ? "col-span-2 md:col-span-3 h-[250px] md:h-[707px]" : 
                                "col-span-1 md:col-span-2 h-[200px] md:h-[466px]"
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}