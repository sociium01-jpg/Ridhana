"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  external?: boolean;
  id?: string;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  external = false,
  id,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
    btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => {
      if (btn) btn.style.transition = "";
    }, 500);
  }, []);

  const variantClasses = {
    primary:
      "bg-gold text-espresso font-semibold text-label tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-gold-light active:scale-95 shadow-gold",
    secondary:
      "bg-espresso text-bone font-semibold text-label tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-stone-dark active:scale-95",
    outline:
      "border border-espresso text-espresso font-semibold text-label tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-espresso hover:text-bone active:scale-95",
    ghost:
      "text-espresso font-medium text-label tracking-widest uppercase px-4 py-2 hover:text-gold underline-offset-4 hover:underline",
  };

  const baseClasses = clsx(
    "magnetic-btn inline-flex items-center justify-center gap-2",
    "transition-all duration-300 ease-expo-out cursor-none",
    variantClasses[variant],
    className
  );

  const wrapperProps = {
    ref: btnRef,
    className: "magnetic-btn",
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" },
  };

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <div {...wrapperProps}>
        <Link href={href} className={baseClasses} id={id} aria-label={ariaLabel} {...linkProps}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div {...wrapperProps}>
      <button onClick={onClick} className={baseClasses} id={id} aria-label={ariaLabel}>
        {children}
      </button>
    </div>
  );
}
