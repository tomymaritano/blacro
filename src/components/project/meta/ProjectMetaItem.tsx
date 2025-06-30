// components/project/ProjectMetaItem.tsx
import { Darker_Grotesque } from "next/font/google";
import React from "react";

const darkerGrotesque = Darker_Grotesque({ subsets: ['latin'], variable: '--font-darker-grotesque' });

interface ProjectMetaItemProps {
  label: string;
  children: React.ReactNode;
}

export default function ProjectMetaItem({ label, children }: ProjectMetaItemProps) {
  return (
    <div className="text-sm opacity-80">
      <span className={`${darkerGrotesque.className} uppercase font-extrabold block mb-1`}>
        ({label})
      </span>
      {children}
    </div>
  );
}