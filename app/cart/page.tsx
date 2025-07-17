import { ShoppingCart } from "@/components/cart/shopping-cart"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart - Professional Mobile Repair Tools & Components | FilesHub",
  description:
    "Review your selected mobile repair tools, components, and equipment. Secure checkout with multiple payment options and fast shipping.",
  keywords: "shopping cart, mobile repair tools, PCB components, checkout, secure payment, mobile repair equipment",
  openGraph: {
    title: "Shopping Cart - Professional Mobile Repair Tools & Components",
    description: "Review your selected mobile repair tools and components with secure checkout.",
    type: "website",
  },
}

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Shopping Cart</h1>
        <p className="text-xl text-muted-foreground">Review your selected items and proceed to secure checkout</p>
      </div>
      <ShoppingCart />
    </div>
  )
}
