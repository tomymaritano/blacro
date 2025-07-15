"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import CloudinaryImage from "../common/CloudinaryImage";
import { Project } from "@/data/types";

interface MainImageCardProps {
  project: Project;
  index: number;
}

function MainImageCard({ project, index }: MainImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className="relative w-full h-64 sm:h-80 md:h-[542px] overflow-hidden rounded-sm group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4, 
        ease: "easeOut"
      }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Main Image */}
      <CloudinaryImage
        src={project.imageSrc}
        alt={project.title}
        fill
        priority={index < 2}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
      />
      
      {/* Dark Overlay on Hover */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Logo Overlay */}
      {project.logo && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <CloudinaryImage
            src={project.logo}
            alt={`${project.title} logo`}
            crop="limit"
            className="block max-w-full max-h-full object-contain"
            style={{
              width: 'auto',
              height: 'auto'
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <Link href={`/project/${project.slug}`} className="block">
      {content}
    </Link>
  );
}

interface MainImageGridProps {
  projects: Project[];
  title?: string;
}

export default function MainImageGrid({ projects, title }: MainImageGridProps) {
  return (
    <section className="w-full max-w-full mx-auto space-y-6">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project, index) => (
          <MainImageCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}