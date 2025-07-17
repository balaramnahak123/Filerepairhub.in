"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Globe, Award, Download, Eye, BarChart3 } from "lucide-react"
import Image from "next/image"

interface Brand {
  id: string
  name: string
  logo: string
  country: string
  founded: number
  marketShare: number
  globalRank: number
  description: string
  specialties: string[]
  popularModels: DeviceModel[]
  repairDifficulty: "Easy" | "Medium" | "Hard" | "Expert"
  partsAvailability: "Excellent" | "Good" | "Fair" | "Poor"
  averageRepairCost: number
  totalModels: number
  activeYears: string
  website: string
  supportRating: number
  innovationScore: number
}

interface DeviceModel {
  id: string
  name: string
  year: number
  image: string
  marketShare: number
  repairFrequency: "Very High" | "High" | "Medium" | "Low"
  commonIssues: string[]
  averageRepairCost: number
  partsAvailability: "Excellent" | "Good" | "Fair" | "Poor"
  repairDifficulty: "Easy" | "Medium" | "Hard" | "Expert"
  specifications: {
    display: string
    processor: string
    ram: string
    storage: string
    camera: string
    battery: string
  }
  downloads: number
  firmwareAvailable: boolean
  toolsRequired: string[]
}

const mockBrands: Brand[] = [
  {
    id: "apple",
    name: "Apple",
    logo: "/placeholder.svg?height=100&width=100",
    country: "United States",
    founded: 1976,
    marketShare: 23.4,
    globalRank: 1,
    description: "Premium smartphone manufacturer known for iOS ecosystem and build quality",
    specialties: ["Premium Design", "iOS Ecosystem", "Security", "Performance"],
    popularModels: [
      {
        id: "iphone-14",
        name: "iPhone 14",
        year: 2022,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 8.2,
        repairFrequency: "High",
        commonIssues: ["Screen damage", "Battery degradation", "Camera issues", "Water damage"],
        averageRepairCost: 180,
        partsAvailability: "Good",
        repairDifficulty: "Hard",
        specifications: {
          display: '6.1" Super Retina XDR',
          processor: "A15 Bionic",
          ram: "6GB",
          storage: "128GB-1TB",
          camera: "12MP Dual",
          battery: "3279mAh",
        },
        downloads: 45230,
        firmwareAvailable: true,
        toolsRequired: ["Pentalobe screwdriver", "Suction cup", "Spudger", "Heat gun"],
      },
      {
        id: "iphone-13",
        name: "iPhone 13",
        year: 2021,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 12.1,
        repairFrequency: "Very High",
        commonIssues: ["Screen replacement", "Battery issues", "Charging port", "Speaker problems"],
        averageRepairCost: 165,
        partsAvailability: "Excellent",
        repairDifficulty: "Hard",
        specifications: {
          display: '6.1" Super Retina XDR',
          processor: "A15 Bionic",
          ram: "4GB",
          storage: "128GB-512GB",
          camera: "12MP Dual",
          battery: "3240mAh",
        },
        downloads: 67890,
        firmwareAvailable: true,
        toolsRequired: ["Pentalobe screwdriver", "Suction cup", "Spudger", "Heat gun"],
      },
    ],
    repairDifficulty: "Hard",
    partsAvailability: "Good",
    averageRepairCost: 175,
    totalModels: 45,
    activeYears: "2007-Present",
    website: "apple.com",
    supportRating: 4.2,
    innovationScore: 9.5,
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "/placeholder.svg?height=100&width=100",
    country: "South Korea",
    founded: 1969,
    marketShare: 21.7,
    globalRank: 2,
    description: "Leading Android manufacturer with diverse product portfolio and cutting-edge displays",
    specialties: ["AMOLED Displays", "Android Innovation", "5G Technology", "Foldable Phones"],
    popularModels: [
      {
        id: "galaxy-s23",
        name: "Galaxy S23",
        year: 2023,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 6.8,
        repairFrequency: "High",
        commonIssues: ["Screen burn-in", "Battery swelling", "Camera lens crack", "Charging issues"],
        averageRepairCost: 155,
        partsAvailability: "Excellent",
        repairDifficulty: "Medium",
        specifications: {
          display: '6.1" Dynamic AMOLED 2X',
          processor: "Snapdragon 8 Gen 2",
          ram: "8GB",
          storage: "128GB-256GB",
          camera: "50MP Triple",
          battery: "3900mAh",
        },
        downloads: 38450,
        firmwareAvailable: true,
        toolsRequired: ["Phillips screwdriver", "Plastic prying tools", "Heat pad", "Suction cup"],
      },
      {
        id: "galaxy-s22",
        name: "Galaxy S22",
        year: 2022,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 9.3,
        repairFrequency: "Very High",
        commonIssues: ["Display replacement", "Back glass", "Battery replacement", "Water damage"],
        averageRepairCost: 140,
        partsAvailability: "Excellent",
        repairDifficulty: "Medium",
        specifications: {
          display: '6.1" Dynamic AMOLED 2X',
          processor: "Snapdragon 8 Gen 1",
          ram: "8GB",
          storage: "128GB-256GB",
          camera: "50MP Triple",
          battery: "3700mAh",
        },
        downloads: 52340,
        firmwareAvailable: true,
        toolsRequired: ["Phillips screwdriver", "Plastic prying tools", "Heat pad", "Suction cup"],
      },
    ],
    repairDifficulty: "Medium",
    partsAvailability: "Excellent",
    averageRepairCost: 145,
    totalModels: 78,
    activeYears: "2009-Present",
    website: "samsung.com",
    supportRating: 4.0,
    innovationScore: 9.2,
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    logo: "/placeholder.svg?height=100&width=100",
    country: "China",
    founded: 2010,
    marketShare: 12.8,
    globalRank: 3,
    description: "Value-focused brand offering flagship features at competitive prices",
    specialties: ["Value for Money", "Fast Charging", "MIUI Software", "Global Expansion"],
    popularModels: [
      {
        id: "mi-13",
        name: "Mi 13",
        year: 2023,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 3.2,
        repairFrequency: "Medium",
        commonIssues: ["Software issues", "Charging port", "Camera problems", "Screen damage"],
        averageRepairCost: 95,
        partsAvailability: "Good",
        repairDifficulty: "Easy",
        specifications: {
          display: '6.36" AMOLED',
          processor: "Snapdragon 8 Gen 2",
          ram: "8GB-12GB",
          storage: "128GB-256GB",
          camera: "50MP Triple",
          battery: "4500mAh",
        },
        downloads: 28750,
        firmwareAvailable: true,
        toolsRequired: ["Phillips screwdriver", "Plastic tools", "Heat gun"],
      },
    ],
    repairDifficulty: "Easy",
    partsAvailability: "Good",
    averageRepairCost: 85,
    totalModels: 156,
    activeYears: "2011-Present",
    website: "mi.com",
    supportRating: 3.8,
    innovationScore: 8.7,
  },
  {
    id: "oppo",
    name: "OPPO",
    logo: "/placeholder.svg?height=100&width=100",
    country: "China",
    founded: 2004,
    marketShare: 8.9,
    globalRank: 4,
    description: "Camera-focused brand with emphasis on design and photography features",
    specialties: ["Camera Technology", "Fast Charging", "Design", "ColorOS"],
    popularModels: [
      {
        id: "find-x5",
        name: "Find X5",
        year: 2022,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 2.1,
        repairFrequency: "Medium",
        commonIssues: ["Camera module", "Battery issues", "Screen problems", "Charging"],
        averageRepairCost: 110,
        partsAvailability: "Fair",
        repairDifficulty: "Medium",
        specifications: {
          display: '6.55" AMOLED',
          processor: "Snapdragon 888",
          ram: "8GB-12GB",
          storage: "256GB",
          camera: "50MP Triple",
          battery: "4800mAh",
        },
        downloads: 15420,
        firmwareAvailable: true,
        toolsRequired: ["Phillips screwdriver", "Plastic tools", "Heat pad"],
      },
    ],
    repairDifficulty: "Medium",
    partsAvailability: "Fair",
    averageRepairCost: 105,
    totalModels: 89,
    activeYears: "2008-Present",
    website: "oppo.com",
    supportRating: 3.6,
    innovationScore: 8.3,
  },
  {
    id: "vivo",
    name: "Vivo",
    logo: "/placeholder.svg?height=100&width=100",
    country: "China",
    founded: 2009,
    marketShare: 8.1,
    globalRank: 5,
    description: "Selfie-focused brand with strong presence in emerging markets",
    specialties: ["Selfie Cameras", "Music & Audio", "Design", "Funtouch OS"],
    popularModels: [
      {
        id: "x80-pro",
        name: "X80 Pro",
        year: 2022,
        image: "/placeholder.svg?height=200&width=150",
        marketShare: 1.8,
        repairFrequency: "Low",
        commonIssues: ["Camera issues", "Software bugs", "Battery", "Display"],
        averageRepairCost: 125,
        partsAvailability: "Fair",
        repairDifficulty: "Medium",
        specifications: {
          display: '6.78" AMOLED',
          processor: "Snapdragon 8 Gen 1",
          ram: "8GB-12GB",
          storage: "256GB-512GB",
          camera: "50MP Quad",
          battery: "4700mAh",
        },
        downloads: 12890,
        firmwareAvailable: true,
        toolsRequired: ["Phillips screwdriver", "Plastic tools", "Heat gun"],
      },
    ],
    repairDifficulty: "Medium",
    partsAvailability: "Fair",
    averageRepairCost: 115,
    totalModels: 67,
    activeYears: "2011-Present",
    website: "vivo.com",
    supportRating: 3.5,
    innovationScore: 8.0,
  },
]

export function BrandShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("marketShare")
  const [activeTab, setActiveTab] = useState("overview")

  const countries = ["all", ...Array.from(new Set(mockBrands.map((brand) => brand.country)))]

  const filteredBrands = mockBrands
    .filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = selectedCountry === "all" || brand.country === selectedCountry
      const matchesDifficulty =
        selectedDifficulty === "all" || brand.repairDifficulty.toLowerCase() === selectedDifficulty

      return matchesSearch && matchesCountry && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "marketShare":
          return b.marketShare - a.marketShare
        case "name":
          return a.name.localeCompare(b.name)
        case "founded":
          return b.founded - a.founded
        case "repairCost":
          return a.averageRepairCost - b.averageRepairCost
        default:
          return 0
      }
    })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      case "expert":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Excellent":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Good":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "Fair":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Poor":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Globe className="h-16 w-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">Mobile Brands Hub</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Comprehensive database of mobile device manufacturers with repair information and device compatibility
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-3">
                <BarChart3 className="mr-2 h-5 w-5" />
                Market Analysis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3 bg-transparent"
              >
                <Award className="mr-2 h-5 w-5" />
                Top Brands
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search brands, models, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <div className="flex gap-4">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.slice(1).map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Repair Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketShare">Market Share</SelectItem>
                    <SelectItem value="name">Brand Name</SelectItem>
                    <SelectItem value="founded">Founded Year</SelectItem>
                    <SelectItem value="repairCost">Repair Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Card
              key={brand.id}
              className="border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-foreground">{brand.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {brand.country} • {brand.founded}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">#{brand.globalRank}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{brand.marketShare}%</p>
                    <p className="text-xs text-muted-foreground">Market Share</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">${brand.averageRepairCost}</p>
                    <p className="text-xs text-muted-foreground">Avg Repair Cost</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{brand.description}</p>

                {/* Specialties */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {brand.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Repair Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Repair Difficulty</p>
                    <Badge className={getDifficultyColor(brand.repairDifficulty)}>{brand.repairDifficulty}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Parts Availability</p>
                    <Badge className={getAvailabilityColor(brand.partsAvailability)}>{brand.partsAvailability}</Badge>
                  </div>
                </div>

                {/* Popular Models Preview */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Popular Models:</p>
                  <div className="space-y-2">
                    {brand.popularModels.slice(0, 2).map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Image
                            src={model.image || "/placeholder.svg"}
                            alt={model.name}
                            width={30}
                            height={40}
                            className="rounded mr-2"
                          />
                          <div>
                            <p className="text-sm font-medium">{model.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {model.year} • {model.marketShare}% share
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">${model.averageRepairCost}</p>
                          <p className="text-xs text-muted-foreground">{model.repairFrequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-bold text-foreground">{brand.totalModels}</p>
                    <p className="text-xs text-muted-foreground">Models</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{brand.supportRating}</p>
                    <p className="text-xs text-muted-foreground">Support</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{brand.innovationScore}</p>
                    <p className="text-xs text-muted-foreground">Innovation</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Download className="h-4 w-4 mr-1" />
                    Download Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
