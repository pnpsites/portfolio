import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className, width = 120, height = 40 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Parth Sites"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  )
}
