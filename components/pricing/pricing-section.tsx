"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Users, Star, Award, Flame, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const { purchaseSubscription, hasActiveSubscription } = useAuth()
  const { toast } = useToast()

  const handlePurchase = async (planId: string, planName: string) => {
    const { error } = await purchaseSubscription(planId)
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success!",
        description: `Welcome to ${planName}! Your subscription is now active.`,
      })
    }
  }

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: 0,
      annualPrice: 0,
      icon: Users,
      features: [
        "Upload up to 10 files",
        "2GB storage limit",
        "Basic file sharing",
        "Community support",
        "Standard download speeds",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Most Popular Choice for Creators",
      price: 15.99,
      annualPrice: 12.99,
      originalAnnualPrice: 15.99,
      icon: Award,
      features: [
        "Unlimited file uploads",
        "100GB premium storage",
        "Advanced file organization",
        "Priority support",
        "High-speed downloads",
        "Custom file categories",
        "Bulk file operations",
        "No advertisements",
        "Advanced analytics",
        "Team collaboration tools",
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
      savings: "Save $36/year",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large teams and organizations",
      price: 49.99,
      annualPrice: 39.99,
      icon: Crown,
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "Advanced admin controls",
        "24/7 dedicated support",
        "Custom integrations",
        "SSO authentication",
        "Advanced security features",
        "Custom branding",
        "API access",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features with varying limits and support
            levels.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>Annual</span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 animate-bounce">
                Save up to 25%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            const currentPrice = isAnnual ? plan.annualPrice : plan.price
            const isProfessional = plan.id === "professional"

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-2 border-purple-500 shadow-2xl bg-gradient-to-br from-white to-purple-50 animate-pulse-border"
                    : "border border-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className={`text-center ${isProfessional ? "pb-4" : "pb-6"}`}>
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        plan.popular
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${isProfessional ? "animate-pulse" : ""}`} />
                    </div>
                  </div>

                  <CardTitle className={`${isProfessional ? "text-3xl" : "text-2xl"} font-bold mb-2`}>
                    {plan.name}
                    {isProfessional && (
                      <div className="flex items-center justify-center mt-2">
                        <Flame className="w-5 h-5 text-orange-500 mr-1 animate-bounce" />
                        <span className="text-sm text-purple-600 font-medium">Premium Choice</span>
                        <Flame className="w-5 h-5 text-orange-500 ml-1 animate-bounce" />
                      </div>
                    )}
                  </CardTitle>

                  <CardDescription className={`${isProfessional ? "text-purple-600 font-medium" : "text-gray-600"}`}>
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span
                        className={`${
                          isProfessional
                            ? "text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                            : "text-5xl font-bold text-gray-900"
                        }`}
                      >
                        ${currentPrice}
                      </span>
                      <span className="text-gray-500 ml-2">/{isAnnual ? "year" : "month"}</span>
                    </div>

                    {isAnnual && plan.originalAnnualPrice && plan.originalAnnualPrice > plan.annualPrice && (
                      <div className="mt-2 flex items-center justify-center space-x-2">
                        <span className="text-gray-400 line-through text-lg">${plan.originalAnnualPrice}/year</span>
                        {plan.savings && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 animate-bounce">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                    )}

                    {isProfessional && (
                      <p className="text-sm text-purple-600 mt-2 font-medium">Most chosen by professionals worldwide</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check
                          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-purple-600" : "text-green-500"
                          }`}
                        />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg py-6"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    onClick={() => handlePurchase(plan.id, plan.name)}
                    disabled={hasActiveSubscription && plan.id !== "enterprise"}
                  >
                    {isProfessional && <Sparkles className="w-5 h-5 mr-2 animate-spin" />}
                    {hasActiveSubscription && plan.id !== "enterprise" ? "Current Plan" : plan.buttonText}
                    {isProfessional && <Zap className="w-5 h-5 ml-2" />}
                  </Button>

                  {plan.id === "free" && <p className="text-xs text-gray-500 text-center">No credit card required</p>}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">All plans include 30-day money-back guarantee</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>✓ Secure payments</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgb(168 85 247);
          }
          50% {
            border-color: rgb(236 72 153);
          }
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
