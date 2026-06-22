"use client"

import { personalInfo } from "@/lib/data"
import TextReveal from "@/components/ui/TextReveal"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"
import ProjectShowcase from "@/components/ui/ProjectShowcase"

const serviceColors = [
  "border-primary/20 bg-primary/5",
  "border-blue-400/20 bg-blue-400/5",
  "border-secondary/20 bg-secondary/5",
  "border-accent/20 bg-accent/5",
  "border-primary/15 bg-primary/5",
  "border-blue-300/20 bg-blue-300/5",
  "border-secondary/15 bg-secondary/5",
  "border-accent/15 bg-accent/5",
  "border-primary/20 bg-primary/5",
  "border-blue-400/15 bg-blue-400/5",
  "border-secondary/20 bg-secondary/5",
]

export default function About() {

  return (
    <SectionWrapper id="about">
      <SectionAccent position="top-right" color="bg-secondary/8" size="w-96 h-96" />
      <SectionAccent position="bottom-left" color="bg-accent/6" size="w-72 h-72" />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <TextReveal
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            About Us
          </TextReveal>
          <TextReveal
            delay={0.15}
            className="text-base md:text-lg text-muted/80 leading-relaxed mb-12 md:mb-16"
          >
            Full stack developers focused on building premium digital experiences for businesses.
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Bio — 3 columns */}
          <div className="md:col-span-3 space-y-6">
            {personalInfo.bio.map((paragraph, i) => (
              <TextReveal
                key={i}
                delay={0.2 + i * 0.15}
                className="text-base md:text-lg text-muted/90 leading-[1.8]"
              >
                {paragraph}
              </TextReveal>
            ))}

            {/* Services grid */}
            <div className="mt-10 p-6 md:p-7 rounded-2xl border border-primary/8 bg-white/60 backdrop-blur-sm shadow-[0_2px_12px_-4px_rgba(37,99,235,0.06)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-4 rounded-full bg-primary/40" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-[0.15em]">
                  What We Build
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.services.map((service, i) => (
                  <span
                    key={service}
                    className={`px-3 py-1.5 text-sm rounded-full border ${serviceColors[i % serviceColors.length]} text-foreground/80 backdrop-blur-sm`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual — 2 columns */}
          <div className="md:col-span-2 md:sticky md:top-24">
            <ProjectShowcase />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
