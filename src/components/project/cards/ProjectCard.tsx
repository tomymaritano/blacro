"use client";

import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState, memo, useCallback } from "react";
import ProjectCardImage from "./ProjectCardImage";
import ProjectCardLogoOverlay from "./ProjectCardLogoOverlay";
import ProjectCardInfo from "./ProjectCardInfo";
import { Project } from "../../../../data/types";

/**
 * Props for the ProjectCard component
 * @interface ProjectCardProps
 * @extends {Project}
 */
interface ProjectCardProps extends Project {
  /** Optional index for staggered animations (0-based) */
  index?: number;
}

/**
 * ProjectCard - An interactive card component for displaying project previews
 * 
 * Features:
 * - Smooth animations with Framer Motion
 * - Hover effects with custom cursor
 * - Staggered entrance animations based on index
 * - Responsive design for mobile and desktop
 * - Logo overlay and project information display
 * 
 * @component
 * @param {ProjectCardProps} props - The component props
 * @param {string} props.slug - Project slug for routing
 * @param {string} props.imageSrc - Main project image source
 * @param {string} props.title - Project title
 * @param {string} [props.category] - Project category
 * @param {string} [props.logo] - Project logo source
 * @param {number} [props.index=0] - Index for staggered animations
 * @returns {React.JSX.Element} The rendered project card
 * 
 * @example
 * ```tsx
 * <ProjectCard
 *   slug="my-project"
 *   imageSrc="/images/project.jpg"
 *   title="My Project"
 *   category="Web Design"
 *   index={0}
 * />
 * ```
 */
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
      className="relative w-full h-64 sm:h-80 md:h-[542px] overflow-hidden rounded-sm group"
    >
      <Link 
        href={`/project/${slug}`} 
        className="absolute inset-0 z-10" 
        aria-label={`View ${title} project details`}
      />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
});

export default ProjectCard;