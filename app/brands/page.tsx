import { BrandShowcase } from "@/components/expanded-brands/brand-showcase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile Brands Database - Complete Manufacturer Guide | FilesHub",
  description:
    "Comprehensive database of mobile device manufacturers including Apple, Samsung, Xiaomi, OPPO, Vivo and more. Find repair information, market data, and device compatibility.",
  keywords:
    "mobile brands, smartphone manufacturers, Apple, Samsung, Xiaomi, OPPO, Vivo, OnePlus, Huawei, mobile repair, device compatibility, market share",
  openGraph: {
    title: "Mobile Brands Database - Complete Manufacturer Guide",
    description: "Comprehensive database of mobile device manufacturers with repair information and market data.",
    type: "website",
  },
}

export default function BrandsPage() {
  return <BrandShowcase />
}
