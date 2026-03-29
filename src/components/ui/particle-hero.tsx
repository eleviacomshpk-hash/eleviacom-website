"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind"

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  fadeDelay: number
  fadeStart: number
  fadingOut: boolean
  reset: () => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGoldMode, setIsGoldMode] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() / 5 + 0.1
        this.opacity = 1
        this.fadeDelay = Math.random() * 600 + 100
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      },
      update() {
        this.y -= this.speed
        if (this.y < 0) {
          this.reset()
        }
        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true
        }
        if (this.fadingOut) {
          this.opacity -= 0.008
          if (this.opacity <= 0) {
            this.reset()
          }
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1)
      },
    }
    particle.reset()
    particle.y = Math.random() * canvas.height
    particle.fadeDelay = Math.random() * 600 + 100
    particle.fadeStart = Date.now() + particle.fadeDelay
    particle.fadingOut = false
    return particle
  }

  const calculateParticleCount = (canvas: HTMLCanvasElement) => {
    return Math.floor((canvas.width * canvas.height) / 6000)
  }

  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = calculateParticleCount(canvas)
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas))
    }
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particlesRef.current.forEach((particle) => {
      particle.update()
      particle.draw(ctx)
    })
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
    animate(canvas, ctx)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const toggleGoldMode = () => {
    setIsGoldMode(!isGoldMode)
  }

  return (
    <div
      className={`relative min-h-[70svh] md:min-h-[100svh] w-full ${isGoldMode ? "gold-mode" : ""}`}
      style={{
        background: "#000000",
        fontSize: "max(calc(min(600px, 80vh) * 0.03), 10px)",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      }}
    >
      <style jsx>{`
        .gold-mode .header h2,
        .gold-mode p,
        .gold-mode > * > * :not(.contact-btn) {
          filter: invert(1) brightness(4.7);
        }
        .gold-mode canvas {
          filter: drop-shadow(2em 4em 0px #d8bd10) drop-shadow(-8em -14em 0px #d8bd10);
        }
        .gold-mode .header .spotlight {
          filter: invert(1) brightness(4.7) opacity(0.5);
        }
        .gold-mode .header > div.mid-spot {
          box-shadow: 0 0 1em 0 #d8bd10;
        }

        @keyframes load {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes up {
          100% { transform: translateY(0); }
        }
        @keyframes pulse {
          0% { --p: 0%; }
          50% { --p: 300%; }
          100% { --p: 300%; }
        }
        @keyframes spotlight {
          0% { transform: rotateZ(0deg) scale(1); filter: blur(15px) opacity(0.5); }
          20% { transform: rotateZ(-1deg) scale(1.2); filter: blur(16px) opacity(0.6); }
          40% { transform: rotateZ(2deg) scale(1.3); filter: blur(14px) opacity(0.4); }
          60% { transform: rotateZ(-2deg) scale(1.2); filter: blur(15px) opacity(0.6); }
          80% { transform: rotateZ(1deg) scale(1.1); filter: blur(13px) opacity(0.4); }
          100% { transform: rotateZ(0deg) scale(1); filter: blur(15px) opacity(0.5); }
        }
        @keyframes loadrot {
          0% { transform: rotate(0deg) scale(0); }
          100% { transform: scale(1); }
        }

        @property --p {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 0%;
        }
      `}</style>

      {/* Gold mode toggle dot */}
      <div
        className="mid-spot"
        onClick={toggleGoldMode}
        style={{
          position: "absolute",
          top: "2em",
          left: "50%",
          marginLeft: "-0.9em",
          width: "1.8em",
          height: "1.8em",
          /* dot sits at center-top, spotlight originates from same point */
          borderRadius: "50%",
          background: "black",
          boxShadow: "0 0 1em 0 #98c0ef",
          cursor: "pointer",
          transition: "box-shadow 1s ease-in-out",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isGoldMode
            ? "-0.3em 0.1em 0.2em 0 #98c0ef"
            : "-0.3em 0.1em 0.2em 0 #d8bd10"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isGoldMode ? "0 0 1em 0 #d8bd10" : "0 0 1em 0 #98c0ef"
        }}
      />

      {/* Spotlight beams */}
      <div
        className="spotlight"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          animation: "load 2s ease-in-out forwards",
          overflow: "visible",
          maskImage: "linear-gradient(to bottom, white 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 80%, transparent 100%)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: "0 0 50% 50%",
              position: "absolute",
              left: "50%",
              marginLeft: "-15em",
              top: "2em",
              width: "30em",
              height: "130%",
              backgroundImage:
                "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(124, 145, 182, .3) 49%, rgba(124, 145, 182, .5) 50%, rgba(124, 145, 182, .3) 51%, transparent 55%)",
              transformOrigin: "50% 0",
              filter: "blur(15px) opacity(0.5)",
              transform: i === 0 ? "rotate(20deg)" : i === 1 ? "rotate(-20deg)" : "rotate(0deg)",
              animation:
                i === 0
                  ? "loadrot 2s ease-in-out forwards, spotlight 17s ease-in-out infinite"
                  : i === 1
                    ? "loadrot 2s ease-in-out forwards, spotlight 14s ease-in-out infinite"
                    : "loadrot 2s ease-in-out forwards, spotlight 21s ease-in-out infinite reverse",
            }}
          />
        ))}
      </div>

      {/* Canvas — particles */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          animation: "load 0.4s ease-in-out forwards",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Hero text — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4" style={{ zIndex: 2 }}>
        <div
          style={{
            opacity: 0,
            animation: "load 2s ease-in-out 0.6s forwards",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(3rem, 12vw, 7em)",
              fontWeight: 600,
              color: "#9dc3f7",
              background: `
                radial-gradient(2em 2em at 50% 50%,
                  transparent calc(var(--p, 0%) - 2em),
                  #fff calc(var(--p, 0%) - 1em),
                  #fff calc(var(--p, 0%) - 0.4em),
                  transparent var(--p, 0%)
                ),
                linear-gradient(0deg, #bad1f1 30%, #9dc3f7 100%)
              `,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 16px rgba(174,207,242,.24)",
              textAlign: "center",
              lineHeight: 1.1,
              animation: "pulse 10s linear 1.2s infinite",
            }}
          >
            ELEVIACOM
          </h2>
        </div>

        <p
          style={{
            fontSize: "clamp(0.95rem, 2.5vw, 1.3em)",
            marginTop: "1.5em",
            textAlign: "center",
            opacity: 0,
            transform: "translateY(1em)",
            animation: "load 2s ease-out 2s forwards, up 1.4s ease-out 2s forwards",
            background: "linear-gradient(0deg, #d8ecf8 0, #98c0ef 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.6,
            maxWidth: "500px",
          }}
        >
          Studio di Architettura AI per PMI Italiane
          <br />
          Chatbot, Automazioni e Agenti AI su Misura
        </p>

        <div
          style={{
            opacity: 0,
            animation: "load 2s ease-out 2.5s forwards, up 1.4s ease-out 2.5s forwards",
            transform: "translateY(1em)",
            marginTop: "2em",
          }}
        >
          <a href="https://wa.me/393473596624" target="_blank" rel="noopener noreferrer">
            <AnimatedGenerateButton
              labelIdle="Prenota Consulenza"
              labelActive="Apri WhatsApp"
              highlightHueDeg={210}
            />
          </a>
        </div>
      </div>
    </div>
  )
}
