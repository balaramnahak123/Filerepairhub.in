import Link from "next/link"
import {
  Files,
  Heart,
  Github,
  Twitter,
  Mail,
  Globe,
  Download,
  Package,
  FileText,
  Shield,
  CreditCard,
  Users,
  Key,
  TrendingUp,
  Smartphone,
  Usb,
  Wrench,
  MapPin,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 dark:opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="text-center mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Stay Updated with Latest Tools & Firmware</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get notified about new firmware releases, tools updates, and exclusive mobile repair guides directly in your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="flex-1 bg-background/80 border-border/50" />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Join 50,000+ mobile repair professionals. Unsubscribe anytime.
          </p>
        </div>

        {/* Main Description */}
        <div className="text-center mb-12">
          <Link href="/" className="flex items-center justify-center space-x-3 group mb-6">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <Files className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                FilesHub
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  Mobile Repair Hub
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Trusted by 500K+
                </Badge>
              </div>
            </div>
          </Link>
          <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
            Welcome to Fileshub, your one-stop destination for firmware, flash files and tools for a wide range of
            mobile devices. Our website is designed to provide you with a hassle-free experience and make it easy for
            you to find and download the firmware, tools or flash file you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-foreground flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/", icon: Globe },
                { name: "Packages & Pricing", href: "/pricing", icon: Package },
                { name: "Recent Files", href: "/files", icon: FileText },
                { name: "Blogs", href: "/blogs", icon: FileText },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200 text-blue-600" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Files & Downloads */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-foreground flex items-center">
              <Download className="h-5 w-5 mr-2 text-green-600" />
              Files & Downloads
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Free Files", href: "/free-files", icon: Download },
                { name: "Paid Files", href: "/paid-files", icon: CreditCard },
                { name: "Firmware (Various)", href: "/firmware", icon: Smartphone },
                { name: "Flashing Tools", href: "/tools", icon: Wrench },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200 text-green-600" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Legal */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-foreground flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Account & Legal
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Login", href: "/login", icon: Key },
                { name: "Sign Up", href: "/signup", icon: Users },
                { name: "Forgot Password", href: "/forgot-password", icon: Shield },
                { name: "Terms and Conditions", href: "/terms", icon: FileText },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200 text-purple-600" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-foreground flex items-center">
              <Shield className="h-5 w-5 mr-2 text-orange-600" />
              Policies
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy", icon: Shield },
                { name: "Refund Policy", href: "/refund", icon: CreditCard },
                { name: "Return Policy", href: "/return", icon: Package },
                { name: "Cancellation Policy", href: "/cancellation", icon: FileText },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200 text-orange-600" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-foreground flex items-center">
              <Mail className="h-5 w-5 mr-2 text-red-600" />
              Support
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3 text-red-600" />
                <span className="text-sm">support@fileshub.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3 text-red-600" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 text-red-600" />
                <span className="text-sm">24/7 Global Support</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium mb-3 text-foreground">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200 group">
                  <Github className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200 group">
                  <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200 group">
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Solutions Section */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <h3 className="font-bold mb-8 text-xl text-foreground text-center flex items-center justify-center">
            <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
            Trending Solutions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                name: "Flashing Tools",
                href: "/flashing-tools",
                icon: Wrench,
                color: "from-red-500 to-orange-500",
                count: "50+",
              },
              {
                name: "Firmware (Various)",
                href: "/firmware",
                icon: Smartphone,
                color: "from-blue-500 to-purple-500",
                count: "2K+",
              },
              {
                name: "USB Drivers",
                href: "/usb-drivers",
                icon: Usb,
                color: "from-green-500 to-emerald-500",
                count: "100+",
              },
              {
                name: "Free Tools",
                href: "/free-tools",
                icon: Download,
                color: "from-purple-500 to-pink-500",
                count: "200+",
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group p-4 lg:p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 text-center border border-border/30 hover:border-border/60"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r ${item.color} text-white mb-3 group-hover:scale-110 transition-transform duration-200 shadow-lg`}
                >
                  <item.icon className="h-6 w-6 lg:h-7 lg:w-7" />
                </div>
                <p className="text-sm lg:text-base font-medium text-foreground group-hover:text-blue-600 transition-colors duration-200">
                  {item.name}
                </p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {item.count} items
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p className="flex items-center">
                &copy; 2024 FilesHub. All rights reserved. Made with <Heart className="h-4 w-4 mx-1 text-red-500" />
                for mobile device enthusiasts worldwide.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center text-muted-foreground text-sm">
                <Globe className="h-4 w-4 mr-2 text-blue-600" />
                Serving 195+ countries
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
