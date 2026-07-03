"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show on pointer/mouse devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="cursor-dot" />
      </div>
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? "hovering" : ""}`}
        aria-hidden="true"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
