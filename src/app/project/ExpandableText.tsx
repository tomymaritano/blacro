"use client";

import { useState } from "react";

interface ExpandableTextProps {
    content: string;
    previewLines?: number;
    expandText?: string;
    collapseText?: string;
    renderButton?: (expanded: boolean, toggle: () => void) => React.ReactNode;
}

export default function ExpandableText({ content, previewLines = 3, expandText = "Leer más", collapseText = "Leer menos", renderButton }: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false);

    // Separar por párrafos
    const paragraphs = content.trim().split("\n\n");
    const displayedParagraphs = expanded ? paragraphs : paragraphs.slice(0, previewLines);

    const toggle = () => setExpanded(!expanded);

    return (
        <div className="text-black opacity-80 leading-relaxed space-y-4">
            {displayedParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            {paragraphs.length > previewLines && (
                renderButton ? renderButton(expanded, toggle) : (
                    <button
                        onClick={toggle}
                        className="
      mt-4 inline-block px-6 py-2 border border-black/50 rounded-full
      bg-white text-black/80 text-sm font-medium
      hover:bg-black hover:text-white
      transition-all duration-200 shadow-sm hover:shadow-md
    "
                    >
                        {expanded ? collapseText : expandText}
                    </button>
                )
            )}
        </div>
    );
}