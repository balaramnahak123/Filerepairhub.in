"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  Crown,
  Star,
  CheckCircle,
  Calendar,
  CreditCard,
  Zap,
  Shield,
  Download,
  Users,
  BarChart,
  Palette,
  Code,
  Sparkles,
  Gift,
} from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration_days: number
  features: string[]
  is_active: boolean
}

export function SubscriptionManager() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const {
    user,
    subscriptionStatus,
    hasActiveSubscription,
    purchaseSubscription,
    cancelSubscription,
    refreshSubscriptionStatus,
  } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    // Mock data for demo - in real app, fetch from API
    const mockPlans: SubscriptionPlan[] = [
      {
        id: "1",
        name: "Basic Plan",
        price: 9.99,
        duration_days: 30,
        features: ["Download premium files", "Priority support", "No ads", "5GB extra storage"],
        is_active: true,
      },
      {
        id: "2",
        name: "Pro Plan",
        price: 19.99,
        duration_days: 30,
        features: [
          "Download premium files",
          "Priority support",
          "No ads",
          "50GB extra storage",
          "Advanced analytics",
          "Custom branding",
        ],
        is_active: true,
      },
      {
        id: "3",
        name: "Enterprise Plan",
        price: 49.99,
        duration_days: 30,
        features: [
          "Download premium files",
          "Priority support",
          "No ads",
          "500GB extra storage",
          "Advanced analytics",
          "Custom branding",
          "API access",
          "Team collaboration",
        ],
        is_active: true,
      },
    ]

    setPlans(mockPlans)
    setLoading(false)
  }

  const handlePurchase = async (planId: string) => {
    setPurchasing(planId)

    const { error } = await purchaseSubscription(planId)

    if (error) {
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "🎉 Subscription Activated!",
        description: "You can now download premium files!",
      })
    }

    setPurchasing(null)
  }

  const handleCancel = async () => {
    const { error } = await cancelSubscription()

    if (error) {
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled.",
      })
    }
  }

  const getFeatureIcon = (feature: string) => {
    if (feature.includes("Download")) return Download
    if (feature.includes("support")) return Shield
    if (feature.includes("storage")) return Zap
    if (feature.includes("analytics")) return BarChart
    if (feature.includes("branding")) return Palette
    if (feature.includes("API")) return Code
    if (feature.includes("Team")) return Users
    return CheckCircle
  }

  const getPlanGradient = (index: number) => {
    const gradients = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500"]
    return gradients[index] || gradients[0]
  }

  if (!user) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>Please sign in to manage your subscription.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      {hasActiveSubscription && subscriptionStatus && (
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <Crown className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Active Subscription</h3>
                  <p className="text-gray-600">You have access to premium features</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                {subscriptionStatus.planName}
              </Badge>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/80 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Days Remaining</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">{subscriptionStatus.daysRemaining}</p>
              </div>

              <div className="p-4 bg-white/80 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Premium Access</span>
                </div>
                <p className="text-lg font-semibold text-green-600 mt-1">Unlimited</p>
              </div>

              <div className="p-4 bg-white/80 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-lg font-semibold text-green-600 mt-1">Active</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button variant="outline" onClick={() => refreshSubscriptionStatus()}>
                Refresh Status
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">Unlock premium features and download exclusive content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPopular = index === 1
            const gradient = getPlanGradient(index)

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isPopular
                    ? "border-2 border-purple-500 shadow-2xl scale-105 z-10"
                    : "border border-gray-200 shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>

                <CardHeader className="text-center pb-8 relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} text-white mb-4 mx-auto`}
                  >
                    {index === 0 && <Gift className="h-8 w-8" />}
                    {index === 1 && <Crown className="h-8 w-8" />}
                    {index === 2 && <Zap className="h-8 w-8" />}
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <CardDescription className="mt-2 text-gray-600">
                    {plan.duration_days} days access to premium features
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => {
                      const FeatureIcon = getFeatureIcon(feature)
                      return (
                        <li key={featureIndex} className="flex items-center">
                          <div className={`p-1 rounded-lg bg-gradient-to-r ${gradient} text-white mr-3`}>
                            <FeatureIcon className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      )
                    })}
                  </ul>

                  <Button
                    className={`w-full py-3 ${
                      isPopular
                        ? `bg-gradient-to-r ${gradient} hover:shadow-lg text-white`
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    } transition-all duration-200 hover:scale-105`}
                    onClick={() => handlePurchase(plan.id)}
                    disabled={purchasing === plan.id || hasActiveSubscription}
                  >
                    {purchasing === plan.id ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : hasActiveSubscription ? (
                      "Current Plan"
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscribe Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Subscribe?</h3>
            <p className="text-gray-600">Unlock the full potential of FilesHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Download,
                title: "Premium Downloads",
                desc: "Access exclusive premium files and content",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "Priority Support",
                desc: "Get help faster with priority customer support",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Zap,
                title: "Extra Storage",
                desc: "More space for your files and uploads",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: BarChart,
                title: "Advanced Analytics",
                desc: "Detailed insights about your file usage",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.gradient} text-white mb-4`}
                >
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
