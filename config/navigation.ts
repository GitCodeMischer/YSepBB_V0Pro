export interface NavItem {
  title: string
  icon?: { icon: string }
  to?: string
  children?: NavItem[]
}

export interface NavSection {
  heading?: string
  items: NavItem[]
}

export const navigation: (NavSection | NavItem)[] = [
  { heading: "Kontoverwaltung" },
  {
    title: "Dashboard",
    icon: { icon: "tabler-home" },
    to: "finance-tracker-dashboard",
  },
  {
    title: "Schnellübersicht",
    icon: { icon: "tabler-view-360" },
    children: [
      {
        title: "Aktuelle Kontostände",
        icon: { icon: "tabler-building-bank" },
        to: "finance-tracker-quick-overview-account-balances",
      },
      {
        title: "Letzte Transaktionen",
        icon: { icon: "tabler-receipt" },
        to: "finance-tracker-quick-overview-recent-transactions",
      },
      {
        title: "Gesamtausgaben",
        icon: { icon: "tabler-align-box-top-center-filled" },
        to: "finance-tracker-quick-overview-total-spending",
      },
      {
        title: "Ausgaben nach Kategorie",
        icon: { icon: "tabler-category-2" },
        to: "finance-tracker-quick-overview-spending-by-category",
      },
      {
        title: "Budgetübersicht",
        icon: { icon: "tabler-database-dollar" },
        to: "finance-tracker-quick-overview-budget-overview",
      },
    ],
  },
  {
    title: "Transaktionen",
    icon: { icon: "tabler-transaction-dollar" },
    children: [
      {
        title: "All",
        to: "finance-tracker-transactions-all",
      },
      {
        title: "Loop Recurring",
        icon: { icon: "tabler-repeat" },
        to: "finance-tracker-transactions-loop-transactions",
      },
    ],
  },
  {
    title: "Portfolio",
    icon: { icon: "tabler-wallet" },
    children: [
      {
        title: "Konten",
        icon: { icon: "tabler-color-swatch" },
        to: "finance-tracker-portfolio-accounts",
      },
      {
        title: "Aktien und Fonds",
        icon: { icon: "tabler-stack-back" },
        to: "finance-tracker-portfolio-stocks-and-funds",
      },
      {
        title: "Crypto",
        icon: { icon: "tabler-currency-bitcoin" },
        to: "finance-tracker-portfolio-crypto",
      },
    ],
  },
  {
    title: "Cashflow",
    icon: { icon: "tabler-cash" },
    children: [
      {
        title: "Einnahmen",
        icon: { icon: "tabler-chevrons-down-right" },
        to: "finance-tracker-cashflow-income",
      },
      {
        title: "Ausgaben",
        icon: { icon: "tabler-chevrons-up-right" },
        to: "finance-tracker-cashflow-expenses",
      },
    ],
  },
  {
    title: "Planung & Abos",
    icon: { icon: "tabler-businessplan" },
    children: [
      {
        title: "Geplante Zahlungen",
        icon: { icon: "tabler-calendar-clock" },
        to: "finance-tracker-planning-and-subscriptions-planned-payments",
      },
      {
        title: "BudgetPlan",
        icon: { icon: "tabler-businessplan" },
        to: "finance-tracker-planning-and-subscriptions-budget-plan",
      },
      {
        title: "Abos",
        icon: { icon: "tabler-time-duration-30" },
        to: "finance-tracker-planning-and-subscriptions-subscriptions",
      },
    ],
  },
  {
    title: "Statistiken",
    icon: { icon: "tabler-chart-arcs" },
    children: [
      {
        title: "Geplante Zahlungen",
        icon: { icon: "tabler-device-watch-stats-2" },
        to: "finance-tracker-statistics-planned-payments-stats",
      },
      {
        title: "BudgetPlan",
        icon: { icon: "tabler-file-report" },
        to: "finance-tracker-statistics-budget-plan-stats",
      },
      {
        title: "Abos",
        icon: { icon: "tabler-time-duration-30" },
        to: "finance-tracker-statistics-subscriptions-stats",
      },
      {
        title: "AI Optimierung",
        icon: { icon: "tabler-brand-openai" },
        to: "finance-tracker-statistics-ai-optimization",
      },
    ],
  },
]

// Helper function to get all routes as a flat array
export function getAllRoutes(): string[] {
  const routes: string[] = []

  function extractRoutes(items: NavItem[]) {
    items.forEach((item) => {
      if (item.to) {
        routes.push(item.to)
      }
      if (item.children) {
        extractRoutes(item.children)
      }
    })
  }

  navigation.forEach((section) => {
    if ("items" in section) {
      extractRoutes(section.items)
    } else if ("to" in section && section.to) {
      routes.push(section.to)
    } else if ("children" in section && section.children) {
      extractRoutes(section.children)
    }
  })

  return routes
}

// Helper to get main navigation items for mobile bottom nav
export function getMainNavItems(): NavItem[] {
  return navigation
    .filter((item) => !("heading" in item))
    .map((item) => {
      if ("items" in item) {
        return item.items[0]
      }
      return item as NavItem
    })
    .filter((item) => !!item)
    .slice(0, 5) // Limit to 5 items for bottom nav
}

