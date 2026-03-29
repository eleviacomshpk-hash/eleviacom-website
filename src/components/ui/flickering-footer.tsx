"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================
// Icons
// ============================================================

const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  ),

  soc2: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 120 120"
      {...props}
    >
      <defs>
        <linearGradient
          id="soc2-grad-a"
          x1="60"
          y1="0"
          x2="60"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="16" fill="url(#soc2-grad-a)" />
      <text
        x="60"
        y="44"
        textAnchor="middle"
        fill="#fff"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        SOC 2
      </text>
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fill="#c4b5fd"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        TYPE II
      </text>
      <circle cx="60" cy="82" r="10" fill="none" stroke="#c4b5fd" strokeWidth="1.5" />
      <path
        d="M55 82 l3 3 7-7"
        stroke="#c4b5fd"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  soc2Dark: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      {...props}
    >
      <rect width="120" height="120" rx="16" fill="#1e1b4b" />
      <text
        x="60"
        y="44"
        textAnchor="middle"
        fill="#a5b4fc"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        SOC 2
      </text>
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fill="#6366f1"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        TYPE II
      </text>
      <circle cx="60" cy="82" r="10" fill="none" stroke="#6366f1" strokeWidth="1.5" />
      <path
        d="M55 82 l3 3 7-7"
        stroke="#6366f1"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  hipaa: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      {...props}
    >
      <defs>
        <linearGradient
          id="hipaa-grad-a"
          x1="60"
          y1="0"
          x2="60"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="16" fill="url(#hipaa-grad-a)" />
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="#fff"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        HIPAA
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="#bae6fd"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        COMPLIANT
      </text>
      <path
        d="M51 82 l9 10 9-10"
        stroke="#bae6fd"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 72 v20"
        stroke="#bae6fd"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  hipaaDark: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      {...props}
    >
      <rect width="120" height="120" rx="16" fill="#0c4a6e" />
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        HIPAA
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="#38bdf8"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        COMPLIANT
      </text>
      <path
        d="M51 82 l9 10 9-10"
        stroke="#38bdf8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 72 v20"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  gdpr: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      {...props}
    >
      <defs>
        <linearGradient
          id="gdpr-grad-a"
          x1="60"
          y1="0"
          x2="60"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#16a34a" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="16" fill="url(#gdpr-grad-a)" />
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="#fff"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        GDPR
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="#bbf7d0"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        COMPLIANT
      </text>
      <circle cx="60" cy="85" r="8" fill="none" stroke="#bbf7d0" strokeWidth="1.5" />
      <path
        d="M56 85 l3 3 6-6"
        stroke="#bbf7d0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  gdprDark: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      {...props}
    >
      <rect width="120" height="120" rx="16" fill="#14532d" />
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="#86efac"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        GDPR
      </text>
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fill="#22c55e"
        fontSize="9"
        fontFamily="system-ui,sans-serif"
        letterSpacing="1"
      >
        COMPLIANT
      </text>
      <circle cx="60" cy="85" r="8" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M56 85 l3 3 6-6"
        stroke="#22c55e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ============================================================
// Site Config
// ============================================================

const siteConfig = {
  hero: {
    badge: "AI Architecture Studio",
    title: "ELEVIACOM",
    description:
      "Studio di Architettura AI per PMI Italiane. Chatbot, Automazioni e Agenti AI su Misura.",
    cta: {
      primary: {
        text: "Prenota Consulenza",
        url: "https://wa.me/393473596624",
      },
      secondary: {
        text: "Contatti",
        url: "/contatti",
      },
    },
  },
  footerLinks: [
    {
      title: "Azienda",
      links: [
        { id: 1, title: "Chi Siamo", url: "/chi-siamo" },
        { id: 2, title: "Consulenza", url: "/consulenza" },
        { id: 3, title: "Contatti", url: "/contatti" },
      ],
    },
  ],
};

// ============================================================
// Helper functions
// ============================================================

function getRGBA(color: string): string {
  if (typeof window === "undefined") {
    return "rgba(0, 0, 0,";
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "rgba(255, 0, 0,";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
  return `rgba(${r}, ${g}, ${b},`;
}

function colorWithOpacity(color: string, opacity: number): string {
  const rgba = getRGBA(color);
  return `${rgba}${opacity})`;
}

function focusInput(
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  e.target.classList.add(
    "ring-2",
    "ring-blue-500",
    "ring-offset-2",
    "border-transparent"
  );
}

function focusRing(element: HTMLElement | null) {
  if (!element) return;
  element.classList.add(
    "ring-2",
    "ring-blue-500",
    "ring-offset-2"
  );
}

function hasErrorInput(value: string): boolean {
  return value.trim().length === 0;
}

// ============================================================
// useMediaQuery
// ============================================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// ============================================================
// FlickeringGrid
// ============================================================

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    return getRGBA(color);
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, w, h);

      // Create text mask if text is provided
      let maskCtx: CanvasRenderingContext2D | null = null;
      if (text) {
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = w;
        maskCanvas.height = h;
        maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
        if (maskCtx) {
          maskCtx.save();
          maskCtx.scale(dpr, dpr);
          maskCtx.fillStyle = "white";
          maskCtx.font = `${fontWeight} ${fontSize}px "Inter", "Geist", -apple-system, sans-serif`;
          maskCtx.textAlign = "center";
          maskCtx.textBaseline = "middle";
          maskCtx.fillText(text, w / (2 * dpr), h / (2 * dpr));
          maskCtx.restore();
        }
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const sw = squareSize * dpr;
          const sh = squareSize * dpr;

          let opacity = squares[i * rows + j];

          // If text mask exists, boost opacity for text areas
          if (maskCtx) {
            const maskData = maskCtx.getImageData(x, y, sw, sh).data;
            const hasText = maskData.some((v, idx) => idx % 4 === 0 && v > 0);
            if (hasText) {
              opacity = Math.min(1, opacity * 3 + 0.4);
            }
          }

          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(x, y, sw, sh);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let animationFrameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let gridParams: ReturnType<typeof setupCanvas> | null = null;

    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth;
        const newHeight = height || container.clientHeight;
        setCanvasSize({ width: newWidth, height: newHeight });
        gridParams = setupCanvas(canvas, newWidth, newHeight);
      };

      updateCanvasSize();

      let lastTime = 0;
      const animate = (time: number) => {
        if (!isInView || !gridParams) return;
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;
        updateSquares(gridParams.squares, deltaTime);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        );
        animationFrameId = requestAnimationFrame(animate);
      };

      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      resizeObserver.observe(container);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);

      if (isInView) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full${className ? ` ${className}` : ""}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
}

// ============================================================
// Highlight
// ============================================================

const BLUR_FADE_DELAY = 0.04;

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

function Highlight({ children, className }: HighlightProps) {
  return (
    <span
      className={`relative inline-block rounded-md px-1 py-0.5 font-semibold${
        className ? ` ${className}` : ""
      }`}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-violet-200 to-pink-200 opacity-60 blur-sm dark:from-violet-900 dark:to-pink-900"
        aria-hidden="true"
      />
    </span>
  );
}

// ============================================================
// Footer Component
// ============================================================

export function FooterSection() {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-background">
      {/* Full-width flickering text banner */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden md:h-72">
        {/* Top edge gradient */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-20" />
        {/* Bottom edge gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-20" />

        {/* Slide 1: ELEVIACOM */}
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: showFirst ? 1 : 0 }}
        >
          <FlickeringGrid
            text="ELEVIACOM"
            fontSize={isTablet ? 48 : 130}
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            color="#6B7280"
            maxOpacity={0.35}
            flickerChance={0.15}
          />
        </div>

        {/* Slide 2: AI STUDIO */}
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: showFirst ? 0 : 1 }}
        >
          <FlickeringGrid
            text="AI STUDIO"
            fontSize={isTablet ? 48 : 130}
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            color="#6B7280"
            maxOpacity={0.35}
            flickerChance={0.15}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-xs text-muted-foreground text-center">
          {/* Links — 3 top, 3 bottom on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {siteConfig.footerLinks[0].links.map((link) => (
              <a key={link.id} href={link.url} className="hover:text-foreground transition-colors">{link.title}</a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/cookie" className="hover:text-foreground transition-colors">Cookie Policy</a>
            <a href="/termini" className="hover:text-foreground transition-colors">Termini e Condizioni</a>
          </div>
          {/* Copyright */}
          <p className="text-muted-foreground/60">
            &copy; 2026 ELEVIACOM ShPK &middot; NUIS: M66411006H
          </p>
        </div>
      </div>
    </footer>
  );
}

export {
  Icons,
  FlickeringGrid,
  Highlight,
  useMediaQuery,
  getRGBA,
  colorWithOpacity,
  focusInput,
  focusRing,
  hasErrorInput,
  BLUR_FADE_DELAY,
  siteConfig,
};
