// components/project/ProjectGallery.tsx
import CloudinaryImage from "../../common/CloudinaryImage";
import { Project } from "@/data/types";

interface ProjectGalleryProps {
    project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
    return (
        <section className="col-span-12 lg:col-span-8 max-h-screen lg:max-h-none overflow-y-auto lg:overflow-y-visible pr-2">
            {/* Imagen principal */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[21/9] overflow-hidden rounded-none mb-6">
                <CloudinaryImage
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Imagenes secundarias */}
            {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {project.images.map((img, i) => (
                        <div 
                            key={i}
                            className={`relative overflow-hidden rounded-none ${
                                img.size === "large" ? "col-span-2 md:col-span-6 aspect-[16/10] md:aspect-[21/9]" : 
                                img.size === "medium" ? "col-span-2 md:col-span-3 aspect-[4/3] md:aspect-[3/4]" : 
                                "col-span-1 md:col-span-2 aspect-square md:aspect-[3/4]"
                            }`}>
                            <CloudinaryImage
                                src={img.src}
                                alt={`${project.title} image ${i + 1}`}
                                fill
                                crop="fill"
                                sizes={
                                    img.size === "large" ? "(max-width: 768px) 100vw, 100vw" :
                                    img.size === "medium" ? "(max-width: 768px) 100vw, 50vw" :
                                    "(max-width: 768px) 50vw, 33vw"
                                }
                                priority={i < 2}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}