// Utility functions to generate fake data for the finance tracker

// Account types and their properties
export const accountTypes = {
  bank: { icon: "tabler-building-bank", color: "from-blue-500/10 to-purple-500/10" },
  credit: { icon: "tabler-credit-card", color: "from-red-500/10 to-orange-500/10" },
  investment: { icon: "tabler-wallet", color: "from-green-500/10 to-emerald-500/10" },
  crypto: { icon: "tabler-currency-bitcoin", color: "from-yellow-500/10 to-amber-500/10" },
  cash: { icon: "tabler-cash", color: "from-indigo-500/10 to-violet-500/10" },
  property: { icon: "tabler-home", color: "from-pink-500/10 to-rose-500/10" },
}

// Transaction categories and their properties
export const transactionCategories = {
  food: {
    name: "Lebensmittel",
    icon: "tabler-shopping-cart",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  income: {
    name: "Einkommen",
    icon: "tabler-cash",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  entertainment: {
    name: "Unterhaltung",
    icon: "tabler-device-tv",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  transport: {
    name: "Transport",
    icon: "tabler-car",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  dining: {
    name: "Essen & Trinken",
    icon: "tabler-coffee",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  investment: {
    name: "Investitionen",
    icon: "tabler-chart-line",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  housing: {
    name: "Wohnen",
    icon: "tabler-home",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  utilities: {
    name: "Versorgung",
    icon: "tabler-bulb",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  },
  health: {
    name: "Gesundheit",
    icon: "tabler-heart",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  },
  education: {
    name: "Bildung",
    icon: "tabler-book",
    color: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
  },
  shopping: {
    name: "Shopping",
    icon: "tabler-shopping-bag",
    color: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300",
  },
  travel: { name: "Reisen", icon: "tabler-plane", color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
  subscription: {
    name: "Abonnements",
    icon: "tabler-repeat",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
}

// Generate accounts data
export const accounts = [
  {
    id: 1,
    name: "Girokonto",
    type: "bank",
    icon: "tabler-building-bank",
    balance: 3250.42,
    change: 2.3,
    color: "from-blue-500/10 to-purple-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-15",
    institution: "Deutsche Bank",
    accountNumber: "DE89 3704 0044 0532 0130 00",
  },
  {
    id: 2,
    name: "Sparkonto",
    type: "bank",
    icon: "tabler-building-bank",
    balance: 12500.0,
    change: 1.1,
    color: "from-blue-500/10 to-purple-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-15",
    institution: "Commerzbank",
    accountNumber: "DE89 3704 0044 0532 0130 01",
  },
  {
    id: 3,
    name: "Kreditkarte",
    type: "credit",
    icon: "tabler-credit-card",
    balance: -1250.3,
    change: -0.5,
    color: "from-red-500/10 to-orange-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-14",
    institution: "Deutsche Bank",
    accountNumber: "XXXX XXXX XXXX 4321",
    limit: 5000,
    dueDate: "2023-06-15",
  },
  {
    id: 4,
    name: "Depot",
    type: "investment",
    icon: "tabler-wallet",
    balance: 45250.8,
    change: 3.7,
    color: "from-green-500/10 to-emerald-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-15",
    institution: "Trade Republic",
    accountNumber: "TR123456789",
  },
  {
    id: 5,
    name: "Bitcoin Wallet",
    type: "crypto",
    icon: "tabler-currency-bitcoin",
    balance: 8750.25,
    change: 12.5,
    color: "from-yellow-500/10 to-amber-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-15",
    institution: "Coinbase",
    accountNumber: "0x1234567890abcdef",
  },
  {
    id: 6,
    name: "Bargeld",
    type: "cash",
    icon: "tabler-cash",
    balance: 350.0,
    change: 0,
    color: "from-indigo-500/10 to-violet-500/10",
    currency: "EUR",
    lastUpdated: "2023-05-10",
  },
  {
    id: 7,
    name: "Immobilie",
    type: "property",
    icon: "tabler-home",
    balance: 350000.0,
    change: 0.5,
    color: "from-pink-500/10 to-rose-500/10",
    currency: "EUR",
    lastUpdated: "2023-04-01",
    address: "Musterstraße 123, 10115 Berlin",
  },
]

// Generate transactions data
export const transactions = [
  {
    id: 1,
    description: "Supermarkt Einkauf",
    amount: -85.42,
    date: "2023-05-15",
    category: "food",
    account: 1,
    accountName: "Girokonto",
    recurring: false,
    notes: "Wocheneinkauf",
  },
  {
    id: 2,
    description: "Gehalt",
    amount: 3200.0,
    date: "2023-05-01",
    category: "income",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Monatliches Gehalt",
  },
  {
    id: 3,
    description: "Netflix Abo",
    amount: -12.99,
    date: "2023-05-10",
    category: "subscription",
    account: 3,
    accountName: "Kreditkarte",
    recurring: true,
    frequency: "monthly",
    notes: "Streaming-Dienst",
  },
  {
    id: 4,
    description: "Tankstelle",
    amount: -65.5,
    date: "2023-05-12",
    category: "transport",
    account: 3,
    accountName: "Kreditkarte",
    recurring: false,
    notes: "Volltanken",
  },
  {
    id: 5,
    description: "Restaurant",
    amount: -42.8,
    date: "2023-05-14",
    category: "dining",
    account: 1,
    accountName: "Girokonto",
    recurring: false,
    notes: "Abendessen mit Freunden",
  },
  {
    id: 6,
    description: "Dividende",
    amount: 25.4,
    date: "2023-05-05",
    category: "investment",
    account: 4,
    accountName: "Depot",
    recurring: true,
    frequency: "quarterly",
    notes: "Apple Dividende",
  },
  {
    id: 7,
    description: "Miete",
    amount: -950.0,
    date: "2023-05-03",
    category: "housing",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Monatliche Miete",
  },
  {
    id: 8,
    description: "Strom",
    amount: -85.3,
    date: "2023-05-08",
    category: "utilities",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Stromrechnung",
  },
  {
    id: 9,
    description: "Arztbesuch",
    amount: -50.0,
    date: "2023-05-11",
    category: "health",
    account: 1,
    accountName: "Girokonto",
    recurring: false,
    notes: "Zahnarzt",
  },
  {
    id: 10,
    description: "Online-Kurs",
    amount: -199.0,
    date: "2023-05-07",
    category: "education",
    account: 3,
    accountName: "Kreditkarte",
    recurring: false,
    notes: "Programmier-Kurs",
  },
  {
    id: 11,
    description: "Kleidung",
    amount: -120.5,
    date: "2023-05-13",
    category: "shopping",
    account: 3,
    accountName: "Kreditkarte",
    recurring: false,
    notes: "Neue Jacke",
  },
  {
    id: 12,
    description: "Flugtickets",
    amount: -350.0,
    date: "2023-05-09",
    category: "travel",
    account: 3,
    accountName: "Kreditkarte",
    recurring: false,
    notes: "Urlaub im Sommer",
  },
  {
    id: 13,
    description: "Spotify Abo",
    amount: -9.99,
    date: "2023-05-15",
    category: "subscription",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Musik-Streaming",
  },
  {
    id: 14,
    description: "Überweisung an Sparkonto",
    amount: -500.0,
    date: "2023-05-02",
    category: "investment",
    account: 1,
    accountName: "Girokonto",
    toAccount: 2,
    toAccountName: "Sparkonto",
    recurring: true,
    frequency: "monthly",
    notes: "Monatliches Sparen",
  },
  {
    id: 15,
    description: "Überweisung von Girokonto",
    amount: 500.0,
    date: "2023-05-02",
    category: "investment",
    account: 2,
    accountName: "Sparkonto",
    fromAccount: 1,
    fromAccountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Monatliches Sparen",
  },
]

// Generate recurring transactions
export const recurringTransactions = transactions.filter((t) => t.recurring)

// Generate stocks and funds data
export const stocksAndFunds = [
  {
    id: 1,
    name: "Apple Inc.",
    ticker: "AAPL",
    type: "stock",
    shares: 10,
    price: 175.5,
    value: 1755.0,
    change: 2.3,
    changeAmount: 39.37,
    currency: "USD",
    sector: "Technology",
    purchaseDate: "2022-01-15",
    purchasePrice: 150.2,
    account: 4,
    accountName: "Depot",
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    ticker: "MSFT",
    type: "stock",
    shares: 5,
    price: 320.75,
    value: 1603.75,
    change: 1.5,
    changeAmount: 23.75,
    currency: "USD",
    sector: "Technology",
    purchaseDate: "2022-02-10",
    purchasePrice: 280.5,
    account: 4,
    accountName: "Depot",
  },
  {
    id: 3,
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    type: "etf",
    shares: 8,
    price: 410.2,
    value: 3281.6,
    change: 0.8,
    changeAmount: 26.0,
    currency: "USD",
    sector: "Index Fund",
    purchaseDate: "2022-03-05",
    purchasePrice: 380.1,
    account: 4,
    accountName: "Depot",
  },
  {
    id: 4,
    name: "iShares Core MSCI World UCITS ETF",
    ticker: "IWDA.L",
    type: "etf",
    shares: 20,
    price: 75.8,
    value: 1516.0,
    change: 0.5,
    changeAmount: 7.58,
    currency: "EUR",
    sector: "Index Fund",
    purchaseDate: "2022-04-20",
    purchasePrice: 70.25,
    account: 4,
    accountName: "Depot",
  },
  {
    id: 5,
    name: "Amazon.com, Inc.",
    ticker: "AMZN",
    type: "stock",
    shares: 3,
    price: 3250.0,
    value: 9750.0,
    change: -0.7,
    changeAmount: -68.25,
    currency: "USD",
    sector: "Consumer Cyclical",
    purchaseDate: "2022-05-12",
    purchasePrice: 3100.5,
    account: 4,
    accountName: "Depot",
  },
]

// Generate crypto data
export const cryptoAssets = [
  {
    id: 1,
    name: "Bitcoin",
    ticker: "BTC",
    amount: 0.25,
    price: 30000.0,
    value: 7500.0,
    change: 5.2,
    changeAmount: 371.25,
    currency: "EUR",
    purchaseDate: "2022-06-10",
    purchasePrice: 25000.0,
    account: 5,
    accountName: "Bitcoin Wallet",
  },
  {
    id: 2,
    name: "Ethereum",
    ticker: "ETH",
    amount: 1.5,
    price: 1800.0,
    value: 2700.0,
    change: 3.8,
    changeAmount: 98.55,
    currency: "EUR",
    purchaseDate: "2022-07-15",
    purchasePrice: 1500.0,
    account: 5,
    accountName: "Bitcoin Wallet",
  },
  {
    id: 3,
    name: "Cardano",
    ticker: "ADA",
    amount: 1000,
    price: 0.35,
    value: 350.0,
    change: -2.1,
    changeAmount: -7.52,
    currency: "EUR",
    purchaseDate: "2022-08-20",
    purchasePrice: 0.4,
    account: 5,
    accountName: "Bitcoin Wallet",
  },
]

// Generate budget data
export const budgets = [
  {
    id: 1,
    category: "food",
    categoryName: "Lebensmittel",
    planned: 400.0,
    actual: 350.42,
    remaining: 49.58,
    period: "May 2023",
    progress: 87.6,
  },
  {
    id: 2,
    category: "transport",
    categoryName: "Transport",
    planned: 200.0,
    actual: 165.5,
    remaining: 34.5,
    period: "May 2023",
    progress: 82.75,
  },
  {
    id: 3,
    category: "dining",
    categoryName: "Essen & Trinken",
    planned: 150.0,
    actual: 142.8,
    remaining: 7.2,
    period: "May 2023",
    progress: 95.2,
  },
  {
    id: 4,
    category: "entertainment",
    categoryName: "Unterhaltung",
    planned: 100.0,
    actual: 22.98,
    remaining: 77.02,
    period: "May 2023",
    progress: 22.98,
  },
  {
    id: 5,
    category: "shopping",
    categoryName: "Shopping",
    planned: 200.0,
    actual: 120.5,
    remaining: 79.5,
    period: "May 2023",
    progress: 60.25,
  },
  {
    id: 6,
    category: "subscription",
    categoryName: "Abonnements",
    planned: 50.0,
    actual: 22.98,
    remaining: 27.02,
    period: "May 2023",
    progress: 45.96,
  },
]

// Generate subscriptions data
export const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    amount: 12.99,
    frequency: "monthly",
    category: "subscription",
    nextPayment: "2023-06-10",
    account: 3,
    accountName: "Kreditkarte",
    icon: "tabler-device-tv",
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Spotify",
    amount: 9.99,
    frequency: "monthly",
    category: "subscription",
    nextPayment: "2023-06-15",
    account: 1,
    accountName: "Girokonto",
    icon: "tabler-music",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Amazon Prime",
    amount: 7.99,
    frequency: "monthly",
    category: "subscription",
    nextPayment: "2023-06-05",
    account: 3,
    accountName: "Kreditkarte",
    icon: "tabler-shopping-cart",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Fitnessstudio",
    amount: 29.99,
    frequency: "monthly",
    category: "health",
    nextPayment: "2023-06-01",
    account: 1,
    accountName: "Girokonto",
    icon: "tabler-barbell",
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "iCloud Speicher",
    amount: 2.99,
    frequency: "monthly",
    category: "subscription",
    nextPayment: "2023-06-20",
    account: 3,
    accountName: "Kreditkarte",
    icon: "tabler-cloud",
    color: "bg-sky-500",
  },
]

// Generate planned payments data
export const plannedPayments = [
  {
    id: 1,
    description: "Miete",
    amount: 950.0,
    date: "2023-06-03",
    category: "housing",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Monatliche Miete",
  },
  {
    id: 2,
    description: "Strom",
    amount: 85.3,
    date: "2023-06-08",
    category: "utilities",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Stromrechnung",
  },
  {
    id: 3,
    description: "Internet",
    amount: 39.99,
    date: "2023-06-12",
    category: "utilities",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Internet-Anschluss",
  },
  {
    id: 4,
    description: "Handyvertrag",
    amount: 29.99,
    date: "2023-06-15",
    category: "utilities",
    account: 3,
    accountName: "Kreditkarte",
    recurring: true,
    frequency: "monthly",
    notes: "Mobilfunkvertrag",
  },
  {
    id: 5,
    description: "Kreditraten",
    amount: 250.0,
    date: "2023-06-20",
    category: "housing",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Kreditraten für Auto",
  },
  {
    id: 6,
    description: "Versicherung",
    amount: 120.0,
    date: "2023-06-25",
    category: "housing",
    account: 1,
    accountName: "Girokonto",
    recurring: true,
    frequency: "monthly",
    notes: "Hausratversicherung",
  },
]

// Generate spending by category data
export const spendingByCategory = [
  { category: "food", amount: 350.42, percentage: 25 },
  { category: "housing", amount: 950.0, percentage: 40 },
  { category: "transport", amount: 165.5, percentage: 10 },
  { category: "utilities", amount: 155.28, percentage: 8 },
  { category: "entertainment", amount: 22.98, percentage: 2 },
  { category: "dining", amount: 142.8, percentage: 7 },
  { category: "shopping", amount: 120.5, percentage: 6 },
  { category: "health", amount: 50.0, percentage: 2 },
]

// Generate monthly spending data for charts
export const monthlySpending = [
  { month: "Jan", amount: 2100.5 },
  { month: "Feb", amount: 2250.3 },
  { month: "Mar", amount: 1950.8 },
  { month: "Apr", amount: 2050.2 },
  { month: "May", amount: 2150.4 },
]

// Generate monthly income data for charts
export const monthlyIncome = [
  { month: "Jan", amount: 3200.0 },
  { month: "Feb", amount: 3200.0 },
  { month: "Mar", amount: 3400.0 },
  { month: "Apr", amount: 3200.0 },
  { month: "May", amount: 3200.0 },
]

// Generate net worth history data
export const netWorthHistory = [
  { month: "Jan", netWorth: 105000 },
  { month: "Feb", netWorth: 107500 },
  { month: "Mar", netWorth: 110000 },
  { month: "Apr", netWorth: 109000 },
  { month: "May", netWorth: 112000 },
  { month: "Jun", netWorth: 115000 },
  { month: "Jul", netWorth: 118000 },
  { month: "Aug", netWorth: 121000 },
  { month: "Sep", netWorth: 124892 },
]

// Helper function to get category color
export function getCategoryColor(category: string) {
  return (
    transactionCategories[category as keyof typeof transactionCategories]?.color ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  )
}

// Helper function to get category name
export function getCategoryName(category: string) {
  return transactionCategories[category as keyof typeof transactionCategories]?.name || category
}

// Helper function to format currency
export function formatCurrency(amount: number, currency = "EUR") {
  return amount.toLocaleString("de-DE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Helper function to format percentage
export function formatPercentage(value: number) {
  return value.toLocaleString("de-DE", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

// Helper function to format date
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Calculate total balance
export function calculateTotalBalance() {
  return accounts.reduce((sum, account) => sum + account.balance, 0)
}

// Calculate total income
export function calculateTotalIncome(period = "current") {
  return transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
}

// Calculate total expenses
export function calculateTotalExpenses(period = "current") {
  return transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
}

// Calculate net worth
export function calculateNetWorth() {
  return calculateTotalBalance()
}

