"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Copy,
  CreditCard,
  Download,
  Edit,
  Globe,
  Key,
  Lock,
  LogOut,
  Plus,
  Trash,
  Upload,
  User,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaMicrosoft } from "react-icons/fa"
import { FaWallet } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from "@/components/layout/app-layout"

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Account Settings</h1>
            <p className="mt-1 text-muted-foreground">Manage your account details and preferences</p>
          </div>
        </div>

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <Tabs defaultValue={activeTab} orientation="vertical" onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full flex-col items-start justify-start bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-left"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-left"
                >
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger
                  value="connected"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-left"
                >
                  <Globe className="h-4 w-4" />
                  <span>Connected Accounts</span>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-left"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-left"
                >
                  <Download className="h-4 w-4" />
                  <span>Data</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </aside>

          <div className="flex-1 lg:max-w-2xl">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col justify-center space-y-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Upload a new profile picture</p>
                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america-new_york">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                          <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                          <SelectItem value="australia-sydney">Australia/Sydney (UTC+10:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-sm text-muted-foreground">
                          Use an authenticator app to generate one-time codes
                        </div>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>

                    {twoFactorEnabled && (
                      <div className="rounded-lg border p-4">
                        <div className="mb-4 text-sm">
                          Scan this QR code with your authenticator app to set up two-factor authentication.
                        </div>
                        <div className="flex justify-center">
                          <div className="h-40 w-40 rounded-lg bg-muted"></div>
                        </div>
                        <div className="mt-4 flex items-center justify-between rounded-md border bg-muted p-2">
                          <code className="text-sm">ABCD-EFGH-IJKL-MNOP</code>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Passkeys</h3>
                    <div className="rounded-lg border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">iPhone Passkey</div>
                          <div className="text-sm text-muted-foreground">Added on Jan 15, 2024</div>
                        </div>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          Remove
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Key className="mr-2 h-4 w-4" />
                        Add New Passkey
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-muted-foreground">
                            MacBook Pro • New York, USA • Started 2 hours ago
                          </div>
                        </div>
                        <Badge>Current</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <div className="font-medium">iPhone 14 Pro</div>
                          <div className="text-sm text-muted-foreground">iOS • New York, USA • Started 1 day ago</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out of All Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connected" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage accounts you've connected for authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FcGoogle className="h-6 w-6" />
                        <div>
                          <div className="font-medium">Google</div>
                          <div className="text-sm text-muted-foreground">Connected as john.doe@gmail.com</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FaMicrosoft className="h-6 w-6 text-blue-500" />
                        <div>
                          <div className="font-medium">Microsoft</div>
                          <div className="text-sm text-muted-foreground">Not connected</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FaWallet className="h-6 w-6 text-purple-500" />
                        <div>
                          <div className="font-medium">Phantom Wallet</div>
                          <div className="text-sm text-muted-foreground">Connected as 0x1a2b...3c4d</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Another Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">Pro Plan</span>
                          <Badge variant="secondary">Annual</Badge>
                        </div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing period</span>
                        <span>Jan 1, 2024 - Dec 31, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next payment</span>
                        <span>Dec 31, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span>$99.00 / year</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <div>
                          <div className="font-medium">Jan 1, 2024</div>
                          <div className="text-sm text-muted-foreground">Pro Plan (Annual)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>$99.00</span>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b p-4">
                        <div>
                          <div className="font-medium">Jan 1, 2023</div>
                          <div className="text-sm text-muted-foreground">Pro Plan (Annual)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>$89.00</span>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or delete your account data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Export Data</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Download a copy of your data in JSON or CSV format
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export as JSON
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export as CSV
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Import Data</h3>
                    <p className="mb-4 text-sm text-muted-foreground">Import data from another service or a backup</p>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                  </div>

                  <div className="rounded-lg border border-destructive/20 p-4">
                    <h3 className="mb-2 text-lg font-medium text-destructive">Danger Zone</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Permanently delete your account and all of your data
                    </p>
                    <Button variant="destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

