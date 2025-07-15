"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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

  const clickTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastInteractiveCheck = useRef<{ element: HTMLElement; result: boolean } | null>(null);

  const isCursorEnabled = useCallback(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth >= 1024;
    return !isTouchDevice && isDesktop;
  }, []);

  const isInteractiveElement = useCallback((target: HTMLElement): boolean => {
    // Cache interactive element checks to avoid repeated DOM traversal
    if (lastInteractiveCheck.current?.element === target) {
      return lastInteractiveCheck.current.result;
    }

    const result = target.tagName === 'A' || 
           target.tagName === 'BUTTON' || 
           !!target.closest('a') || 
           !!target.closest('button') ||
           !!target.closest('[role="button"]') ||
           !!target.closest('[data-clickable]') ||
           target.style.cursor === 'pointer' ||
           target.classList.contains('cursor-pointer');

    lastInteractiveCheck.current = { element: target, result };
    return result;
  }, []);

  useEffect(() => {
    if (!isCursorEnabled()) return;

    // Combine multiple mouse events into a single handler for better performance
    const handleMouseEvent = (e: MouseEvent) => {
      const { type, clientX, clientY, target } = e;
      
      setCursorState(prev => {
        switch (type) {
          case 'mousemove':
            return {
              ...prev,
              mousePosition: { x: clientX, y: clientY },
              isVisible: true,
              isHovering: isInteractiveElement(target as HTMLElement)
            };
          case 'mousedown':
            return { ...prev, isClicked: true };
          case 'mouseup':
            return { ...prev, isClicked: false };
          case 'click':
            // Clear any existing timeout to prevent memory leaks
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
            }
            clickTimeoutRef.current = setTimeout(() => {
              setCursorState(current => ({ ...current, isClicked: false }));
            }, 500);
            return { ...prev, isClicked: true };
          default:
            return prev;
        }
      });
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

    // Use passive listeners where possible for better performance
    document.addEventListener("mousemove", handleMouseEvent, { passive: true });
    document.addEventListener("mousedown", handleMouseEvent);
    document.addEventListener("mouseup", handleMouseEvent);
    document.addEventListener("click", handleMouseEvent);
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      // Clear timeout on cleanup
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      document.removeEventListener("mousemove", handleMouseEvent);
      document.removeEventListener("mousedown", handleMouseEvent);
      document.removeEventListener("mouseup", handleMouseEvent);
      document.removeEventListener("click", handleMouseEvent);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isCursorEnabled, isInteractiveElement]);

  return {
    ...cursorState,
    isCursorEnabled: isCursorEnabled()
  };
}