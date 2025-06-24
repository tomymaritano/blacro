"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    href: string;
    imageSrc: string;
    title: string;
    category?: string;
    logo?: string;
}

export default function ProjectCard({ href, imageSrc, title, category, logo }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }}
            whileHover={{ rotate: -2, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl group cursor-none"
        >
            {/* Link que cubre todo */}
            <Link href={href} className="absolute inset-0 z-10 cursor-none" />

            {/* Imagen */}
            <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:md:blur-md"
            />

            {/* Overlay con logo */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:md:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-500 ease-in-out z-20">
                {logo && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-24 h-24 flex items-center justify-center"
                    >
                        <Image src={logo} alt={`${title} logo`} width={96} height={96} className="object-contain" />
                    </motion.div>
                )}
            </div>

            {/* Cursor personalizado */}
            {isHovered && (
                <motion.div
                    className="absolute z-50 w-16 h-16 bg-white/25 backdrop-blur-md border border-black/10 rounded-full flex items-center justify-center shadow-xl pointer-events-none"
                    style={{ top: mouseY, left: mouseX, translateX: "-50%", translateY: "-50%" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ArrowUpRight className="w-6 h-6 text-black" />
                </motion.div>
            )}

            {/* Info */}
            {/* Info */}
            <div className="absolute bottom-4 left-4 z-30 text-sm sm:text-base md:text-lg">
                {category && (
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="uppercase text-xs font-medium bg-white text-black px-2 py-1 mb-2 rounded"
                    >
                        {category}
                    </motion.span>
                )}
                <h3 className="font-medium text-white">{title}</h3>
            </div>
        </motion.div>
    );
}