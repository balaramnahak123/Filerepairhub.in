"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Crown, Users, DollarSign, Plus, Edit, Trash2, CheckCircle, XCircle, Star } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration_days: number
  features: string[]
  is_active: boolean
  subscriber_count?: number
}

interface UserSubscription {
  id: string
  user_email: string
  plan_name: string
  start_date: string
  end_date: string
  is_active: boolean
  payment_status: string
  days_remaining: number
}

export function SubscriptionAdmin() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: 0,
    duration_days: 30,
    features: [""],
    is_active: true,
  })

  const { isAdmin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin])

  const fetchData = async () => {
    // Mock data for demo
    const mockPlans: SubscriptionPlan[] = [
      {
        id: "1",
        name: "Basic Plan",
        price: 9.99,
        duration_days: 30,
        features: ["Download premium files", "Priority support", "No ads", "5GB extra storage"],
        is_active: true,
        subscriber_count: 45,
      },
      {
        id: "2",
        name: "Pro Plan",
        price: 19.99,
        duration_days: 30,
        features: ["Download premium files", "Priority support", "No ads", "50GB extra storage", "Advanced analytics"],
        is_active: true,
        subscriber_count: 123,
      },
    ]

    const mockSubscriptions: UserSubscription[] = [
      {
        id: "1",
        user_email: "user1@example.com",
        plan_name: "Pro Plan",
        start_date: "2024-01-01",
        end_date: "2024-02-01",
        is_active: true,
        payment_status: "completed",
        days_remaining: 15,
      },
      {
        id: "2",
        user_email: "user2@example.com",
        plan_name: "Basic Plan",
        start_date: "2024-01-15",
        end_date: "2024-02-15",
        is_active: true,
        payment_status: "completed",
        days_remaining: 30,
      },
    ]

    setPlans(mockPlans)
    setSubscriptions(mockSubscriptions)
    setLoading(false)
  }

  const handleCreatePlan = () => {
    const plan: SubscriptionPlan = {
      id: Date.now().toString(),
      ...newPlan,
      features: newPlan.features.filter((f) => f.trim() !== ""),
    }

    setPlans([...plans, plan])
    setNewPlan({
      name: "",
      price: 0,
      duration_days: 30,
      features: [""],
      is_active: true,
    })

    toast({
      title: "Plan Created! 🎉",
      description: `${plan.name} has been created successfully.`,
    })
  }

  const handleUpdatePlan = (planId: string, updates: Partial<SubscriptionPlan>) => {
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, ...updates } : plan)))

    toast({
      title: "Plan Updated ✨",
      description: "Subscription plan has been updated.",
    })
  }

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId))
    toast({
      title: "Plan Deleted",
      description: "Subscription plan has been removed.",
    })
  }

  const addFeature = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, ""],
    })
  }

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features]
    updatedFeatures[index] = value
    setNewPlan({
      ...newPlan,
      features: updatedFeatures,
    })
  }

  const removeFeature = (index: number) => {
    setNewPlan({
      ...newPlan,
      features: newPlan.features.filter((_, i) => i !== index),
    })
  }

  const totalRevenue = subscriptions
    .filter((s) => s.payment_status === "completed")
    .reduce((sum, s) => {
      const plan = plans.find((p) => p.name === s.plan_name)
      return sum + (plan?.price || 0)
    }, 0)

  const activeSubscriptions = subscriptions.filter((s) => s.is_active).length

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Crown className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Admin Access Required</h3>
          <p className="text-gray-600">Only administrators can manage subscriptions.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${activeSubscriptions > 0 ? (totalRevenue / activeSubscriptions).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Plan */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create New Subscription Plan</span>
          </CardTitle>
          <CardDescription>Add a new subscription plan for users</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                placeholder="e.g., Premium Plan"
              />
            </div>
            <div>
              <Label htmlFor="planPrice">Price ($)</Label>
              <Input
                id="planPrice"
                type="number"
                step="0.01"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: Number.parseFloat(e.target.value) || 0 })}
                placeholder="9.99"
              />
            </div>
            <div>
              <Label htmlFor="planDuration">Duration (days)</Label>
              <Input
                id="planDuration"
                type="number"
                value={newPlan.duration_days}
                onChange={(e) => setNewPlan({ ...newPlan, duration_days: Number.parseInt(e.target.value) || 30 })}
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <Label>Features</Label>
            <div className="space-y-2">
              {newPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature description"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    disabled={newPlan.features.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addFeature} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={newPlan.is_active}
              onCheckedChange={(checked) => setNewPlan({ ...newPlan, is_active: checked })}
            />
            <Label>Active Plan</Label>
          </div>

          <Button
            onClick={handleCreatePlan}
            disabled={!newPlan.name || newPlan.price <= 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </CardContent>
      </Card>

      {/* Existing Plans */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5" />
            <span>Subscription Plans</span>
          </CardTitle>
          <CardDescription>Manage existing subscription plans</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
              ]
              const gradient = gradients[index % gradients.length]

              return (
                <Card
                  key={plan.id}
                  className="relative overflow-hidden border-2 border-gray-200 hover:border-purple-300 transition-all duration-200"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <Badge variant={plan.is_active ? "default" : "secondary"}>
                        {plan.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">${plan.price}/month</div>
                    <p className="text-sm text-gray-600">{plan.duration_days} days access</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {plan.subscriber_count !== undefined && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Users className="h-4 w-4 mr-2" />
                        {plan.subscriber_count} subscribers
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPlan(plan)}
                        className="flex-1 bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Subscriptions */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Active Subscriptions</span>
          </CardTitle>
          <CardDescription>Monitor user subscriptions and payments</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Crown className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{subscription.user_email}</p>
                      <p className="text-sm text-gray-600">{subscription.plan_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{subscription.days_remaining} days left</p>
                      <p className="text-xs text-gray-600">
                        Expires: {new Date(subscription.end_date).toLocaleDateString()}
                      </p>
                    </div>

                    <Badge
                      variant={subscription.payment_status === "completed" ? "default" : "secondary"}
                      className={
                        subscription.payment_status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }
                    >
                      {subscription.payment_status === "completed" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Pending
                        </>
                      )}
                    </Badge>

                    <Badge variant={subscription.is_active ? "default" : "secondary"}>
                      {subscription.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            {subscriptions.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-gray-900">No Active Subscriptions</h3>
                <p className="text-gray-600">Subscriptions will appear here when users subscribe to plans.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
