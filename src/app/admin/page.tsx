"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  Settings, 
  CheckCircle, 
  Bell, 
  User, 
  Download,
  Search,
  Filter,
  Calendar,
  Heart,
  Camera,
  Zap,
  DoorOpen,
  Key,
  Bell as BellIcon,
  Phone,
  Monitor,
  Battery,
  LogOut,
  Plus,
  BarChart3,
  TrendingUp,
  Users
} from "lucide-react";

interface ServiceRequest {
  id: string;
  client: {
    name: string;
    email: string;
    avatar: string;
  };
  serviceType: string;
  location: string;
  requestDate: string;
  status: "Pending" | "Approved" | "In Progress" | "Completed";
}

export default function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          router.push('/auth');
        }
      } catch (error) {
        router.push('/auth');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mock data for service requests
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: "1",
      client: {
        name: "John Doe",
        email: "john.doe@company.com",
        avatar: "JD"
      },
      serviceType: "CCTV Installation",
      location: "Main Office Building",
      requestDate: "Dec 13, 2024",
      status: "Pending"
    },
    {
      id: "2",
      client: {
        name: "Sarah Miller",
        email: "sarah.miller@techcorp.com",
        avatar: "SM"
      },
      serviceType: "Gate Automation",
      location: "Warehouse Entrance",
      requestDate: "Dec 10, 2024",
      status: "Approved"
    },
    {
      id: "3",
      client: {
        name: "Michael Johnson",
        email: "m.johnson@securetech.com",
        avatar: "MJ"
      },
      serviceType: "Electric Fence",
      location: "Perimeter Area",
      requestDate: "Dec 12, 2024",
      status: "Pending"
    },
    {
      id: "4",
      client: {
        name: "Emily Wilson",
        email: "emily.wilson@innovate.com",
        avatar: "EW"
      },
      serviceType: "Access Control Systems",
      location: "Server Room",
      requestDate: "Dec 8, 2024",
      status: "Completed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "CCTV Installation": return Camera;
      case "Gate Automation": return DoorOpen;
      case "Electric Fence": return Zap;
      case "Access Control Systems": return Key;
      case "Video Door Bell": return BellIcon;
      case "PABX Intercom": return Phone;
      case "Website Design": return Monitor;
      case "Inverter Batteries": return Battery;
      default: return Settings;
    }
  };

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus as any } : req
    ));
  };

  const filteredRequests = requests.filter(request => {
    const matchesFilter = selectedFilter === "all" || request.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = request.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFilterCount = (status: string) => {
    if (status === "all") return requests.length;
    return requests.filter(req => req.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Yural Tech</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`font-medium transition-colors ${
                  activeTab === "dashboard" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab("services")}
                className={`font-medium transition-colors ${
                  activeTab === "services" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => setActiveTab("requests")}
                className={`font-medium transition-colors ${
                  activeTab === "requests" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Requests
              </button>
              <button 
                onClick={() => setActiveTab("reports")}
                className={`font-medium transition-colors ${
                  activeTab === "reports" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Reports
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600">• Admin</span>
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </Button>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="text-gray-600 hover:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Admin Dashboard"}
                {activeTab === "services" && "Services Management"}
                {activeTab === "requests" && "Service Requests"}
                {activeTab === "reports" && "Reports & Analytics"}
              </h1>
              <p className="text-gray-600">
                {activeTab === "dashboard" && "Manage service requests and monitor system performance."}
                {activeTab === "services" && "Configure and manage available services."}
                {activeTab === "requests" && "Review and manage client service requests."}
                {activeTab === "reports" && "View analytics and generate reports."}
              </p>
            </div>
            <div className="flex space-x-3">
              {activeTab === "dashboard" && (
                <>
                  <Button variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 border border-gray-300">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </>
              )}
              {activeTab === "services" && (
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              )}
              {activeTab === "requests" && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Requests
                </Button>
              )}
              {activeTab === "reports" && (
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard View - Original with all features */}
        {activeTab === "dashboard" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-gray-600">Total Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">7</p>
                      <p className="text-gray-600">Pending Approval</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">9</p>
                      <p className="text-gray-600">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-gray-600">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Requests Management - Original */}
            <Card>
              <CardHeader>
                <CardTitle>Service Requests Management</CardTitle>
              </CardHeader>

              <CardContent>
                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-gray-700">Quick filters:</span>
                  {[
                    { key: "all", label: "All" },
                    { key: "today", label: "Today" },
                    { key: "pending", label: "Pending" },
                    { key: "in progress", label: "In Progress" },
                    { key: "completed", label: "Completed" }
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={selectedFilter === filter.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.key)}
                      className={
                        selectedFilter === filter.key
                          ? filter.key === "pending"
                            ? "bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500"
                            : filter.key === "in progress"
                            ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                            : filter.key === "completed"
                            ? "bg-green-500 text-white hover:bg-green-600 border-green-500"
                            : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                      }
                    >
                      {filter.label} ({getFilterCount(filter.key)})
                    </Button>
                  ))}
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">
                    <Calendar className="mr-2 h-4 w-4" />
                    Date Range
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">
                    <Filter className="mr-2 h-4 w-4" />
                    Status
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">
                    <Heart className="mr-2 h-4 w-4" />
                    Service Type
                  </Button>
                </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                              {request.client.avatar}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{request.client.name}</div>
                              <div className="text-sm text-gray-500">{request.client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {(() => {
                              const IconComponent = getServiceIcon(request.serviceType);
                              return <IconComponent className="mr-2 h-4 w-4" />;
                            })()}
                            <span className="text-sm text-gray-900">{request.serviceType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.requestDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === "Pending" ? (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(request.id, "Approved")}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(request.id, "Rejected")}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Reject
                              </Button>
                            </div>
                          ) : request.status === "Approved" ? (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(request.id, "In Progress")}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              View Details
                            </Button>
                          ) : request.status === "Completed" ? (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              View Report
                            </Button>
                          ) : (
                            <Button size="sm" variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800">
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    Showing 1 to 4 of 24 entries
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">←</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">1</Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">2</Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">3</Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800">→</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Services View - Advanced Management */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {/* Service Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Services</p>
                      <p className="text-2xl font-bold text-blue-800">12</p>
                    </div>
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Services</p>
                      <p className="text-2xl font-bold text-green-800">10</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Popular Service</p>
                      <p className="text-lg font-bold text-purple-800">CCTV</p>
                    </div>
                    <Camera className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Service Types</p>
                      <p className="text-2xl font-bold text-orange-800">6</p>
                    </div>
                    <Settings className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Categories with Advanced Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "CCTV Camera Systems",
                  description: "Professional surveillance system installation and monitoring",
                  icon: Camera,
                  status: "Active",
                  requests: 12,
                  rating: 4.8,
                  features: ["4K Resolution", "Night Vision", "Remote Access", "Cloud Storage"]
                },
                {
                  title: "Electric Fence",
                  description: "Perimeter security with electric fence installation",
                  icon: Zap,
                  status: "Active",
                  requests: 8,
                  rating: 4.6,
                  features: ["High Voltage", "Weather Resistant", "Alarm System", "Maintenance Free"]
                },
                {
                  title: "Gate Automation",
                  description: "Automated gate systems for enhanced security and convenience",
                  icon: DoorOpen,
                  status: "Active",
                  requests: 15,
                  rating: 4.9,
                  features: ["Remote Control", "Safety Sensors", "Battery Backup", "Smart Integration"]
                },
                {
                  title: "Video Door Bell",
                  description: "Smart doorbell systems with video monitoring",
                  icon: BellIcon,
                  status: "Active",
                  requests: 6,
                  rating: 4.7,
                  features: ["HD Video", "Two-Way Audio", "Motion Detection", "Mobile App"]
                },
                {
                  title: "PABX Intercom",
                  description: "Professional intercom and communication systems",
                  icon: Phone,
                  status: "Active",
                  requests: 4,
                  rating: 4.5,
                  features: ["Multi-Line", "Call Recording", "Voicemail", "Conference Calls"]
                },
                {
                  title: "Website Design",
                  description: "Custom website design and development services",
                  icon: Monitor,
                  status: "Active",
                  requests: 9,
                  rating: 4.8,
                  features: ["Responsive Design", "SEO Optimized", "CMS Integration", "Analytics"]
                }
              ].map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {service.status}
                          </span>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-sm font-medium ml-1">{service.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Requests:</span>
                          <span className="font-medium">{service.requests}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium text-yellow-600">★ {service.rating}</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            Configure
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Service Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Service Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Top Performing Services</h4>
                    <div className="space-y-3">
                      {[
                        { name: "CCTV Camera Systems", percentage: 85, requests: 12 },
                        { name: "Gate Automation", percentage: 78, requests: 15 },
                        { name: "Website Design", percentage: 65, requests: 9 },
                        { name: "Electric Fence", percentage: 58, requests: 8 }
                      ].map((service, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{service.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${service.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8">{service.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Service Popularity</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Gate Automation", requests: 15, color: "bg-green-500" },
                        { name: "CCTV Systems", requests: 12, color: "bg-blue-500" },
                        { name: "Website Design", requests: 9, color: "bg-purple-500" },
                        { name: "Electric Fence", requests: 8, color: "bg-orange-500" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm text-gray-600">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">{item.requests} requests</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports View - Advanced Analytics */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Completed Projects</p>
                      <p className="text-2xl font-bold text-green-800">89</p>
                      <p className="text-xs text-green-700 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12 from last month
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Active Projects</p>
                      <p className="text-2xl font-bold text-blue-800">24</p>
                      <p className="text-xs text-blue-700 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +3 this week
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Client Satisfaction</p>
                      <p className="text-2xl font-bold text-purple-800">4.8/5</p>
                      <p className="text-xs text-purple-700 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +0.2 from last quarter
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Avg. Response Time</p>
                      <p className="text-2xl font-bold text-orange-800">2.4h</p>
                      <p className="text-xs text-orange-700 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        -0.5h improvement
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Project Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-800">Monthly Projects</span>
                      <span className="text-lg font-bold text-green-600">24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">Quarterly Projects</span>
                      <span className="text-lg font-bold text-blue-600">68</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">Annual Projects</span>
                      <span className="text-lg font-bold text-purple-600">89</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Project Growth</span>
                        <span>+15.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Client Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">Total Clients</span>
                      <span className="text-lg font-bold text-blue-600">156</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-800">Active Clients</span>
                      <span className="text-lg font-bold text-green-600">142</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">New This Month</span>
                      <span className="text-lg font-bold text-purple-600">12</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Client Retention</span>
                        <span>91%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Performance & Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Service Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "CCTV Systems", completion: 95, projects: 12 },
                      { name: "Gate Automation", completion: 88, projects: 15 },
                      { name: "Electric Fence", completion: 82, projects: 8 },
                      { name: "Website Design", completion: 78, projects: 9 }
                    ].map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-gray-600">{service.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${service.completion}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">Projects: {service.projects}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Monthly Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "January", requests: 18, completed: 15 },
                      { month: "February", requests: 24, completed: 20 },
                      { month: "March", requests: 31, completed: 28 },
                      { month: "April", requests: 28, completed: 25 },
                      { month: "May", requests: 35, completed: 32 }
                    ].map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{trend.month}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{trend.requests} requests</div>
                          <div className="text-xs text-gray-600">{trend.completed} completed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Advanced Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-medium">Performance Report</span>
                    <span className="text-xs opacity-90">Projects & Efficiency</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                    <Users className="h-6 w-6" />
                    <span className="font-medium">Client Report</span>
                    <span className="text-xs opacity-90">Satisfaction & Retention</span>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                    <Settings className="h-6 w-6" />
                    <span className="font-medium">Operations Report</span>
                    <span className="text-xs opacity-90">Performance & Efficiency</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Requests View - Quick Actions */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            {/* Quick Actions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">Urgent Requests</h3>
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                      <p className="text-sm text-yellow-700">Need immediate attention</p>
                    </div>
                    <Clock className="h-12 w-12 text-yellow-600" />
                  </div>
                  <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                    View Urgent
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Today's Schedule</h3>
                      <p className="text-2xl font-bold text-blue-600">5</p>
                      <p className="text-sm text-blue-700">Installations scheduled</p>
                    </div>
                    <Calendar className="h-12 w-12 text-blue-600" />
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    View Schedule
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Completed Today</h3>
                      <p className="text-2xl font-bold text-green-600">8</p>
                      <p className="text-sm text-green-700">Ready for billing</p>
                    </div>
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    Generate Bills
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New request submitted", client: "John Doe", service: "CCTV Installation", time: "2 minutes ago", type: "new" },
                    { action: "Request approved", client: "Sarah Miller", service: "Gate Automation", time: "15 minutes ago", type: "approved" },
                    { action: "Installation completed", client: "Mike Johnson", service: "Electric Fence", time: "1 hour ago", type: "completed" },
                    { action: "Payment received", client: "Emily Wilson", service: "Access Control", time: "2 hours ago", type: "payment" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'new' ? 'bg-blue-500' :
                        activity.type === 'approved' ? 'bg-green-500' :
                        activity.type === 'completed' ? 'bg-purple-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.client} - {activity.service}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

    </div>
  );
}
