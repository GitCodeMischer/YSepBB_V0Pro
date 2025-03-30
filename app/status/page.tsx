"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, ExternalLink, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for services
const services = [
  {
    id: 1,
    name: "API Service",
    status: "operational",
    uptime: 99.98,
    lastIncident: "2023-12-15T14:30:00Z",
    responseTime: 187,
  },
  {
    id: 2,
    name: "Authentication Service",
    status: "operational",
    uptime: 99.95,
    lastIncident: "2023-12-10T08:15:00Z",
    responseTime: 210,
  },
  {
    id: 3,
    name: "Database Cluster",
    status: "operational",
    uptime: 99.99,
    lastIncident: "2023-11-28T22:45:00Z",
    responseTime: 45,
  },
  {
    id: 4,
    name: "Web Application",
    status: "degraded",
    uptime: 98.75,
    lastIncident: "2024-01-05T10:20:00Z",
    responseTime: 450,
  },
  {
    id: 5,
    name: "Storage Service",
    status: "operational",
    uptime: 99.97,
    lastIncident: "2023-12-20T16:10:00Z",
    responseTime: 95,
  },
]

// Mock data for incidents
const incidents = [
  {
    id: 1,
    title: "Web Application Performance Degradation",
    status: "investigating",
    date: "2024-01-05T10:20:00Z",
    updates: [
      {
        id: 1,
        date: "2024-01-05T10:20:00Z",
        message: "We are investigating reports of slow response times on the web application.",
      },
      {
        id: 2,
        date: "2024-01-05T10:35:00Z",
        message: "The issue has been identified as high CPU usage on our application servers. We are working on a fix.",
      },
    ],
  },
  {
    id: 2,
    title: "Authentication Service Outage",
    status: "resolved",
    date: "2023-12-10T08:15:00Z",
    resolvedDate: "2023-12-10T09:45:00Z",
    updates: [
      {
        id: 1,
        date: "2023-12-10T08:15:00Z",
        message: "Users are experiencing issues logging in to the platform.",
      },
      {
        id: 2,
        date: "2023-12-10T08:30:00Z",
        message: "We have identified the issue with our authentication provider and are implementing a fix.",
      },
      {
        id: 3,
        date: "2023-12-10T09:45:00Z",
        message: "The authentication service has been restored and is now functioning normally.",
      },
    ],
  },
]

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Calculate overall system status
  const systemStatus = services.every(service => service.status === "operational") 
    ? "operational" 
    : services.some(service => service.status === "outage") 
      ? "outage" 
      : "degraded"
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }
  
  // Calculate time since for "Last checked" display
  const getTimeSince = () => {
    return "2 minutes ago"
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5"  asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">System Status</h1>
        </div>
        <Badge 
          variant={systemStatus === "operational" ? "success" : systemStatus === "degraded" ? "warning" : "destructive"}
          className="px-3 py-1 text-sm font-medium"
        >
          {systemStatus === "operational" ? "All Systems Operational" : systemStatus === "degraded" ? "Degraded Performance" : "System Outage"}
        </Badge>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Last checked: {getTimeSince()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="uptime">Uptime</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    {service.status === "operational" ? (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    ) : service.status === "degraded" ? (
                      <Clock className="mr-2 h-5 w-5 text-amber-500" />
                    ) : (
                      <XCircle className="mr-2 h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Response time: {service.responseTime}ms
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={service.status === "operational" ? "outline" : service.status === "degraded" ? "warning" : "destructive"}
                  >
                    {service.status === "operational" ? "Operational" : service.status === "degraded" ? "Degraded" : "Outage"}
                  </Badge>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="incidents" className="space-y-6">
              {incidents.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No incidents reported</h3>
                  <p className="text-muted-foreground">All systems have been operational for the past 90 days.</p>
                </div>
              ) : (
                incidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <Badge 
                          variant={incident.status === "resolved" ? "outline" : "destructive"}
                        >
                          {incident.status === "resolved" ? "Resolved" : "Investigating"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {incident.status === "resolved" 
                          ? `Resolved on ${formatDate(incident.resolvedDate)}` 
                          : `Reported on ${formatDate(incident.date)}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {incident.updates.map((update) => (
                          <div key={update.id} className="space-y-1">
                            <div className="text-sm text-muted-foreground">
                              {formatDate(update.date)}
                            </div>
                            <p>{update.message}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="uptime" className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{service.name}</h3>
                    <span className="text-sm font-medium">{service.uptime}%</span>
                  </div>
                  <Progress value={service.uptime} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Last incident: {formatDate(service.lastIncident)}
                  </p>
                  <Separator className="my-2" />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing data for the last 90 days
          </p>
          <Button variant="outline" size="sm" className="gap-1">
            <span>View History</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Subscribe to{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            status updates
          </Link>
          to receive notifications about service disruptions.
        </p>
      </div>
    </div>
  )
}

