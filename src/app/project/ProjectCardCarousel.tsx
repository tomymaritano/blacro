"use client";

import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { Project } from "../../../data/types";
import ProjectCardImage from "./ProjectCardImage";
import ProjectCardLogoOverlay from "./ProjectCardLogoOverlay";
import ProjectCardCursor from "./ProjectCardCursor";
import ProjectCardInfo from "./ProjectCardInfo";

export default function ProjectCardCarousel({ slug, imageSrc, title, category, logo }: Project) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden rounded-xl group cursor-none
           w-64 sm:w-80 md:w-96 lg:w-[42.5rem] aspect-video"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      <Link href={`/project/${slug}`} className="absolute inset-0 z-10 cursor-none" />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardCursor isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
}