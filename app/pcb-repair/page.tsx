import { PCBRepairSection } from "@/components/pcb-repair/pcb-repair-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PCB Repair Hub - Professional Mobile Device PCB Repair Solutions | FilesHub",
  description:
    "Complete PCB repair solutions for mobile devices. Find components, repair guides, and professional tools for power IC, audio IC, RF IC, camera IC, display IC, and sensor IC repairs.",
  keywords:
    "PCB repair, mobile PCB, IC replacement, power IC, audio IC, RF IC, camera IC, display IC, sensor IC, mobile repair tools, BGA reballing, hot air rework",
  openGraph: {
    title: "PCB Repair Hub - Professional Mobile Device PCB Repair Solutions",
    description: "Complete PCB repair solutions for mobile devices with components, guides, and professional tools.",
    type: "website",
  },
}

export default function PCBRepairPage() {
  return <PCBRepairSection />
}
