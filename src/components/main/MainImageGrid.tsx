"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import CloudinaryImage from "../common/CloudinaryImage";
import { MainImage } from "../../data/mainImages";

interface MainImageCardProps extends MainImage {
  index: number;
}

function MainImageCard({ imageSrc, logoSrc, title, href, index }: MainImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className="relative w-full h-64 sm:h-80 md:h-[542px] overflow-hidden rounded-sm group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1], 
        type: "spring", 
        stiffness: 100 
      }}
      whileHover={{ rotate: -1, scale: 1.02 }}
    >
      {/* Main Image */}
      <CloudinaryImage
        src={imageSrc}
        alt={title}
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
      {logoSrc && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <CloudinaryImage
            src={logoSrc}
            alt={`${title} logo`}
            width={120}
            height={120}
            className="object-contain max-w-[120px] max-h-[120px]"
          />
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

interface MainImageGridProps {
  images: MainImage[];
  title?: string;
}

export default function MainImageGrid({ images, title }: MainImageGridProps) {
  return (
    <section className="w-full max-w-full mx-auto space-y-6">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {images.map((image, index) => (
          <MainImageCard key={image.id} {...image} index={index} />
        ))}
      </div>
    </section>
  );
}