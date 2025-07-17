"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Cpu,
  Smartphone,
  Star,
  Download,
  Filter,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  ShoppingCart,
  AlertCircle,
  Zap,
  Volume2,
  Radio,
  Camera,
  Monitor,
  Gauge,
} from "lucide-react"
import Image from "next/image"

interface ICComponent {
  id: string
  partNumber: string
  name: string
  manufacturer: string
  category: string
  description: string
  image: string
  datasheet: string
  compatibleDevices: DeviceCompatibility[]
  specifications: {
    voltage: string
    current: string
    package: string
    temperature: string
    frequency?: string
  }
  commonIssues: string[]
  repairDifficulty: "Easy" | "Medium" | "Hard" | "Expert"
  price: number
  availability: "In Stock" | "Limited" | "Out of Stock"
  rating: number
  reviews: number
  searchCount: number
  lastUpdated: string
}

interface DeviceCompatibility {
  brand: string
  model: string
  year: number
  marketShare: number
  repairFrequency: "Very High" | "High" | "Medium" | "Low"
  commonFailures: string[]
  repairCost: number
}

const mockICComponents: ICComponent[] = [
  {
    id: "1",
    partNumber: "PMI8998",
    name: "Power Management IC",
    manufacturer: "Qualcomm",
    category: "Power IC",
    description: "Advanced power management integrated circuit for flagship mobile devices",
    image: "/placeholder.svg?height=200&width=200",
    datasheet: "/datasheets/pmi8998.pdf",
    compatibleDevices: [
      {
        brand: "Samsung",
        model: "Galaxy S9",
        year: 2018,
        marketShare: 15.2,
        repairFrequency: "High",
        commonFailures: ["No charging", "Boot loops", "Overheating"],
        repairCost: 120,
      },
      {
        brand: "Samsung",
        model: "Galaxy S9+",
        year: 2018,
        marketShare: 12.8,
        repairFrequency: "High",
        commonFailures: ["Battery drain", "Power button issues"],
        repairCost: 135,
      },
      {
        brand: "OnePlus",
        model: "OnePlus 6",
        year: 2018,
        marketShare: 3.4,
        repairFrequency: "Medium",
        commonFailures: ["Charging port issues", "Power management"],
        repairCost: 95,
      },
    ],
    specifications: {
      voltage: "3.3V - 4.4V",
      current: "Up to 3A",
      package: "WLCSP-196",
      temperature: "-40°C to +85°C",
    },
    commonIssues: ["No charging", "Boot loops", "Overheating", "Battery drain"],
    repairDifficulty: "Expert",
    price: 45.99,
    availability: "In Stock",
    rating: 4.8,
    reviews: 234,
    searchCount: 15420,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    partNumber: "WCD9341",
    name: "Audio Codec IC",
    manufacturer: "Qualcomm",
    category: "Audio IC",
    description: "High-performance audio codec with advanced noise cancellation",
    image: "/placeholder.svg?height=200&width=200",
    datasheet: "/datasheets/wcd9341.pdf",
    compatibleDevices: [
      {
        brand: "Apple",
        model: "iPhone X",
        year: 2017,
        marketShare: 18.5,
        repairFrequency: "Medium",
        commonFailures: ["No sound", "Microphone issues", "Speaker problems"],
        repairCost: 85,
      },
      {
        brand: "Apple",
        model: "iPhone 8",
        year: 2017,
        marketShare: 14.2,
        repairFrequency: "Medium",
        commonFailures: ["Distorted audio", "Headphone jack issues"],
        repairCost: 75,
      },
      {
        brand: "Google",
        model: "Pixel 2",
        year: 2017,
        marketShare: 2.1,
        repairFrequency: "Low",
        commonFailures: ["Audio processing", "Bluetooth audio"],
        repairCost: 65,
      },
    ],
    specifications: {
      voltage: "1.8V - 3.3V",
      current: "Up to 150mA",
      package: "WLCSP-81",
      temperature: "-30°C to +85°C",
      frequency: "8kHz - 192kHz",
    },
    commonIssues: ["No sound", "Distorted audio", "Microphone issues", "Speaker problems"],
    repairDifficulty: "Hard",
    price: 28.99,
    availability: "In Stock",
    rating: 4.6,
    reviews: 156,
    searchCount: 8934,
    lastUpdated: "2024-01-12",
  },
  {
    id: "3",
    partNumber: "RF360-7",
    name: "RF Transceiver IC",
    manufacturer: "Broadcom",
    category: "RF IC",
    description: "Multi-band RF transceiver for 4G/5G cellular communication",
    image: "/placeholder.svg?height=200&width=200",
    datasheet: "/datasheets/rf360-7.pdf",
    compatibleDevices: [
      {
        brand: "Samsung",
        model: "Galaxy S20",
        year: 2020,
        marketShare: 16.8,
        repairFrequency: "Very High",
        commonFailures: ["No signal", "Poor reception", "Network drops"],
        repairCost: 180,
      },
      {
        brand: "Samsung",
        model: "Galaxy S21",
        year: 2021,
        marketShare: 19.3,
        repairFrequency: "High",
        commonFailures: ["5G connectivity", "Antenna issues"],
        repairCost: 195,
      },
      {
        brand: "Xiaomi",
        model: "Mi 11",
        year: 2021,
        marketShare: 8.7,
        repairFrequency: "Medium",
        commonFailures: ["Signal strength", "Carrier switching"],
        repairCost: 145,
      },
    ],
    specifications: {
      voltage: "2.7V - 3.6V",
      current: "Up to 2.5A",
      package: "FCBGA-324",
      temperature: "-40°C to +85°C",
      frequency: "600MHz - 6GHz",
    },
    commonIssues: ["No signal", "Poor reception", "Network drops", "Antenna issues"],
    repairDifficulty: "Expert",
    price: 67.99,
    availability: "Limited",
    rating: 4.9,
    reviews: 89,
    searchCount: 12567,
    lastUpdated: "2024-01-10",
  },
  {
    id: "4",
    partNumber: "ISP2400",
    name: "Camera ISP IC",
    manufacturer: "Sony",
    category: "Camera IC",
    description: "Advanced image signal processor with AI enhancement",
    image: "/placeholder.svg?height=200&width=200",
    datasheet: "/datasheets/isp2400.pdf",
    compatibleDevices: [
      {
        brand: "Apple",
        model: "iPhone 13",
        year: 2021,
        marketShare: 22.1,
        repairFrequency: "Medium",
        commonFailures: ["Camera not working", "Blurry images", "Flash issues"],
        repairCost: 165,
      },
      {
        brand: "Apple",
        model: "iPhone 14",
        year: 2022,
        marketShare: 25.4,
        repairFrequency: "Low",
        commonFailures: ["Focus problems", "Night mode issues"],
        repairCost: 185,
      },
      {
        brand: "Google",
        model: "Pixel 7",
        year: 2022,
        marketShare: 4.2,
        repairFrequency: "Low",
        commonFailures: ["Image processing", "HDR issues"],
        repairCost: 155,
      },
    ],
    specifications: {
      voltage: "1.2V - 3.3V",
      current: "Up to 800mA",
      package: "FCBGA-256",
      temperature: "-20°C to +70°C",
      frequency: "Up to 1.2GHz",
    },
    commonIssues: ["Camera not working", "Blurry images", "Flash issues", "Focus problems"],
    repairDifficulty: "Hard",
    price: 52.99,
    availability: "In Stock",
    rating: 4.7,
    reviews: 198,
    searchCount: 9876,
    lastUpdated: "2024-01-08",
  },
  {
    id: "5",
    partNumber: "DDIC-5000",
    name: "Display Driver IC",
    manufacturer: "Samsung",
    category: "Display IC",
    description: "High-resolution display driver with touch controller integration",
    image: "/placeholder.svg?height=200&width=200",
    datasheet: "/datasheets/ddic-5000.pdf",
    compatibleDevices: [
      {
        brand: "Samsung",
        model: "Galaxy S22",
        year: 2022,
        marketShare: 17.9,
        repairFrequency: "High",
        commonFailures: ["Black screen", "Touch not working", "Display lines"],
        repairCost: 110,
      },
      {
        brand: "OnePlus",
        model: "OnePlus 9",
        year: 2021,
        marketShare: 3.8,
        repairFrequency: "Medium",
        commonFailures: ["Backlight issues", "Color distortion"],
        repairCost: 95,
      },
      {
        brand: "Realme",
        model: "GT Master",
        year: 2021,
        marketShare: 2.1,
        repairFrequency: "Low",
        commonFailures: ["Touch sensitivity", "Display flickering"],
        repairCost: 85,
      },
    ],
    specifications: {
      voltage: "1.8V - 3.3V",
      current: "Up to 500mA",
      package: "COF-128",
      temperature: "-20°C to +70°C",
      frequency: "Up to 120Hz",
    },
    commonIssues: ["Black screen", "Touch not working", "Display lines", "Backlight issues"],
    repairDifficulty: "Medium",
    price: 34.99,
    availability: "In Stock",
    rating: 4.5,
    reviews: 267,
    searchCount: 11234,
    lastUpdated: "2024-01-14",
  },
]

const categories = [
  { id: "all", name: "All Categories", icon: Cpu, color: "text-gray-500" },
  { id: "power", name: "Power IC", icon: Zap, color: "text-red-500" },
  { id: "audio", name: "Audio IC", icon: Volume2, color: "text-blue-500" },
  { id: "rf", name: "RF IC", icon: Radio, color: "text-green-500" },
  { id: "camera", name: "Camera IC", icon: Camera, color: "text-purple-500" },
  { id: "display", name: "Display IC", icon: Monitor, color: "text-orange-500" },
  { id: "sensor", name: "Sensor IC", icon: Gauge, color: "text-teal-500" },
]

const manufacturers = ["All", "Qualcomm", "Broadcom", "Sony", "Samsung", "Apple", "MediaTek", "Intel"]

export function ICComponentSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedManufacturer, setSelectedManufacturer] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")

  const filteredComponents = mockICComponents
    .filter((component) => {
      const matchesSearch =
        component.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.compatibleDevices.some(
          (device) =>
            device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.model.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      const matchesCategory = selectedCategory === "all" || component.category.toLowerCase().includes(selectedCategory)

      const matchesManufacturer = selectedManufacturer === "All" || component.manufacturer === selectedManufacturer

      const matchesDifficulty =
        selectedDifficulty === "all" || component.repairDifficulty.toLowerCase() === selectedDifficulty

      return matchesSearch && matchesCategory && matchesManufacturer && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.searchCount - a.searchCount
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
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
      case "In Stock":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Limited":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Out of Stock":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Search className="h-16 w-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">IC Component Search</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find compatible ICs, components, and repair information for mobile devices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Database
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Popular Components
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Main Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                  placeholder="Search by IC part number, device model, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
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
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Recently Updated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">Found {filteredComponents.length} components matching your search</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <Card
              key={component.id}
              className="border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">{component.partNumber}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{component.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {component.manufacturer}
                    </Badge>
                  </div>
                  <Image
                    src={component.image || "/placeholder.svg"}
                    alt={component.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge className={getDifficultyColor(component.repairDifficulty)}>{component.repairDifficulty}</Badge>
                  <Badge className={getAvailabilityColor(component.availability)}>{component.availability}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{component.description}</p>

                {/* Specifications */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Specifications:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voltage:</span>
                      <span className="font-medium">{component.specifications.voltage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-medium">{component.specifications.package}</span>
                    </div>
                  </div>
                </div>

                {/* Compatible Devices */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Compatible Devices:</p>
                  <div className="space-y-2">
                    {component.compatibleDevices.slice(0, 2).map((device, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">
                              {device.brand} {device.model}
                            </p>
                            <p className="text-xs text-muted-foreground">Repair frequency: {device.repairFrequency}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">${device.repairCost}</p>
                          <p className="text-xs text-muted-foreground">{device.marketShare}% share</p>
                        </div>
                      </div>
                    ))}
                    {component.compatibleDevices.length > 2 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{component.compatibleDevices.length - 2} more devices
                      </p>
                    )}
                  </div>
                </div>

                {/* Common Issues */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Common Issues:</p>
                  <div className="flex flex-wrap gap-1">
                    {component.commonIssues.slice(0, 3).map((issue, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {issue}
                      </Badge>
                    ))}
                    {component.commonIssues.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{component.commonIssues.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {component.rating} ({component.reviews})
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {component.searchCount.toLocaleString()} searches
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-green-600">${component.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Datasheet
                    </Button>
                    <Button
                      size="sm"
                      disabled={component.availability === "Out of Stock"}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {component.availability === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-16 w-16 mx-auto text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">No components found</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Try adjusting your search criteria or browse our popular components
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Browse All Components
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
