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
  location?: string;
  index?: number;
}

export default function MasonryProjectCard({
  slug,
  imageSrc,
  title,
  category,
  logo,
  location,
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
      className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-sm group"
    >
      {/* Link - Increased z-index to ensure clickability */}
      <Link href={`/project/${slug}`} className="absolute inset-0 z-40" aria-label={`View ${title} project`} />

      {/* Imagen del proyecto */}
      <div className="absolute inset-0 w-full h-full">
        <CloudinaryImage
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:blur-md"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          priority={index < 3}
          // Remove conflicting loading prop when priority is true
          {...(index >= 3 && { loading: "lazy" })}
        />
      </div>

      {/* Dark Overlay on Hover */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Logo Overlay */}
      {logo && (
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
            src={logo}
            alt={`${title} logo`}
            width={200}
            height={150}
            crop="limit"
            className="object-contain max-w-[200px] max-h-[150px]"
            loading="lazy"
            priority={false}
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
        {location && (
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="font-medium text-white font-sans text-xs sm:text-sm"
          >
            {location}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}