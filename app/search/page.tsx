import { ICComponentSearch } from "@/components/search/ic-component-search"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IC Component Search - Find Compatible ICs and Components | FilesHub",
  description:
    "Search our comprehensive database of IC components and find compatible devices, repair information, datasheets, and pricing for mobile device repair.",
  keywords:
    "IC search, component search, mobile IC, power IC, audio IC, RF IC, camera IC, display IC, sensor IC, datasheet, mobile repair components",
  openGraph: {
    title: "IC Component Search - Find Compatible ICs and Components",
    description: "Search our comprehensive database of IC components for mobile device repair.",
    type: "website",
  },
}

export default function SearchPage() {
  return <ICComponentSearch />
}
