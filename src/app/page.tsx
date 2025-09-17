"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Zap, 
  DoorOpen, 
  Bell, 
  Phone, 
  Monitor, 
  Battery,
  Shield,
  ArrowRight,
  User,
  Settings
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Yural Tech</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <Button asChild className="ml-4 bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/auth">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional IT Security Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Yural Tech provides comprehensive IT security services including CCTV systems, 
            electric fences, gate automation, and more to protect your business and property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/auth">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
              <Link href="#services">
                View Services
              </Link>
            </Button>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CCTV Camera Systems",
                description: "Professional surveillance system installation and monitoring",
                icon: Camera,
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                title: "Electric Fence",
                description: "Perimeter security with electric fence installation",
                icon: Zap,
                gradient: "from-yellow-500 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50"
              },
              {
                title: "Gate Automation",
                description: "Automated gate systems for enhanced security and convenience",
                icon: DoorOpen,
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              },
              {
                title: "Video Door Bell",
                description: "Smart doorbell systems with video monitoring",
                icon: Bell,
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                title: "PABX Intercom",
                description: "Professional intercom and communication systems",
                icon: Phone,
                gradient: "from-indigo-500 to-blue-500",
                bgGradient: "from-indigo-50 to-blue-50"
              },
              {
                title: "Website Design",
                description: "Custom website design and development services",
                icon: Monitor,
                gradient: "from-teal-500 to-cyan-500",
                bgGradient: "from-teal-50 to-cyan-50"
              },
              {
                title: "Inverter Batteries",
                description: "Reliable power backup solutions for your business",
                icon: Battery,
                gradient: "from-red-500 to-rose-500",
                bgGradient: "from-red-50 to-rose-50"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className={`group relative overflow-hidden bg-gradient-to-br ${service.bgGradient} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base text-gray-700 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-20">
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
            <CardHeader className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                About Yural Tech
              </CardTitle>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto text-center relative z-10">
              <CardDescription className="text-xl mb-8 text-gray-700 leading-relaxed">
                Yural Tech is a leading provider of IT security solutions, dedicated to protecting 
                businesses and properties with cutting-edge technology and professional service.
              </CardDescription>
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                Our team of certified professionals ensures that every installation is completed 
                to the highest standards, providing you with peace of mind and reliable security 
                for your most valuable assets.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-20">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90" />
            <CardContent className="text-center relative z-10 py-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Secure Your Business?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Contact us today for a free consultation and quote. Our experts are ready to help you implement the perfect security solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-lg border-2 border-transparent hover:border-blue-200 transition-all duration-300">
                  <Link href="/client">
                    <User className="mr-2 h-5 w-5" />
                    Client Portal
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-lg">
                  <Link href="/admin">
                    <Settings className="mr-2 h-5 w-5" />
                    Admin Portal
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-2xl font-bold text-blue-400">Yural Tech</h3>
            </div>
            <p className="text-gray-300 mb-2">&copy; 2025 Yural Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
