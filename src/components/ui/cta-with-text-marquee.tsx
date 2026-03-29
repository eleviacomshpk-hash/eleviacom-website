"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Chatbot AI",
  "Automazioni",
  "Agenti AI",
  "App Web",
  "Consulenza AI",
];

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground animate-fade-in-up [animation-delay:200ms]">
              Pronto a trasformare la tua azienda?
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Prenota una consulenza gratuita di 30 minuti. Ti mostreremo come
              l&apos;AI pu&ograve; ridurre i costi e aumentare le vendite della tua PMI.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 animate-fade-in-up [animation-delay:600ms]">
              <a href="https://wa.me/393473596624" target="_blank" rel="noopener noreferrer">
                <AnimatedGenerateButton
                  labelIdle="Prenota Consulenza"
                  labelActive="Apri WhatsApp"
                  highlightHueDeg={210}
                />
              </a>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[350px] md:h-[500px] lg:h-[700px] flex items-center justify-center animate-fade-in-up [animation-delay:400ms]">
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight py-4 md:py-6 marquee-item"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/50 to-transparent z-10"></div>

              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
