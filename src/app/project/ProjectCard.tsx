"use client";

import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState, memo, useCallback } from "react";
import ProjectCardImage from "./ProjectCardImage";
import ProjectCardLogoOverlay from "./ProjectCardLogoOverlay";
import ProjectCardCursor from "./ProjectCardCursor";
import ProjectCardInfo from "./ProjectCardInfo";
import { Project } from "../../../data/types";

interface ProjectCardProps extends Project {
  index?: number;
}

const ProjectCard = memo<ProjectCardProps>(function ProjectCard({ 
  slug, 
  imageSrc, 
  title, 
  category, 
  logo, 
  index = 0 
}: ProjectCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Memoize calculations that depend on index
  const rowIndex = Math.floor(index / 2);
  const columnIndex = index % 2;
  const delay = rowIndex * 0.2 + columnIndex * 0.1;

  // Memoize event handlers to prevent unnecessary re-renders
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 1, 0.5, 1], type: "spring", stiffness: 100 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseMove={handleMouseMove}
      whileHover={{ rotate: -2, scale: 1.03 }}
      className="relative w-full h-64 sm:h-80 md:h-[542px] overflow-hidden rounded-sm group cursor-none"
    >
      <Link href={`/project/${slug}`} className="absolute inset-0 z-10 cursor-none" />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardCursor isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
});

export default ProjectCard;