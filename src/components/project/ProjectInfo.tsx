"use client";

import { motion } from "framer-motion";

export interface ProjectMetaItem {
  label: string;
  value: string;
}

interface ProjectInfoProps {
  metadata: ProjectMetaItem[];
  description: string;
}

export default function ProjectInfo({ metadata, description }: ProjectInfoProps) {
  // Split description by double newlines for paragraphs
  const paragraphs = description.split('\n\n').filter(Boolean);

  // Define the order of metadata labels
  const labelOrder = ["ubicación", "año", "servicios", "cliente"];

  // Filter out category items and sort by defined order
  const filteredMetadata = metadata
    .filter((item) => item.label.toLowerCase() !== "categoría")
    .sort((a, b) => {
      const indexA = labelOrder.indexOf(a.label.toLowerCase());
      const indexB = labelOrder.indexOf(b.label.toLowerCase());
      // If not in the order list, put at the end
      const orderA = indexA === -1 ? labelOrder.length : indexA;
      const orderB = indexB === -1 ? labelOrder.length : indexB;
      return orderA - orderB;
    });

  return (
    <motion.section
      className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[194px] items-start">
        {/* Metadata Grid */}
        <div className="flex flex-wrap gap-y-[47px] gap-x-[164px] w-full lg:w-[510px] shrink-0">
          {filteredMetadata.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-1 w-[173px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <p className="text-[15.73px] text-black leading-[1.3] tracking-[-0.25px] uppercase" style={{ fontFamily: 'var(--font-darker-grotesque)', fontWeight: 700 }}>
                ({item.label})
              </p>
              <p className="font-normal text-[15.73px] text-[#8e8e93] leading-[1.3] tracking-[-0.25px]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          className="text-[#272727] text-[14px] leading-[1.5] max-w-[1006px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
