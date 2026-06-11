"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimationConfig {
  selector?: string
  animation: gsap.TweenVars
  scrollTrigger?: Omit<ScrollTrigger.Vars, "trigger">
}

export function useGsapAnimation(
  configs: AnimationConfig[],
  deps: unknown[] = []
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      configs.forEach(({ selector, animation, scrollTrigger }) => {
        const targets = selector ? element.querySelectorAll(selector) : element

        if (scrollTrigger) {
          gsap.fromTo(
            targets,
            { ...animation, ...{ opacity: 0, y: 40 } },
            {
              ...animation,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                ...scrollTrigger,
              },
            }
          )
        } else {
          gsap.fromTo(targets, { opacity: 0, y: 40 }, animation)
        }
      })
    }, element)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
