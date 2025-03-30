"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, ArrowDownRight, Lightbulb, TrendingDown, Wallet, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/components/layout/app-layout"
import { PageLoading } from "@/components/ui/page-loading"
import { formatCurrency } from "@/lib/fake-data"

export default function AIOptimization() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate AI analysis progress
  useEffect(() => {
    if (isAnalyzing && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 100) {
            setIsAnalyzing(false)
            setAnalysisComplete(true)
          }
          return newProgress
        })
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [isAnalyzing, progress])

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setProgress(0)
  }

  if (isLoading) {
    return (
      <AppLayout>
        <PageLoading />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Optimierung</h1>
          <p className="mt-1 text-muted-foreground">Intelligente Finanzanalyse und Empfehlungen</p>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
          onClick={startAnalysis}
          disabled={isAnalyzing}
        >
          <Sparkles className="h-4 w-4" />
          <span>Neue Analyse starten</span>
        </Button>
      </div>

      {isAnalyzing ? (
        <Card>
          <CardHeader>
            <CardTitle>Finanzanalyse läuft...</CardTitle>
            <CardDescription>Bitte warten Sie, während wir Ihre Finanzdaten analysieren</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">{progress}% abgeschlossen</p>

              <div className="mt-6 rounded-lg border border-border bg-card/50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <p className="font-medium">KI analysiert Ihre Finanzdaten</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Unsere KI durchsucht Ihre Transaktionen, Budgets und Abonnements, um Einsparpotenziale und
                  Optimierungsmöglichkeiten zu identifizieren.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : analysisComplete ? (
        <Tabs defaultValue="savings">
          <TabsList className="mb-6 grid w-full grid-cols-3 rounded-full bg-muted/50 p-1 backdrop-blur">
            <TabsTrigger value="savings" className="rounded-full">
              Einsparpotenziale
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-full">
              Erkenntnisse
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="rounded-full">
              Empfehlungen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="savings" className="space-y-6">
            <Card className="overflow-hidden border bg-gradient-to-br from-purple-500/10 to-blue-500/10 shadow-sm backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardDescription>Mögliche Einsparungen</CardDescription>
                <CardTitle className="flex items-baseline text-3xl font-bold">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {formatCurrency(125.97)}
                  </motion.span>
                  <span className="ml-2 text-sm text-muted-foreground">pro Monat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-accent-green" />
                  <span className="text-sm font-medium text-accent-green">-12.5%</span>
                  <span className="ml-1 text-xs text-muted-foreground">Ihrer monatlichen Ausgaben</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Überlappende Abonnements</CardTitle>
                      <Badge className="bg-purple-500 text-white">Einsparpotenzial: {formatCurrency(22.98)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sie haben sowohl Netflix als auch Amazon Prime. Beide bieten ähnliche Streaming-Dienste an.
                      Erwägen Sie, eines davon zu kündigen.
                    </p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <span>Details anzeigen</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Ungenutzte Abonnements</CardTitle>
                      <Badge className="bg-purple-500 text-white">Einsparpotenzial: {formatCurrency(9.99)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ihr Spotify-Abonnement wurde in den letzten 30 Tagen nicht genutzt. Erwägen Sie, es zu pausieren
                      oder zu kündigen.
                    </p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <span>Details anzeigen</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Hohe Lebensmittelausgaben</CardTitle>
                      <Badge className="bg-purple-500 text-white">Einsparpotenzial: {formatCurrency(93.0)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ihre Lebensmittelausgaben liegen 30% über dem Durchschnitt. Erwägen Sie, Mahlzeiten im Voraus zu
                      planen und Sonderangebote zu nutzen.
                    </p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <span>Details anzeigen</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-lg">Ausgabenmuster</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sie geben am meisten Geld an Wochenenden aus. 45% Ihrer Ausgaben fallen auf Samstage und Sonntage.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-accent-green" />
                      <CardTitle className="text-lg">Budgettrend</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ihre Ausgaben für Unterhaltung sind in den letzten 3 Monaten um 15% gesunken. Weiter so!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">Sparpotenzial</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Basierend auf Ihrem Einkommen könnten Sie monatlich bis zu {formatCurrency(500)} mehr sparen.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-lg">Kreditkartennutzung</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sie nutzen Ihre Kreditkarte für 65% aller Transaktionen. Achten Sie auf die monatliche
                      Rückzahlung.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Automatisieren Sie Ihr Sparen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Richten Sie einen automatischen Dauerauftrag ein, um am Monatsanfang Geld auf Ihr Sparkonto zu
                      überweisen. Wir empfehlen 15% Ihres Einkommens.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Empfohlener Betrag:</span>
                      <span className="font-bold">{formatCurrency(480)}</span>
                    </div>
                    <Button className="mt-4 w-full gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800">
                      <span>Dauerauftrag einrichten</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Optimieren Sie Ihre Abonnements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Überprüfen Sie Ihre Abonnements und kündigen Sie diejenigen, die Sie nicht regelmäßig nutzen. Wir
                      haben 2 ungenutzte Abonnements identifiziert.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Mögliche Einsparung:</span>
                      <span className="font-bold">{formatCurrency(22.98)}</span>
                    </div>
                    <Button className="mt-4 w-full gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800">
                      <span>Abonnements überprüfen</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Erstellen Sie ein Lebensmittelbudget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ihre Lebensmittelausgaben sind höher als der Durchschnitt. Erstellen Sie ein wöchentliches Budget
                      und planen Sie Ihre Mahlzeiten im Voraus.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Empfohlenes Budget:</span>
                      <span className="font-bold">{formatCurrency(300)}/Monat</span>
                    </div>
                    <Button className="mt-4 w-full gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800">
                      <span>Budget erstellen</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <Card className="overflow-hidden border bg-gradient-to-br from-purple-500/10 to-blue-500/10 shadow-sm backdrop-blur-md">
            <CardHeader>
              <CardTitle>KI-gestützte Finanzoptimierung</CardTitle>
              <CardDescription>
                Lassen Sie unsere KI Ihre Finanzdaten analysieren, um Einsparpotenziale zu identifizieren und
                personalisierte Empfehlungen zu erhalten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  className="gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
                  onClick={startAnalysis}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Analyse starten</span>
                </Button>
                <Button variant="outline">Mehr erfahren</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Einsparpotenziale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identifizieren Sie Bereiche, in denen Sie Geld sparen können, wie ungenutzte Abonnements oder
                  überhöhte Ausgaben.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Finanzielle Erkenntnisse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie tiefere Einblicke in Ihre Ausgabenmuster und Finanzgewohnheiten.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Personalisierte Empfehlungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bekommen Sie maßgeschneiderte Vorschläge zur Optimierung Ihrer Finanzen und zum Erreichen Ihrer Ziele.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

