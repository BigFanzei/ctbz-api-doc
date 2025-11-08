import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Code, FileText, Zap, Shield, Globe } from "lucide-react";
import { Link } from "wouter";

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
              View Documentation
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
                Browse API Docs
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8">
              <FileText className="mr-2 h-5 w-5" />
              Download OpenAPI Spec
            </Button>
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

      {/* API Modules Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-12">Available API Modules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            "Customer Management",
            "Transfer Operations", 
            "Wallet Services",
            "Card Management",
            "External Accounts",
            "Virtual Accounts",
            "Batch Settlement",
            "Liquidation Address",
            "Prefunded Accounts",
            "KYC Links",
            "Developer Tools",
            "Webhooks",
            "FX Rates",
            "Transaction Status"
          ].map((module) => (
            <div key={module} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/50 transition-colors">
              <p className="text-slate-200 font-medium">{module}</p>
            </div>
          ))}
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
