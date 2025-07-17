import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing/pricing-section"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, HelpCircle, Star, Users, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing Plans - FilesHub | Choose Your Perfect Plan",
  description:
    "Simple, transparent pricing for FilesHub. Choose from our flexible plans designed for individuals, professionals, and teams.",
  keywords: "pricing, plans, subscription, file sharing, premium features, upgrade",
}

export default function PricingPage() {
  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing accordingly.",
    },
    {
      question: "What happens to my files if I cancel?",
      answer:
        "Your files remain accessible for 30 days after cancellation. You can download them or upgrade to keep them permanently.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked!",
    },
    {
      question: "Is there a free trial?",
      answer: "Our Starter plan is free forever! You can also try any paid plan with our 30-day money-back guarantee.",
    },
    {
      question: "How secure are my files?",
      answer: "We use military-grade encryption and store files on secure servers with 99.9% uptime guarantee.",
    },
    {
      question: "Can I use FilesHub for business?",
      answer:
        "Our Enterprise plan is designed specifically for businesses with advanced features and priority support.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "FilesHub has revolutionized how I share large design files with clients. The premium features are worth every penny!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      content:
        "We switched to FilesHub Enterprise and haven't looked back. The team collaboration features are incredible.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      content: "The analytics and custom branding features help me understand my audience better. Highly recommended!",
      rating: 5,
      avatar: "ER",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
              Pricing That{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Makes Sense
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">What Our Users Say</h2>
              <p className="text-xl text-gray-600">Join thousands of satisfied users worldwide</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white mr-4 flex-shrink-0">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {[
                { icon: Shield, text: "Bank-level Security", desc: "256-bit SSL encryption" },
                { icon: Users, text: "500K+ Happy Users", desc: "Trusted worldwide" },
                { icon: Zap, text: "99.9% Uptime", desc: "Always available" },
                { icon: CheckCircle, text: "30-day Guarantee", desc: "Risk-free trial" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <p className="font-semibold text-gray-700 mb-1">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
