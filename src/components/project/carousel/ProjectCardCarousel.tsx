"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Project } from "../../../../data/types";
import ProjectCardImage from "../cards/ProjectCardImage";
import ProjectCardLogoOverlay from "../cards/ProjectCardLogoOverlay";
import ProjectCardInfo from "../cards/ProjectCardInfo";

export default function ProjectCardCarousel({ slug, imageSrc, title, category, logo }: Project) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden rounded-sm group w-64 sm:w-80 md:w-96 lg:w-[42.5rem] aspect-video"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/project/${slug}`} aria-label={`See project ${title}`} className="absolute inset-0 z-10" />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
}