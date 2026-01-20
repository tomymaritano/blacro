"use client";

import Link from "next/link";
import Image from "next/image";
import { CategoryProject } from "@/data/categories";

interface CategoryCardProps {
  project: CategoryProject;
  category: string;
}

/**
 * CategoryCard - Simple card for category grid display
 *
 * Layout:
 * - Image (header) with consistent aspect ratio
 * - Title (bold, uppercase)
 * - Description
 */
export default function CategoryCard({ project, category }: CategoryCardProps) {
  return (
    <Link
      href={`/${category}/${project.slug}`}
      className="group flex flex-col gap-[22px]"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[738/486] overflow-hidden rounded-[5px]">
        <Image
          src={project.previewImage || project.headerImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 738px"
          quality={100}
          priority={false}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-[9px]">
        {/* Title */}
        <h3
          className="font-bold uppercase text-[40px] leading-[1.3] text-black/80"
          style={{ fontFamily: "var(--font-darker-grotesque), sans-serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[16px] leading-[1.7] text-[#4f4f4f] font-light"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {project.description}
        </p>
      </div>
    </Link>
  );
}
