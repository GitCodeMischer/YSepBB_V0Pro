"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export default function TransferMoney() {
  const [activeTab, setActiveTab] = useState<'send' | 'request' | 'payment'>('send')
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(0)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  // Mock recipients data
  const recipients = [
    { id: 0, name: "Alek", avatar: "/assets/avatar.png" },
    { id: 1, name: "Esther", avatar: "/assets/avatar-2.png" },
    { id: 2, name: "Jane", avatar: "/assets/avatar-3.png" },
    { id: 3, name: "Edwin", avatar: "/assets/avatar-4.png" },
    { id: 4, name: "David", avatar: "/assets/avatar-5.png" },
    { id: 5, name: "Sarah", avatar: "/assets/avatar-6.png" },
    { id: 6, name: "Michael", avatar: "/assets/avatar-7.png" },
    { id: 7, name: "Alex", avatar: "/assets/avatar-8.png" },
  ]
  
  // Mock card accounts
  const accounts = [
    { id: 1, number: "1234 5678 9012 3456", type: "visa" },
    { id: 2, number: "9876 5432 1098 7654", type: "mastercard" },
  ]

  // Renders mobile-specific transfer layout
  const renderMobileView = () => (
    <div className="max-w-md mx-auto pb-24">
      {/* Header with back button */}
      <div className="px-5 pt-6 pb-4 flex items-center">
        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0 mr-3">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Transfer Money</h1>
      </div>

      {/* Send/Request/Payment tabs */}
      <div className="px-5 mb-6">
        <div className="segmented-control">
          <button
            className={cn("segment-button", activeTab === 'send' && "active")}
            onClick={() => setActiveTab('send')}
          >
            Send
          </button>
          <button
            className={cn("segment-button", activeTab === 'request' && "active")}
            onClick={() => setActiveTab('request')}
          >
            Request
          </button>
          <button
            className={cn("segment-button", activeTab === 'payment' && "active")}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Recipient selection */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium">Recipient</h2>
          <div className="relative h-8 w-28 rounded-full bg-secondary flex items-center px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="text-xs text-muted-foreground ml-1">Search</span>
          </div>
        </div>

        {/* Recipient grid */}
        <div className="recipient-grid">
          {recipients.slice(0, 8).map((recipient) => (
            <div 
              key={recipient.id}
              className="recipient-item"
              onClick={() => setSelectedRecipient(recipient.id)}
            >
              <Avatar className={cn(
                "recipient-avatar",
                selectedRecipient === recipient.id && "active"
              )}>
                <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="recipient-name">{recipient.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer details */}
      <div className="px-5 mb-6">
        <div className="transfer-section">
          <div className="transfer-row">
            <span className="text-sm">From</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">1234 5678 9012 3456</span>
              <div className="h-5 w-5 rounded-sm bg-primary"></div>
            </div>
          </div>
          
          <div className="transfer-row">
            <span className="text-sm">To</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">9876 5432 1098 7654</span>
              <div className="h-5 w-5 rounded-sm bg-[#FFA500]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="px-5 mb-8">
        <h2 className="text-lg font-medium mb-3">Amount</h2>
        <div className="transfer-section">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">12.50</span>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-black">=</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">1037.5</span>
              <span className="text-sm text-muted-foreground">BIT</span>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <span className="text-xs text-muted-foreground">1 USD = 83 BIT</span>
            <span className="text-xs text-muted-foreground">1 BIT = 0.012 USD</span>
          </div>
        </div>
      </div>

      {/* Slide to transfer button */}
      <div className="px-5">
        <div className="slide-to-action">
          <div className="slide-to-action-thumb">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="slide-to-action-track">
            Slide To Transfer Money &gt;&gt;&gt;
          </div>
        </div>
      </div>
    </div>
  )
  
  // Renders desktop-specific transfer layout
  const renderDesktopView = () => (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/finance-tracker-dashboard">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Transfer Money</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Account & Amount */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="send" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="send">Send Money</TabsTrigger>
                  <TabsTrigger value="request">Request Money</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="send" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="from-account">From Account</Label>
                      <div className="flex items-center gap-3 p-3 border rounded-md mt-2">
                        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                          <span className="text-xs font-bold">V</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">VISA Card</div>
                          <div className="text-xs text-muted-foreground">1234 5678 9012 3456</div>
                        </div>
                        <div className="text-sm font-medium">$12,540.25</div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="to-account">To Account</Label>
                      <div className="flex items-center gap-3 p-3 border rounded-md mt-2 bg-secondary/10">
                        <div className="h-8 w-8 rounded-md bg-[#FFA500] flex items-center justify-center text-primary-foreground">
                          <span className="text-xs font-bold">M</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">Mastercard</div>
                          <div className="text-xs text-muted-foreground">9876 5432 1098 7654</div>
                        </div>
                        <div className="text-sm font-medium">$5,821.75</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative mt-2">
                          <div className="absolute left-3 top-3 text-muted-foreground">$</div>
                          <Input id="amount" type="number" placeholder="0.00" className="pl-7" value="12.50" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Input id="currency" value="USD" className="mt-2" readOnly />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input id="notes" placeholder="Add a note about this transfer" className="mt-2" />
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Exchange Rate</span>
                        <span className="text-sm">1 USD = 83 BIT</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Fee</span>
                        <span className="text-sm">$0.00</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>$12.50 (1037.5 BIT)</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">Confirm Transfer</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="request">
                  <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                    <span className="text-muted-foreground">Request Money Form</span>
                  </div>
                </TabsContent>
                
                <TabsContent value="payment">
                  <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                    <span className="text-muted-foreground">Payment Form</span>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Recipient Selection */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Recipients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipients.slice(0, 5).map((recipient, index) => (
                <div 
                  key={recipient.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
                    selectedRecipient === recipient.id 
                      ? "bg-primary/10 border-primary" 
                      : "hover:bg-secondary/10"
                  )}
                  onClick={() => setSelectedRecipient(recipient.id)}
                >
                  <Avatar>
                    <AvatarFallback className={selectedRecipient === recipient.id ? "text-primary" : ""}>
                      {recipient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{recipient.name}</div>
                    <div className="text-xs text-muted-foreground">Last transfer: 2 days ago</div>
                  </div>
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    selectedRecipient === recipient.id ? "bg-primary" : "bg-secondary"
                  )}></div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">View All Recipients</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return isDesktop ? renderDesktopView() : renderMobileView()
} 