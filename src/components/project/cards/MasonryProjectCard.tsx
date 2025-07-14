// app/components/project/MasonryProjectCard.tsx
"use client";

import CloudinaryImage from "../../common/CloudinaryImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface MasonryProjectCardProps {
  slug: string;
  imageSrc: string;
  title: string;
  category?: string;
  logo?: string;
  index?: number;
}

export default function MasonryProjectCard({
  slug,
  imageSrc,
  title,
  category,
  logo,
  index = 0,
}: MasonryProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
        type: "spring",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full overflow-hidden rounded-sm group"
    >
      {/* Link */}
      <Link href={`/project/${slug}`} className="absolute inset-0 z-10" />

      {/* Imagen del proyecto */}
      <CloudinaryImage
        src={imageSrc}
        alt={title}
        width={1600}
        height={900}
        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:blur-md"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
        priority={index < 3}
        loading={index < 3 ? "eager" : "lazy"}
      />

      {/* Overlay del logo */}
      {logo && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-500 ease-in-out z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <CloudinaryImage
            src={logo}
            alt={`${title} logo`}
            width={96}
            height={96}
            className="object-contain"
          />
        </motion.div>
      )}


      {/* Info del proyecto */}
      <div className="absolute bottom-3 left-3 z-30 text-xs sm:text-sm md:text-base space-y-1">
        {category && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-black uppercase text-[10px] font-medium px-2 py-0.5 rounded-sm"
          >
            {category}
          </motion.span>
        )}
        <h3 className="font-medium text-white font-sans">{title}</h3>
      </div>
    </motion.div>
  );
}