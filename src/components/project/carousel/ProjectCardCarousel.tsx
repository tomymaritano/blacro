"use client";

import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { Project } from "../../../../data/types";
import ProjectCardImage from "../cards/ProjectCardImage";
import ProjectCardLogoOverlay from "../cards/ProjectCardLogoOverlay";
import ProjectCardCursor from "../cards/ProjectCardCursor";
import ProjectCardInfo from "../cards/ProjectCardInfo";

export default function ProjectCardCarousel({ slug, imageSrc, title, category, logo }: Project) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden rounded-sm group cursor-none w-64 sm:w-80 md:w-96 lg:w-[42.5rem] aspect-video"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        if (window.matchMedia("(pointer: fine)").matches) {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
          mouseY.set(e.clientY - rect.top);
        }
      }}
    >
      <Link href={`/project/${slug}`} aria-label={`See project ${title}`} className="absolute inset-0 z-10 cursor-none" />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardCursor isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
}