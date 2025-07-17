import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConditionalAds } from "@/components/ads/conditional-ads"
import { ResponsiveAd } from "@/components/ads/responsive-ad"
import Link from "next/link"
import {
  Download,
  Shield,
  Zap,
  Users,
  FileText,
  Smartphone,
  Wrench,
  Usb,
  CheckCircle,
  Award,
  Star,
  Clock,
  Globe,
  ArrowRight,
  Cpu,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const freeTools = [
    {
      name: "SP Flash Tool",
      description: "Official MediaTek flashing tool for MTK devices with advanced features",
      version: "v6.2032.00",
      size: "45 MB",
      downloads: "2.5M+",
      rating: 4.8,
      category: "Flashing Tool",
      compatibility: "Windows, Linux",
      icon: Wrench,
      downloadUrl: "/download/sp-flash-tool",
      features: ["MTK Devices", "Scatter Loading", "Format & Download", "Readback"],
      isNew: false,
      isPopular: true,
    },
    {
      name: "Odin Tool",
      description: "Samsung's official firmware flashing tool with download mode support",
      version: "v3.14.4",
      size: "2.1 MB",
      downloads: "5.2M+",
      rating: 4.9,
      category: "Samsung Tool",
      compatibility: "Windows",
      icon: Smartphone,
      downloadUrl: "/download/odin-tool",
      features: ["Samsung Devices", "Firmware Flash", "PIT Files", "Download Mode"],
      isNew: false,
      isPopular: true,
    },
    {
      name: "ADB & Fastboot",
      description: "Android Debug Bridge and Fastboot tools for advanced device management",
      version: "v34.0.4",
      size: "8.5 MB",
      downloads: "10M+",
      rating: 4.7,
      category: "Debug Tool",
      compatibility: "Windows, Mac, Linux",
      icon: Cpu,
      downloadUrl: "/download/adb-fastboot",
      features: ["Device Debug", "Bootloader", "Recovery", "System Access"],
      isNew: true,
      isPopular: true,
    },
    {
      name: "Universal USB Drivers",
      description: "All-in-one USB drivers package for Android devices with auto-install",
      version: "v2023.12",
      size: "125 MB",
      downloads: "8.7M+",
      rating: 4.6,
      category: "Drivers",
      compatibility: "Windows",
      icon: Usb,
      downloadUrl: "/download/usb-drivers",
      features: ["All Brands", "Auto Install", "ADB Support", "Fastboot Support"],
      isNew: false,
      isPopular: false,
    },
    {
      name: "Mi Flash Tool",
      description: "Official Xiaomi flashing tool for MIUI firmware with EDL mode support",
      version: "v2023.3.30.0",
      size: "32 MB",
      downloads: "3.8M+",
      rating: 4.5,
      category: "Xiaomi Tool",
      compatibility: "Windows",
      icon: Smartphone,
      downloadUrl: "/download/mi-flash-tool",
      features: ["Xiaomi Devices", "Fastboot Flash", "EDL Mode", "Lock/Unlock"],
      isNew: false,
      isPopular: false,
    },
    {
      name: "QPST Tool",
      description: "Qualcomm Product Support Tools for Snapdragon devices with partition manager",
      version: "v2.7.496",
      size: "156 MB",
      downloads: "1.9M+",
      rating: 4.4,
      category: "Qualcomm Tool",
      compatibility: "Windows",
      icon: Cpu,
      downloadUrl: "/download/qpst-tool",
      features: ["Qualcomm Devices", "EDL Mode", "Partition Manager", "Software Download"],
      isNew: true,
      isPopular: false,
    },
  ]

  const freeFiles = [
    {
      name: "Samsung Galaxy A54 5G",
      model: "SM-A546B",
      firmware: "A546BXXU4CWL2",
      android: "Android 14",
      region: "Global",
      size: "6.2 GB",
      downloads: "45K+",
      uploadDate: "2024-01-15",
      icon: Smartphone,
      downloadUrl: "/download/samsung-a54-firmware",
      isLatest: true,
    },
    {
      name: "Xiaomi Redmi Note 12",
      model: "2201117TG",
      firmware: "MIUI 14.0.6.0",
      android: "Android 13",
      region: "Global",
      size: "4.8 GB",
      downloads: "38K+",
      uploadDate: "2024-01-12",
      icon: Smartphone,
      downloadUrl: "/download/redmi-note-12-firmware",
      isLatest: false,
    },
    {
      name: "Oppo A78 5G",
      model: "CPH2565",
      firmware: "CPH2565_11_A.15",
      android: "Android 13",
      region: "Global",
      size: "5.1 GB",
      downloads: "22K+",
      uploadDate: "2024-01-10",
      icon: Smartphone,
      downloadUrl: "/download/oppo-a78-firmware",
      isLatest: false,
    },
    {
      name: "Vivo Y27 5G",
      model: "V2250",
      firmware: "PD2250F_EX_A_13.0.0.1.W26",
      android: "Android 13",
      region: "Global",
      size: "4.9 GB",
      downloads: "19K+",
      uploadDate: "2024-01-08",
      icon: Smartphone,
      downloadUrl: "/download/vivo-y27-firmware",
      isLatest: true,
    },
  ]

  const deviceBrands = [
    { name: "Samsung", count: "2,500+", icon: "🔵", popularity: 95, trend: "+12%" },
    { name: "Xiaomi", count: "1,800+", icon: "🟠", popularity: 88, trend: "+8%" },
    { name: "Oppo", count: "1,200+", icon: "🟢", popularity: 75, trend: "+15%" },
    { name: "Vivo", count: "1,100+", icon: "🔵", popularity: 72, trend: "+10%" },
    { name: "Realme", count: "800+", icon: "🟡", popularity: 68, trend: "+20%" },
    { name: "OnePlus", count: "600+", icon: "🔴", popularity: 65, trend: "+5%" },
    { name: "Huawei", count: "900+", icon: "🔴", popularity: 60, trend: "-2%" },
    { name: "Honor", count: "500+", icon: "🔵", popularity: 55, trend: "+18%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 py-12 sm:py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-30"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 dark:opacity-30"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000 dark:opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium border-0">
                🚀 #1 Mobile Device Solution Hub
              </Badge>
              <Badge
                variant="outline"
                className="text-xs sm:text-sm border-green-500/50 text-green-600 dark:text-green-400"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Updates
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight">
              Free Firmware, Flash Files & Mobile Repair Tools
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
              Download free firmware files, flashing tools, and USB drivers for Samsung, Xiaomi, Oppo, Vivo, and 50+
              mobile device brands. Professional mobile repair made easy with our comprehensive toolkit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-8">
              <Link href="/free-files" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                >
                  <Download className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                  Browse Free Files
                </Button>
              </Link>
              <Link href="/tools" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-border hover:bg-muted/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-background/50 backdrop-blur-sm"
                >
                  <Wrench className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                  Free Tools
                </Button>
              </Link>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
              {[
                { label: "Free Files", value: "10K+", icon: FileText, color: "text-blue-600", trend: "+15%" },
                { label: "Downloads", value: "50M+", icon: Download, color: "text-green-600", trend: "+25%" },
                { label: "Tools", value: "100+", icon: Wrench, color: "text-purple-600", trend: "+8%" },
                { label: "Brands", value: "50+", icon: Smartphone, color: "text-orange-600", trend: "+12%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-200 group"
                >
                  <stat.icon
                    className={`h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-200`}
                  />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    {stat.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad after Hero */}
      <ConditionalAds>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <ResponsiveAd adSlot="1234567890" title="Recommended Mobile Tools" />
        </div>
      </ConditionalAds>

      {/* Enhanced Free Tools Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge variant="outline" className="text-sm">
                <Wrench className="h-4 w-4 mr-2" />
                Professional Tools
              </Badge>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm">
                100% Free
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              Free Mobile Repair Tools
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional flashing tools, drivers, and utilities for mobile device repair and development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {freeTools.map((tool, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                          <tool.icon className="h-5 sm:h-6 w-5 sm:w-6" />
                        </div>
                        {tool.isNew && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Badge variant="secondary" className="text-xs">
                          {tool.category}
                        </Badge>
                        {tool.isPopular && (
                          <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 sm:h-4 w-3 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-medium">{tool.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground mb-2">{tool.name}</CardTitle>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{tool.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-muted-foreground">Version:</span>
                      <div className="font-medium text-foreground">{tool.version}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <div className="font-medium text-foreground">{tool.size}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Downloads:</span>
                      <div className="font-medium text-green-600 dark:text-green-400">{tool.downloads}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Platform:</span>
                      <div className="font-medium text-foreground">{tool.compatibility}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-medium text-foreground mb-2">Features:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={tool.downloadUrl}>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      <Download className="mr-2 h-4 w-4" />
                      Free Download
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/tools">
              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 bg-background/50 backdrop-blur-sm border-border hover:bg-muted/50"
              >
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad between sections */}
      <ConditionalAds>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <ResponsiveAd adSlot="9876543210" title="Mobile Repair Services" />
        </div>
      </ConditionalAds>

      {/* Enhanced Latest Firmware Files */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge variant="outline" className="text-sm">
                <Smartphone className="h-4 w-4 mr-2" />
                Latest Firmware
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm">
                Updated Daily
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              Latest Free Firmware Files
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Download the latest stock firmware files for popular mobile devices with verified checksums
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {freeFiles.map((file, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <file.icon className="h-8 sm:h-10 w-8 sm:w-10 text-blue-600 dark:text-blue-400" />
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </Badge>
                      {file.isLatest && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                          Latest
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">{file.name}</h3>

                  <div className="space-y-1 sm:space-y-2 mb-4 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-medium text-foreground">{file.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firmware:</span>
                      <span className="font-medium text-xs text-foreground">{file.firmware}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Android:</span>
                      <span className="font-medium text-foreground">{file.android}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium text-foreground">{file.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{file.downloads}</span>
                    </div>
                  </div>

                  <Link href={file.downloadUrl}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                      <Download className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                      Download
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/firmware">
              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 bg-background/50 backdrop-blur-sm border-border hover:bg-muted/50"
              >
                Browse All Firmware
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Supported Brands */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge variant="outline" className="text-sm">
                <Globe className="h-4 w-4 mr-2" />
                Global Support
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-sm">
                50+ Brands
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              Supported Device Brands
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              We support firmware and tools for 50+ mobile device brands with regular updates
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {deviceBrands.map((brand, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{brand.icon}</div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-foreground">{brand.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{brand.count} files</p>
                  <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                      style={{ width: `${brand.popularity}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{brand.popularity}% popular</span>
                    <Badge variant="secondary" className="text-xs">
                      {brand.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge variant="outline" className="text-sm">
                <Award className="h-4 w-4 mr-2" />
                Why Choose Us
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-sm">
                Trusted Platform
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              Why Choose FilesHub?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional mobile device repair made simple with our comprehensive tools and files
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "100% Safe Downloads",
                description: "All files are virus-scanned, verified for safety, and tested by our team",
                color: "from-green-500 to-emerald-600",
                features: ["Virus Scanned", "Verified Sources", "Safe Downloads", "Regular Updates"],
              },
              {
                icon: Zap,
                title: "High-Speed Downloads",
                description: "Global CDN network ensures fast downloads worldwide with resume support",
                color: "from-blue-500 to-cyan-600",
                features: ["CDN Network", "Multiple Mirrors", "Resume Support", "No Speed Limits"],
              },
              {
                icon: Users,
                title: "Expert Community",
                description: "Get help from mobile repair professionals and active community support",
                color: "from-purple-500 to-pink-600",
                features: ["Expert Help", "Community Forums", "Tutorials", "24/7 Support"],
              },
              {
                icon: Clock,
                title: "Regular Updates",
                description: "Latest firmware files and tools added daily with version tracking",
                color: "from-orange-500 to-red-600",
                features: ["Daily Updates", "Version Control", "Change Logs", "Notifications"],
              },
              {
                icon: Globe,
                title: "Global Support",
                description: "Supporting devices from all regions worldwide with localized content",
                color: "from-indigo-500 to-purple-600",
                features: ["195+ Countries", "Multi-language", "Regional Support", "Local Mirrors"],
              },
              {
                icon: Award,
                title: "Trusted by Pros",
                description: "Used by 500K+ mobile repair professionals and service centers",
                color: "from-yellow-500 to-orange-600",
                features: ["500K+ Users", "Professional Grade", "Service Centers", "Enterprise Support"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg`}
                  >
                    <feature.icon className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <Badge className="bg-white/20 text-white border-white/30 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Join 500K+ Professionals
              </Badge>
              <Badge className="bg-green-500/20 text-green-100 border-green-400/30 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Active Community
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Start Your Mobile Repair Journey Today
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
              Join 500,000+ mobile repair professionals who trust FilesHub for their daily repair needs. Get access to
              premium tools, exclusive firmware, and expert support.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto mb-8">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                >
                  <Users className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                  Join Free
                </Button>
              </Link>
              <Link href="/free-files" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent backdrop-blur-sm"
                >
                  <Download className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                  Browse Files
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Instant access to tools
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Ad before footer */}
      <ConditionalAds>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <ResponsiveAd adSlot="5555666677" title="Mobile Repair Training" />
        </div>
      </ConditionalAds>

      <Footer />
    </div>
  )
}
