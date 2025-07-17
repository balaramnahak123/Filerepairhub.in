"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cpu,
  Zap,
  Volume2,
  Radio,
  Camera,
  Monitor,
  Gauge,
  Search,
  Star,
  Clock,
  Users,
  Play,
  ShoppingCart,
  Award,
  BookOpen,
  Wrench,
  Eye,
  Heart,
  Share2,
} from "lucide-react"
import Image from "next/image"

interface PCBComponent {
  id: string
  name: string
  category: string
  description: string
  image: string
  commonIssues: string[]
  repairDifficulty: "Easy" | "Medium" | "Hard" | "Expert"
  compatibleDevices: string[]
  price: number
  inStock: boolean
  rating: number
  reviews: number
  datasheet?: string
}

interface RepairGuide {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  duration: string
  views: number
  likes: number
  category: string
  thumbnail: string
  videoUrl?: string
  steps: number
  toolsRequired: string[]
  rating: number
}

interface Tool {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  features: string[]
}

const pcbComponents: PCBComponent[] = [
  {
    id: "1",
    name: "Power Management IC (PMIC)",
    category: "Power IC",
    description: "Main power management integrated circuit for mobile devices",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["No charging", "Battery drain", "Boot loops", "Overheating"],
    repairDifficulty: "Expert",
    compatibleDevices: ["iPhone 12", "iPhone 13", "Samsung S21", "Samsung S22"],
    price: 45.99,
    inStock: true,
    rating: 4.8,
    reviews: 234,
    datasheet: "/datasheets/pmic-datasheet.pdf",
  },
  {
    id: "2",
    name: "Audio Codec IC",
    category: "Audio IC",
    description: "Digital-to-analog converter for audio processing",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["No sound", "Distorted audio", "Microphone issues", "Speaker problems"],
    repairDifficulty: "Hard",
    compatibleDevices: ["iPhone 11", "iPhone 12", "OnePlus 9", "Pixel 6"],
    price: 28.99,
    inStock: true,
    rating: 4.6,
    reviews: 156,
  },
  {
    id: "3",
    name: "RF Transceiver IC",
    category: "RF IC",
    description: "Radio frequency transceiver for cellular communication",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["No signal", "Poor reception", "Network drops", "Antenna issues"],
    repairDifficulty: "Expert",
    compatibleDevices: ["Samsung S20", "Samsung S21", "Huawei P40", "Xiaomi Mi 11"],
    price: 67.99,
    inStock: false,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "4",
    name: "Camera ISP IC",
    category: "Camera IC",
    description: "Image signal processor for camera functionality",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["Camera not working", "Blurry images", "Flash issues", "Focus problems"],
    repairDifficulty: "Hard",
    compatibleDevices: ["iPhone 13", "iPhone 14", "Samsung S22", "Google Pixel 7"],
    price: 52.99,
    inStock: true,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: "5",
    name: "Display Driver IC",
    category: "Display IC",
    description: "Controls display panel and touch functionality",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["Black screen", "Touch not working", "Display lines", "Backlight issues"],
    repairDifficulty: "Medium",
    compatibleDevices: ["iPhone 12", "Samsung S21", "OnePlus 8", "Realme GT"],
    price: 34.99,
    inStock: true,
    rating: 4.5,
    reviews: 267,
  },
  {
    id: "6",
    name: "Accelerometer/Gyroscope IC",
    category: "Sensor IC",
    description: "Motion sensing integrated circuit",
    image: "/placeholder.svg?height=200&width=200",
    commonIssues: ["Screen rotation issues", "Gaming problems", "Compass errors", "Fitness tracking"],
    repairDifficulty: "Medium",
    compatibleDevices: ["iPhone 11", "Samsung S20", "Xiaomi Mi 10", "Oppo Find X3"],
    price: 19.99,
    inStock: true,
    rating: 4.4,
    reviews: 145,
  },
]

const repairGuides: RepairGuide[] = [
  {
    id: "1",
    title: "iPhone 13 PMIC Replacement Complete Guide",
    description: "Step-by-step guide to replace the power management IC in iPhone 13",
    difficulty: "Expert",
    duration: "45 min",
    views: 15420,
    likes: 892,
    category: "Power IC",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://example.com/video1",
    steps: 12,
    toolsRequired: ["Hot air station", "Microscope", "Flux", "Tweezers"],
    rating: 4.9,
  },
  {
    id: "2",
    title: "Samsung Galaxy Audio IC Repair",
    description: "Fix common audio issues by replacing the audio codec IC",
    difficulty: "Advanced",
    duration: "30 min",
    views: 8934,
    likes: 567,
    category: "Audio IC",
    thumbnail: "/placeholder.svg?height=200&width=300",
    steps: 8,
    toolsRequired: ["Soldering iron", "Flux", "Desoldering braid"],
    rating: 4.7,
  },
  {
    id: "3",
    title: "Display Driver IC Troubleshooting",
    description: "Diagnose and repair display-related issues",
    difficulty: "Intermediate",
    duration: "25 min",
    views: 12567,
    likes: 734,
    category: "Display IC",
    thumbnail: "/placeholder.svg?height=200&width=300",
    steps: 6,
    toolsRequired: ["Multimeter", "Oscilloscope", "Probe tips"],
    rating: 4.6,
  },
]

const professionalTools: Tool[] = [
  {
    id: "1",
    name: "Professional Hot Air Rework Station",
    description: "Precision temperature control for IC replacement",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Rework Equipment",
    rating: 4.9,
    reviews: 456,
    inStock: true,
    features: ["Digital temperature control", "Multiple nozzles", "ESD safe", "Memory presets"],
  },
  {
    id: "2",
    name: "Stereo Microscope 45X Zoom",
    description: "High-precision microscope for PCB inspection",
    price: 189.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Inspection Tools",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: ["45X magnification", "LED ring light", "Adjustable stand", "HD camera ready"],
  },
  {
    id: "3",
    name: "BGA Reballing Kit Complete",
    description: "Universal BGA stencil set with solder balls",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "BGA Tools",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: ["90+ stencils", "Lead-free solder balls", "Flux included", "Storage case"],
  },
]

const categories = [
  { id: "power", name: "Power IC", icon: Zap, color: "text-red-500" },
  { id: "audio", name: "Audio IC", icon: Volume2, color: "text-blue-500" },
  { id: "rf", name: "RF IC", icon: Radio, color: "text-green-500" },
  { id: "camera", name: "Camera IC", icon: Camera, color: "text-purple-500" },
  { id: "display", name: "Display IC", icon: Monitor, color: "text-orange-500" },
  { id: "sensor", name: "Sensor IC", icon: Gauge, color: "text-teal-500" },
]

export function PCBRepairSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [activeTab, setActiveTab] = useState("components")

  const filteredComponents = pcbComponents.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || component.category.toLowerCase().includes(selectedCategory)
    const matchesDifficulty =
      selectedDifficulty === "all" || component.repairDifficulty.toLowerCase() === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const filteredGuides = repairGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || guide.category.toLowerCase().includes(selectedCategory)
    const matchesDifficulty = selectedDifficulty === "all" || guide.difficulty.toLowerCase() === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "medium":
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
      case "advanced":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
      case "expert":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Cpu className="h-16 w-16 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">PCB Repair Hub</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional PCB component repair solutions, guides, and tools for mobile device technicians
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Repair Guides
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Professional Tools
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
                  placeholder="Search components, guides, or tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy/Beginner</SelectItem>
                    <SelectItem value="medium">Medium/Intermediate</SelectItem>
                    <SelectItem value="hard">Hard/Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:scale-105 border-0 shadow-lg ${
                selectedCategory === category.id
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 hover:shadow-xl"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center">
                <category.icon
                  className={`h-8 w-8 mx-auto mb-3 ${selectedCategory === category.id ? "text-white" : category.color}`}
                />
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-white dark:bg-gray-800 shadow-lg">
            <TabsTrigger value="components" className="text-lg">
              <Cpu className="mr-2 h-5 w-5" />
              Components
            </TabsTrigger>
            <TabsTrigger value="guides" className="text-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Repair Guides
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-lg">
              <Wrench className="mr-2 h-5 w-5" />
              Professional Tools
            </TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <Card
                  key={component.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white dark:bg-gray-800"
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <Image
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getDifficultyColor(component.repairDifficulty)}`}>
                        {component.repairDifficulty}
                      </Badge>
                      {!component.inStock && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out of Stock</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">{component.name}</h3>
                      <p className="text-muted-foreground text-sm">{component.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {component.category}
                      </Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm ml-1">
                          {component.rating} ({component.reviews})
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Common Issues:</p>
                      <div className="flex flex-wrap gap-1">
                        {component.commonIssues.slice(0, 2).map((issue, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                        {component.commonIssues.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{component.commonIssues.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Compatible Devices:</p>
                      <p className="text-xs text-muted-foreground">
                        {component.compatibleDevices.slice(0, 2).join(", ")}
                        {component.compatibleDevices.length > 2 && ` +${component.compatibleDevices.length - 2} more`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-green-600">${component.price}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          disabled={!component.inStock}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {component.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Repair Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white dark:bg-gray-800"
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <Image
                        src={guide.thumbnail || "/placeholder.svg"}
                        alt={guide.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                          <Play className="h-6 w-6 mr-2" />
                          Watch Guide
                        </Button>
                      </div>
                      <Badge className={`absolute top-2 right-2 ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">{guide.title}</h3>
                      <p className="text-muted-foreground text-sm">{guide.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {guide.duration}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {guide.views.toLocaleString()} views
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {guide.category}
                      </Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm ml-1">{guide.rating}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Tools Required:</p>
                      <div className="flex flex-wrap gap-1">
                        {guide.toolsRequired.slice(0, 2).map((tool, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {guide.toolsRequired.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{guide.toolsRequired.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {guide.likes}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {guide.steps} steps
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                          <Play className="h-4 w-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Professional Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-white dark:bg-gray-800"
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <Image
                        src={tool.image || "/placeholder.svg"}
                        alt={tool.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {tool.originalPrice && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          {Math.round((1 - tool.price / tool.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm ml-1">
                          {tool.rating} ({tool.reviews})
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Key Features:</p>
                      <div className="space-y-1">
                        {tool.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <Award className="h-3 w-3 mr-2 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">${tool.price}</span>
                        {tool.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">${tool.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        disabled={!tool.inStock}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {tool.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
