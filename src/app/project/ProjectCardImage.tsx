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
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover transition-transform duration-500 ease-in-out group-hover:md:blur-md"
    />
  );
}