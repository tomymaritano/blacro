"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, memo, useCallback, useMemo } from "react";
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

  // Memoize delay calculation for staggered animations
  const delay = useMemo(() => {
    const row = Math.floor((index || 0) / 2);
    const col = (index || 0) % 2;
    return row * 0.15 + col * 0.05; // Reduced delay for faster animations
  }, [index]);

  // Simplified event handlers without mouse tracking for better mobile performance
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ y: -4, scale: 1.01 }}
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