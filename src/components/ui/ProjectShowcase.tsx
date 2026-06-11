"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { projects } from "@/lib/data"

function useScreenshot(url: string) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    setSrc(null)
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`
    fetch(api)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data?.screenshot?.url) setSrc(d.data.screenshot.url)
      })
      .catch(() => {})
  }, [url])

  return src
}

const showcaseProjects = [
  { ...projects[0], floatY: 12, floatDuration: 6, delay: 0, scale: 1, zIndex: 20, label: "Main" },
  { ...projects[1], floatY: 10, floatDuration: 7, delay: 0.8, scale: 0.92, zIndex: 15, label: "Left" },
  { ...projects[3], floatY: 14, floatDuration: 8, delay: 1.6, scale: 0.92, zIndex: 15, label: "Right" },
  { ...projects[2], floatY: 8, floatDuration: 9, delay: 0.4, scale: 0.82, zIndex: 10, label: "BackLeft" },
  { ...projects[4], floatY: 11, floatDuration: 7.5, delay: 1.2, scale: 0.82, zIndex: 10, label: "BackRight" },
]

function ProjectCard({
  project,
  prefersReduced,
}: {
  project: (typeof showcaseProjects)[0]
  prefersReduced: boolean
}) {
  const screenshot = useScreenshot(project.links.live)
  const [imgLoaded, setImgLoaded] = useState(false)
  const p = project

  const positions: Record<string, { x: string; y: string }> = {
    Main: { x: "left-1/2 -translate-x-1/2", y: "top-1/2 -translate-y-1/2" },
    Left: { x: "left-0 md:left-4", y: "top-1/2 -translate-y-1/2 md:translate-y-0 md:top-8" },
    Right: { x: "right-0 md:right-4", y: "top-1/2 -translate-y-1/2 md:translate-y-0 md:top-12" },
    BackLeft: { x: "left-0 md:-left-2", y: "top-1/2 -translate-y-1/2 md:translate-y-0 md:top-2" },
    BackRight: { x: "right-0 md:-right-2", y: "top-1/2 -translate-y-1/2 md:translate-y-0 md:top-6" },
  }

  const pos = positions[p.label] || positions.Main

  return (
    <motion.div
      className={`absolute ${pos.x} ${pos.y}`}
      style={{ zIndex: p.zIndex }}
      animate={
        prefersReduced
          ? {}
          : {
              y: [0, -p.floatY, 0],
            }
      }
      transition={{
        duration: p.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: p.delay,
      }}
    >
      <div
        className="relative"
        style={{ transform: `scale(${p.scale})`, transformOrigin: "center center" }}
      >
        <div className="relative rounded-xl overflow-hidden border border-primary/10 bg-white/80 backdrop-blur-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-500">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white/90 border-b border-primary/8">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 mx-2 px-2 py-0.5 rounded-md bg-primary/5 text-[10px] text-muted/50 truncate text-center leading-5">
              {new URL(project.links.live).hostname}
            </div>
          </div>

          {/* Screenshot area */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="aspect-[4/3] relative">
              {screenshot ? (
                <>
                  <img
                    src={screenshot}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      imgLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImgLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-8 h-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                    <p className="text-xs text-muted/40">{project.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectShowcase() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="relative w-full h-[420px] md:h-[500px]">
      {/* Ambient glow behind the showcase */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/8 to-transparent rounded-3xl blur-3xl opacity-60" />

      {/* Floating cards */}
      <div className="absolute inset-0">
        {showcaseProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </div>
  )
}
