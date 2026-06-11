"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const prefersReduced = useReducedMotion()

  const words = children.split(" ")

  if (prefersReduced) {
    return (
      <div className={className}>
        <Tag>{children}</Tag>
      </div>
    )
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay + i * 0.05,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
