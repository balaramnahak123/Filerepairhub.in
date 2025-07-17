"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Minus,
  Trash2,
  Package,
  Truck,
  Shield,
  CreditCard,
  Gift,
  Percent,
  Clock,
  Star,
  CheckCircle,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  category: string
  inStock: boolean
  maxQuantity: number
  shipping: {
    isFree: boolean
    cost: number
    estimatedDays: string
  }
  warranty: string
  rating: number
  reviews: number
}

interface ShippingOption {
  id: string
  name: string
  description: string
  cost: number
  estimatedDays: string
  icon: any
}

interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount: number
  description: string
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "PCB Repair Toolkit Pro",
    description: "Complete professional PCB repair kit with precision tools",
    price: 299.99,
    originalPrice: 399.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    category: "Tools",
    inStock: true,
    maxQuantity: 5,
    shipping: {
      isFree: true,
      cost: 0,
      estimatedDays: "2-3",
    },
    warranty: "2 Year Warranty",
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: "2",
    name: "Professional Microscope 45X",
    description: "High-precision stereo microscope for PCB component inspection",
    price: 189.99,
    originalPrice: 249.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    category: "Equipment",
    inStock: true,
    maxQuantity: 3,
    shipping: {
      isFree: false,
      cost: 15.99,
      estimatedDays: "3-5",
    },
    warranty: "1 Year Warranty",
    rating: 4.8,
    reviews: 1923,
  },
  {
    id: "3",
    name: "BGA Reballing Stencil Set",
    description: "Universal BGA stencil set for major mobile IC packages",
    price: 79.99,
    originalPrice: 99.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    category: "Components",
    inStock: true,
    maxQuantity: 10,
    shipping: {
      isFree: false,
      cost: 8.99,
      estimatedDays: "2-4",
    },
    warranty: "6 Month Warranty",
    rating: 4.7,
    reviews: 1456,
  },
]

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Regular delivery",
    cost: 9.99,
    estimatedDays: "5-7",
    icon: Package,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Faster delivery",
    cost: 19.99,
    estimatedDays: "2-3",
    icon: Truck,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next day delivery",
    cost: 39.99,
    estimatedDays: "1",
    icon: Clock,
  },
]

const promoCodes: PromoCode[] = [
  {
    code: "REPAIR20",
    discount: 20,
    type: "percentage",
    minAmount: 100,
    description: "20% off orders over $100",
  },
  {
    code: "TOOLS50",
    discount: 50,
    type: "fixed",
    minAmount: 200,
    description: "$50 off orders over $200",
  },
  {
    code: "NEWBIE15",
    discount: 15,
    type: "percentage",
    minAmount: 50,
    description: "15% off for new customers",
  },
]

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [selectedShipping, setSelectedShipping] = useState<string>("standard")
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { toast } = useToast()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const quantity = Math.min(newQuantity, item.maxQuantity)
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  const applyPromoCode = () => {
    const promo = promoCodes.find((p) => p.code.toLowerCase() === promoCode.toLowerCase())

    if (!promo) {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again",
        variant: "destructive",
      })
      return
    }

    if (subtotal < promo.minAmount) {
      toast({
        title: "Minimum amount not met",
        description: `This promo code requires a minimum order of $${promo.minAmount}`,
        variant: "destructive",
      })
      return
    }

    setAppliedPromo(promo)
    setPromoCode("")
    toast({
      title: "Promo code applied! 🎉",
      description: promo.description,
    })
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    toast({
      title: "Promo code removed",
      description: "The promo code has been removed from your order",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = cartItems.some((item) => item.shipping.isFree)
    ? 0
    : shippingOptions.find((option) => option.id === selectedShipping)?.cost || 0

  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * (appliedPromo.discount / 100)
      : appliedPromo.discount
    : 0

  const tax = (subtotal - promoDiscount) * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax - promoDiscount

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      toast({
        title: "Order placed successfully! 🎉",
        description: "You will receive a confirmation email shortly",
      })
      setCartItems([]) // Clear cart after successful checkout
      setAppliedPromo(null)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-foreground">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6 text-lg">Looks like you haven't added any items to your cart yet</p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Package className="h-6 w-6 mr-3 text-blue-600" />
              Shopping Cart ({cartItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    {item.originalPrice && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs ml-1">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            {item.warranty}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">${item.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        {item.shipping.isFree ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            <Truck className="h-3 w-3 mr-1" />
                            Free Shipping
                          </Badge>
                        ) : (
                          <span className="flex items-center">
                            <Truck className="h-3 w-3 mr-1" />
                            Shipping: ${item.shipping.cost}
                          </span>
                        )}
                      </div>
                      <span className="text-muted-foreground">
                        Delivery: {item.shipping.estimatedDays} business days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Options */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-green-600" />
              Shipping Options
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shippingOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedShipping === option.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedShipping(option.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <option.icon className="h-5 w-5 text-blue-600" />
                    {selectedShipping === option.id && <CheckCircle className="h-5 w-5 text-blue-600" />}
                  </div>
                  <h4 className="font-semibold text-foreground">{option.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">${option.cost}</span>
                    <span className="text-sm text-muted-foreground">{option.estimatedDays} days</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        {/* Promo Code */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-5 w-5 mr-2 text-purple-600" />
              Promo Code
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-300">{appliedPromo.code}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{appliedPromo.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removePromoCode}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={applyPromoCode}
                  disabled={!promoCode.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                >
                  Apply
                </Button>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Available Codes:</p>
              {promoCodes.map((promo) => (
                <div key={promo.code} className="flex items-center justify-between text-xs">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600">{promo.code}</code>
                  <span className="text-muted-foreground">{promo.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-semibold">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center">
                    <Percent className="h-4 w-4 mr-1" />
                    Promo ({appliedPromo.code}):
                  </span>
                  <span className="font-semibold">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-xl">
                <span className="font-bold text-foreground">Total:</span>
                <span className="font-bold text-green-600">${total.toFixed(2)}</span>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold shadow-xl"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Secure Checkout
                    </div>
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p className="flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-1 text-green-500" />
                  SSL Secured • Money-back Guarantee
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-muted-foreground">256-bit SSL encryption</span>
              </div>
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-muted-foreground">Free returns within 30 days</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-muted-foreground">2-year warranty on all tools</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
