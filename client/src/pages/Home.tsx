import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Code, FileText, Zap, Shield, Globe, ArrowRight, CreditCard, Users, Repeat, Wallet, Building, Coins, Link as LinkIcon, Settings, Webhook, TrendingUp, Clock } from "lucide-react";
import { Link } from "wouter";

// API模块配置
const API_MODULES = [
  {
    name: "Customer & Transfer",
    file: "customer",
    icon: Users,
    color: "blue",
    description: "Customer management and transfer operations"
  },
  {
    name: "Transfers",
    file: "transfer",
    icon: Repeat,
    color: "green",
    description: "Money transfer and transaction processing"
  },
  {
    name: "Wallet Service",
    file: "wallet",
    icon: Wallet,
    color: "purple",
    description: "Digital wallet creation and management"
  },
  {
    name: "Card Accounts",
    file: "card",
    icon: CreditCard,
    color: "pink",
    description: "Card issuance and account management"
  },
  {
    name: "External Accounts",
    file: "externalAccount",
    icon: Building,
    color: "orange",
    description: "Link and manage external bank accounts"
  },
  {
    name: "Virtual Accounts",
    file: "virtualAccount",
    icon: Coins,
    color: "cyan",
    description: "Virtual account creation and operations"
  },
  {
    name: "Batch Settlement",
    file: "batchSettlement",
    icon: Clock,
    color: "indigo",
    description: "Scheduled batch payment processing"
  },
  {
    name: "Liquidation Addresses",
    file: "liquidationAddress",
    icon: Building,
    color: "teal",
    description: "Crypto liquidation address management"
  },
  {
    name: "Prefunded Accounts",
    file: "prefundedAccount",
    icon: Wallet,
    color: "violet",
    description: "Pre-funded account configuration"
  },
  {
    name: "KYC Links",
    file: "kycLink",
    icon: LinkIcon,
    color: "amber",
    description: "KYC verification link generation"
  },
  {
    name: "Developer Tools",
    file: "developer",
    icon: Settings,
    color: "slate",
    description: "Developer fee configuration and tools"
  },
  {
    name: "Webhooks",
    file: "webhook",
    icon: Webhook,
    color: "rose",
    description: "Event notifications and webhooks"
  },
  {
    name: "FX Rates",
    file: "fxrate",
    icon: TrendingUp,
    color: "emerald",
    description: "Foreign exchange rate queries"
  },
  {
    name: "Transaction Status",
    file: "transactionStatus",
    icon: FileText,
    color: "sky",
    description: "Transfer status definitions and tracking"
  }
];

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: { bg: "bg-blue-600/10", text: "text-blue-500", border: "border-blue-500/30", hover: "hover:border-blue-500/60" },
  green: { bg: "bg-green-600/10", text: "text-green-500", border: "border-green-500/30", hover: "hover:border-green-500/60" },
  purple: { bg: "bg-purple-600/10", text: "text-purple-500", border: "border-purple-500/30", hover: "hover:border-purple-500/60" },
  pink: { bg: "bg-pink-600/10", text: "text-pink-500", border: "border-pink-500/30", hover: "hover:border-pink-500/60" },
  orange: { bg: "bg-orange-600/10", text: "text-orange-500", border: "border-orange-500/30", hover: "hover:border-orange-500/60" },
  cyan: { bg: "bg-cyan-600/10", text: "text-cyan-500", border: "border-cyan-500/30", hover: "hover:border-cyan-500/60" },
  indigo: { bg: "bg-indigo-600/10", text: "text-indigo-500", border: "border-indigo-500/30", hover: "hover:border-indigo-500/60" },
  teal: { bg: "bg-teal-600/10", text: "text-teal-500", border: "border-teal-500/30", hover: "hover:border-teal-500/60" },
  violet: { bg: "bg-violet-600/10", text: "text-violet-500", border: "border-violet-500/30", hover: "hover:border-violet-500/60" },
  amber: { bg: "bg-amber-600/10", text: "text-amber-500", border: "border-amber-500/30", hover: "hover:border-amber-500/60" },
  slate: { bg: "bg-slate-600/10", text: "text-slate-400", border: "border-slate-500/30", hover: "hover:border-slate-500/60" },
  rose: { bg: "bg-rose-600/10", text: "text-rose-500", border: "border-rose-500/30", hover: "hover:border-rose-500/60" },
  emerald: { bg: "bg-emerald-600/10", text: "text-emerald-500", border: "border-emerald-500/30", hover: "hover:border-emerald-500/60" },
  sky: { bg: "bg-sky-600/10", text: "text-sky-500", border: "border-sky-500/30", hover: "hover:border-sky-500/60" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">API Documentation</h1>
          </div>
          <Link href="/docs">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              View All Documentation
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            Complete API Reference
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Comprehensive documentation for all API endpoints, including customers, transfers, wallets, cards, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/docs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                <Book className="mr-2 h-5 w-5" />
                Browse All APIs
              </Button>
            </Link>
            <a href="/openapi.yaml" download>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8">
                <FileText className="mr-2 h-5 w-5" />
                Download OpenAPI Spec
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">14 API Modules</CardTitle>
              <CardDescription className="text-slate-400">
                Complete coverage of all API endpoints organized by functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• Customer Management</li>
                <li>• Transfer Operations</li>
                <li>• Wallet & Card Services</li>
                <li>• Webhooks & Events</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white">63 Endpoints</CardTitle>
              <CardDescription className="text-slate-400">
                RESTful API with comprehensive CRUD operations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• GET, POST, PUT, DELETE methods</li>
                <li>• Pagination support</li>
                <li>• Filtering & sorting</li>
                <li>• Batch operations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-white">131 Data Models</CardTitle>
              <CardDescription className="text-slate-400">
                Well-defined schemas with detailed field descriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• Type definitions</li>
                <li>• Required vs optional fields</li>
                <li>• Enum values</li>
                <li>• Nested objects</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-orange-600/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-white">Security</CardTitle>
              <CardDescription className="text-slate-400">
                API key authentication with secure headers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• API Key authentication</li>
                <li>• Idempotency support</li>
                <li>• Rate limiting</li>
                <li>• HTTPS only</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-cyan-600/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-cyan-500" />
              </div>
              <CardTitle className="text-white">Multi-Environment</CardTitle>
              <CardDescription className="text-slate-400">
                Production and sandbox environments available
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• Production API</li>
                <li>• Sandbox for testing</li>
                <li>• Consistent endpoints</li>
                <li>• Easy environment switching</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-pink-600/10 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-pink-500" />
              </div>
              <CardTitle className="text-white">Interactive Docs</CardTitle>
              <CardDescription className="text-slate-400">
                Try API calls directly from the documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2 text-sm">
                <li>• Live API testing</li>
                <li>• Request/response examples</li>
                <li>• Code snippets</li>
                <li>• Search functionality</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* API Modules Navigation Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Explore API Modules</h3>
          <p className="text-slate-300 text-lg">Click on any module to jump directly to its documentation</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {API_MODULES.map((module) => {
            const Icon = module.icon;
            const colors = colorClasses[module.color];
            return (
              <Link key={module.file} href={`/docs#tag/${module.file}`}>
                <div className={`group bg-slate-800/30 border ${colors.border} ${colors.hover} rounded-lg p-5 transition-all cursor-pointer hover:bg-slate-800/50 hover:scale-105`}>
                  <div className="flex items-start gap-3">
                    <div className={`${colors.bg} rounded-lg p-2.5 flex-shrink-0`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        <span className="truncate">{module.name}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1" />
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-slate-300 mb-8">
            Explore our comprehensive API documentation and start building your integration today.
          </p>
          <Link href="/docs">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              <Book className="mr-2 h-5 w-5" />
              View Full Documentation
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>© 2025 API Documentation. Generated from OpenAPI 3.0 specifications.</p>
        </div>
      </footer>
    </div>
  );
}
