"use client";
import Image from "next/image";

interface ProjectCardImageProps {
  imageSrc: string;
  title: string;
}

export default function ProjectCardImage({ imageSrc, title }: ProjectCardImageProps) {
  return (
    <Image
      src={imageSrc}
      alt={`Cover image for the project "${title}"`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-in-out group-hover:md:blur-md"
    />
  );
}