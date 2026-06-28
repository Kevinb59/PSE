"use client";

import { forwardRef, type ReactNode } from "react";

interface SlideSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Conteneur de slide plein écran avec snap scroll et halo lumineux.
 */
const SlideSection = forwardRef<HTMLElement, SlideSectionProps>(
  ({ id, title, children, className = "", contentClassName = "" }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-title={title}
        className={`section-glow relative grid min-h-screen w-full snap-start snap-always items-center overflow-x-hidden overflow-y-visible px-[8vw] pb-[76px] pt-[110px] max-md:min-h-0 max-md:px-[22px] max-md:pb-[72px] max-md:pt-[96px] ${className}`}
      >
        <div className={`relative mx-auto w-full max-w-[1220px] ${contentClassName}`}>{children}</div>
      </section>
    );
  }
);

SlideSection.displayName = "SlideSection";

export default SlideSection;
