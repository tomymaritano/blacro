"use client";

import { Menu, X } from "lucide-react";

interface MobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileToggle({ isOpen, onClick }: MobileToggleProps) {
  return (
    <button
      className="col-span-10 flex justify-end md:hidden p-2 font-grotesque transition-transform hover:scale-105"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X size={28} className="text-black" />
      ) : (
        <Menu size={28} className="text-black" />
      )}
    </button>
  );
}