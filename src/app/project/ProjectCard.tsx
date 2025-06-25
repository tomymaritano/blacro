"use client";

import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import ProjectCardImage from "./ProjectCardImage";
import ProjectCardLogoOverlay from "./ProjectCardLogoOverlay";
import ProjectCardCursor from "./ProjectCardCursor";
import ProjectCardInfo from "./ProjectCardInfo";
import { Project } from "../../../data/types";

interface ProjectCardProps extends Project {
  index?: number;
}

export default function ProjectCard({ slug, imageSrc, title, category, logo, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rowIndex = Math.floor(index / 2);
  const columnIndex = index % 2;
  const delay = rowIndex * 0.2 + columnIndex * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 1, 0.5, 1], type: "spring", stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ rotate: -2, scale: 1.03 }}
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-md group cursor-none"
    >
      <Link href={`/project/${slug}`} className="absolute inset-0 z-10 cursor-none" />
      <ProjectCardImage imageSrc={imageSrc} title={title} />
      <ProjectCardLogoOverlay logo={logo} isHovered={isHovered} title={title} />
      <ProjectCardCursor isHovered={isHovered} mouseX={mouseX} mouseY={mouseY} />
      <ProjectCardInfo category={category} title={title} isHovered={isHovered} />
    </motion.div>
  );
}