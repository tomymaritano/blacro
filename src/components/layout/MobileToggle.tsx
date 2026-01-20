"use client";

import { Menu, X } from "lucide-react";

interface MobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
  textColor?: string;
}

export default function MobileToggle({ isOpen, onClick, textColor }: MobileToggleProps) {
  const iconColor = textColor?.includes("text-white") ? "text-white" : "text-black";

  return (
    <button
      className="col-span-10 flex justify-end md:hidden p-2 font-grotesque transition-transform hover:scale-105"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X size={28} className={`${iconColor} transition-colors duration-300`} />
      ) : (
        <Menu size={28} className={`${iconColor} transition-colors duration-300`} />
      )}
    </button>
  );
}