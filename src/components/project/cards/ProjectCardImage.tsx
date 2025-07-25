"use client";
import CloudinaryImage from "../../common/CloudinaryImage";

interface ProjectCardImageProps {
  imageSrc: string;
  title: string;
}

export default function ProjectCardImage({ imageSrc, title }: ProjectCardImageProps) {
  return (
    <div className="w-full h-full">
      <CloudinaryImage
        src={imageSrc}
        alt={`Cover image for the project "${title}"`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:md:blur-md"
      />
    </div>
  );
}