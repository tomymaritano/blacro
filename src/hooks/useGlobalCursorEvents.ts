"use client";

import { useState, useEffect, useCallback } from "react";

interface CursorState {
  mousePosition: { x: number; y: number };
  isClicked: boolean;
  isVisible: boolean;
  isHovering: boolean;
}

export function useGlobalCursorEvents() {
  const [cursorState, setCursorState] = useState<CursorState>({
    mousePosition: { x: 0, y: 0 },
    isClicked: false,
    isVisible: false,
    isHovering: false
  });

  const isCursorEnabled = useCallback(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth >= 1024;
    return !isTouchDevice && isDesktop;
  }, []);

  const isInteractiveElement = useCallback((target: HTMLElement): boolean => {
    return target.tagName === 'A' || 
           target.tagName === 'BUTTON' || 
           !!target.closest('a') || 
           !!target.closest('button') ||
           !!target.closest('[role="button"]') ||
           !!target.closest('[data-clickable]') ||
           target.style.cursor === 'pointer' ||
           target.classList.contains('cursor-pointer');
  }, []);

  useEffect(() => {
    if (!isCursorEnabled()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        mousePosition: { x: e.clientX, y: e.clientY },
        isVisible: true,
        isHovering: isInteractiveElement(e.target as HTMLElement)
      }));
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicked: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicked: false }));
    };

    const handleClick = () => {
      setCursorState(prev => ({ ...prev, isClicked: true }));
      setTimeout(() => {
        setCursorState(prev => ({ ...prev, isClicked: false }));
      }, 500);
    };
    
    const handleMouseLeave = () => {
      setCursorState(prev => ({
        ...prev,
        isVisible: false,
        isClicked: false,
        isHovering: false
      }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isCursorEnabled, isInteractiveElement]);

  return {
    ...cursorState,
    isCursorEnabled: isCursorEnabled()
  };
}