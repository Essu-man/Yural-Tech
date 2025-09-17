"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Clock, 
  Settings, 
  CheckCircle, 
  Bell, 
  User, 
  Plus,
  Camera,
  Zap,
  DoorOpen,
  LogOut,
  Search,
  Eye,
  Edit,
  MapPin,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface ServiceRequest {
  id: string;
  requestId: string;
  service: string;
  location: string;
  date: string;
  status: "Pending" | "Approved" | "In Progress" | "Completed" | "Rejected";
  priority: "High" | "Medium" | "Low";
}

export default function ClientDashboard() {
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    service: "",
    location: "",
    description: ""
  });
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest First");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [servicesCurrentPage, setServicesCurrentPage] = useState(1);
  const [servicesItemsPerPage] = useState(6);
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
      } catch {
        router.push('/auth');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth');
    } catch {
      // Logout error - user will be redirected anyway
    }
  };

  // Mock data for requests
  const [requests] = useState<ServiceRequest[]>([
    {
      id: "1",
      requestId: "REQ-2024-001",
      service: "CCTV Installation",
      location: "Main Office Building, Floor 2",
      date: "Dec 13, 2024",
      status: "Pending",
      priority: "High"
    },
    {
      id: "2",
      requestId: "REQ-2024-002",
      service: "Gate Automation",
      location: "Warehouse Entrance Gate",
      date: "Dec 10, 2024",
      status: "In Progress",
      priority: "Medium"
    },
    {
      id: "3",
      requestId: "REQ-2024-003",
      service: "Access Control Systems",
      location: "Server Room Access Point",
      date: "Dec 8, 2024",
      status: "Completed",
      priority: "Low"
    },
    {
      id: "4",
      requestId: "REQ-2024-004",
      service: "Electric Fence",
      location: "Perimeter Security Zone A",
      date: "Dec 12, 2024",
      status: "Pending",
      priority: "High"
    },
    {
      id: "5",
      requestId: "REQ-2024-005",
      service: "CCTV Maintenance",
      location: "Parking Lot Cameras",
      date: "Dec 5, 2024",
      status: "Approved",
      priority: "Medium"
    }
  ]);

  const services = [
    {
      title: "CCTV Installation",
      description: "Professional surveillance system installation and configuration",
      icon: Camera
    },
    {
      title: "Gate Automation",
      description: "Automated gate systems for enhanced security and convenience",
      icon: DoorOpen
    },
    {
      title: "Electric Fence",
      description: "Perimeter security with electric fence installation",
      icon: Zap
    },
    {
      title: "PABX Intercom",
      description: "Professional phone and intercom systems for businesses",
      icon: Settings
    },
    {
      title: "Inverter Batteries",
      description: "Backup power solutions and battery systems",
      icon: Zap
    },
    {
      title: "Video Door Bell",
      description: "Smart video doorbell systems with remote monitoring",
      icon: Camera
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "CCTV Installation":
      case "CCTV Maintenance":
      case "Video Door Bell":
        return Camera;
      case "Gate Automation":
        return DoorOpen;
      case "Electric Fence":
      case "Inverter Batteries":
        return Zap;
      case "PABX Intercom":
        return Settings;
      default:
        return Settings;
    }
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map(req => req.id));
    }
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  // Pagination logic for recent requests
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = requests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Pagination logic for services
  const servicesTotalPages = Math.ceil(services.length / servicesItemsPerPage);
  const servicesStartIndex = (servicesCurrentPage - 1) * servicesItemsPerPage;
  const servicesEndIndex = servicesStartIndex + servicesItemsPerPage;
  const paginatedServices = services.slice(servicesStartIndex, servicesEndIndex);

  const handleServicesPageChange = (page: number) => {
    setServicesCurrentPage(page);
  };

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log("New request:", newRequest);
    setShowNewRequestModal(false);
    setNewRequest({ service: "", location: "", description: "" });
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
                className={`transition-colors ${
                  activeTab === "dashboard" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab("services")}
                className={`transition-colors ${
                  activeTab === "services" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => setActiveTab("requests")}
                className={`transition-colors ${
                  activeTab === "requests" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Requests
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">• Client</span>
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
        {activeTab === "dashboard" && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'User'}.</h1>
              <p className="text-gray-600">Manage your IT security service requests and track their progress.</p>
            </div>
          </>
        )}

        {activeTab === "requests" && (
          <>
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Requests</h1>
                  <p className="text-gray-600">Manage and track all your service requests in one place.</p>
                </div>
                <Link href="/client" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search requests by ID, service type, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Newest First">Newest First</SelectItem>
                      <SelectItem value="Oldest First">Oldest First</SelectItem>
                      <SelectItem value="Status">Status</SelectItem>
                      <SelectItem value="Priority">Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => setShowNewRequestModal(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-sm text-gray-600">Total Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">7</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Settings className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">9</p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Requests Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Requests</CardTitle>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRequests.length === requests.length}
                      onChange={handleSelectAll}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Select All</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4"></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Request ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Service Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Request Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => {
                        const ServiceIcon = getServiceIcon(request.service);
                        return (
                          <tr key={request.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedRequests.includes(request.id)}
                                onChange={() => handleSelectRequest(request.id)}
                              />
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900">{request.requestId}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <ServiceIcon className="w-4 h-4 mr-2 text-gray-600" />
                                {request.service}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{request.location}</td>
                            <td className="py-3 px-4 text-gray-600">{request.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {request.status === "Pending" && (
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  <MapPin className="w-4 h-4" />
                                </Button>
                                {request.status === "Completed" && (
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">Showing 1-5 of 24 requests.</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-blue-600 text-white">1</Button>
                    <Button variant="ghost" size="sm">2</Button>
                    <Button variant="ghost" size="sm">3</Button>
                    <span className="px-2">...</span>
                    <Button variant="ghost" size="sm">5</Button>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "services" && (
          <>
            {/* Services Tab Content */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h1>
              <p className="text-gray-600">Browse and request our comprehensive IT and security services.</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                          <ServiceIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setNewRequest({...newRequest, service: service.title});
                          setShowNewRequestModal(true);
                        }}
                      >
                        Request Service
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination for Services */}
            {servicesTotalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">
                  Showing {servicesStartIndex + 1}-{Math.min(servicesEndIndex, services.length)} of {services.length} services
                </p>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleServicesPageChange(servicesCurrentPage - 1)}
                    disabled={servicesCurrentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: servicesTotalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={servicesCurrentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleServicesPageChange(page)}
                      className={servicesCurrentPage === page ? "bg-blue-600 text-white" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleServicesPageChange(servicesCurrentPage + 1)}
                    disabled={servicesCurrentPage === servicesTotalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "dashboard" && (
          <>
            {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">8</p>
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
                  <p className="text-2xl font-bold text-gray-900">3</p>
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
                  <p className="text-2xl font-bold text-gray-900">2</p>
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
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Services */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Available Services</CardTitle>
                <Button
                  onClick={() => setShowNewRequestModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                          Request Service
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{request.service}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">📍 {request.location}</p>
                      <p className="text-sm text-gray-500">Requested {request.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination for Recent Requests */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, requests.length)} of {requests.length} requests
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-blue-600 text-white" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-700"
                  onClick={() => setActiveTab("requests")}
                >
                  View All Requests →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
          </>
        )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Service Request</h3>
            <form onSubmit={handleNewRequest}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <Select 
                  value={newRequest.service} 
                  onValueChange={(value) => setNewRequest({...newRequest, service: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service, index) => (
                      <SelectItem key={index} value={service.title}>{service.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe your requirements"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewRequestModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
