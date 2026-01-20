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
          {metadata.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-2 w-[173px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <p
                className="font-extrabold text-[14.747px] uppercase text-[#0e1011] leading-none"
                style={{ fontFamily: "var(--font-darker-grotesque), sans-serif" }}
              >
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
