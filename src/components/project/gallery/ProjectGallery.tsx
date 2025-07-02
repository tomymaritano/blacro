// components/project/ProjectGallery.tsx
import OptimizedImage from "../../common/OptimizedImage";
import { Project } from "../../../../data/types";

interface ProjectGalleryProps {
    project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
    return (
        <section className="col-span-12 lg:col-span-8 max-h-screen lg:max-h-none overflow-y-auto lg:overflow-y-visible pr-2">
            {/* Imagen principal */}
            <OptimizedImage
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
                <div className="grid grid-cols-6 gap-3">
                    {project.images.map((img, i) => (
                        <OptimizedImage
                            key={i}
                            src={img.src}
                            alt={`${project.title} image ${i + 1}`}
                            width={1200}
                            height={342}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`w-full h-auto object-cover rounded-none max-h-[707px] ${
                                img.size === "large" ? "col-span-6" : 
                                img.size === "medium" ? "col-span-3" : 
                                "col-span-2"
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}