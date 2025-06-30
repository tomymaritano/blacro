"use client";

import { useState, useEffect } from "react";

interface ExpandableTextProps {
    content: string;
    previewLines?: number;
    expandText?: string;
    collapseText?: string;
    renderButton?: (expanded: boolean, toggle: () => void) => React.ReactNode;
}

export default function ExpandableText({
    content,
    previewLines = 3,
    expandText = "Leer más",
    collapseText = "Leer menos",
    renderButton,
}: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false);
    const [visibleLines, setVisibleLines] = useState(previewLines);

    useEffect(() => {
        // Actualiza el número de líneas visibles según el ancho
        const updateLines = () => {
            if (window.innerWidth < 768) {
                setVisibleLines(1); // Mobile
            } else {
                setVisibleLines(previewLines); // Desktop u otros
            }
        };
        updateLines();
        window.addEventListener("resize", updateLines);
        return () => window.removeEventListener("resize", updateLines);
    }, [previewLines]);

    const paragraphs = content.trim().split("\n\n");
    const displayedParagraphs = expanded ? paragraphs : paragraphs.slice(0, visibleLines);

    const toggle = () => setExpanded(!expanded);

    return (
        <div className="text-black opacity-80 leading-relaxed space-y-4 font-sans">
            {displayedParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            {paragraphs.length > visibleLines && (
                renderButton ? (
                    renderButton(expanded, toggle)
                ) : (
                    <button
                        onClick={toggle}
                        className="mt-4 inline-block px-6 py-2 border border-black/50 rounded-full text-black/80 text-sm font-medium hover:bg-black hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        {expanded ? collapseText : expandText}
                    </button>
                )
            )}
        </div>
    );
}