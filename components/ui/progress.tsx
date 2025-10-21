"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils" // optional helper

interface ProgressProps {
  value?: number
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-root"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      value={value}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-[#2F1107] h-full transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
