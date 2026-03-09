"use client";
import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Clock, ExternalLink, BookOpen, Coffee, Dumbbell, Stethoscope, Computer, Users, Phone, Mail } from "lucide-react";
const resources = [
    {
        id: 1,
        name: "Main Library",
        category: "study",
        description: "5 floors of study spaces, computer labs, and research resources",
        location: "Central Campus, Building A",
        hours: "7:00 AM - 12:00 AM",
        status: "open",
        phone: "(555) 123-4567",
        email: "library@university.edu",
        website: "https://library.university.edu",
        icon: BookOpen,
    },
    {
        id: 2,
        name: "Student Study Hall",
        category: "study",
        description: "24/7 quiet study space with individual carrels and group rooms",
        location: "East Campus, Building C",
        hours: "24 hours",
        status: "open",
        icon: BookOpen,
    },
    {
        id: 3,
        name: "Computer Lab - Engineering",
        category: "technology",
        description: "High-performance computers with specialized software for engineering students",
        location: "Engineering Building, Room 201",
        hours: "8:00 AM - 10:00 PM",
        status: "busy",
        phone: "(555) 123-4570",
        icon: Computer,
    },
    {
        id: 4,
        name: "Campus Cafe",
        category: "dining",
        description: "Coffee, snacks, and light meals. Popular student hangout spot",
        location: "Student Union, 1st Floor",
        hours: "7:00 AM - 8:00 PM",
        status: "busy",
        icon: Coffee,
    },
    {
        id: 5,
        name: "Dining Hall",
        category: "dining",
        description: "Main dining facility with various food options and meal plans",
        location: "West Campus",
        hours: "7:00 AM - 9:00 PM",
        status: "open",
        icon: Coffee,
    },
    {
        id: 6,
        name: "Recreation Center",
        category: "wellness",
        description: "Gym, pool, basketball courts, and fitness classes",
        location: "Athletics Complex",
        hours: "6:00 AM - 11:00 PM",
        status: "open",
        phone: "(555) 123-4575",
        website: "https://rec.university.edu",
        icon: Dumbbell,
    },
    {
        id: 7,
        name: "Health Center",
        category: "wellness",
        description: "Medical services, counseling, and wellness programs for students",
        location: "North Campus, Health Building",
        hours: "8:00 AM - 5:00 PM",
        status: "open",
        phone: "(555) 123-4580",
        email: "health@university.edu",
        icon: Stethoscope,
    },
    {
        id: 8,
        name: "Career Services",
        category: "services",
        description: "Resume help, interview prep, job fairs, and career counseling",
        location: "Student Services Building, 3rd Floor",
        hours: "9:00 AM - 5:00 PM",
        status: "open",
        phone: "(555) 123-4585",
        email: "careers@university.edu",
        icon: Users,
    },
    {
        id: 9,
        name: "IT Help Desk",
        category: "technology",
        description: "Technical support for campus Wi-Fi, software, and devices",
        location: "Library, 1st Floor",
        hours: "8:00 AM - 8:00 PM",
        status: "open",
        phone: "(555) 123-4590",
        email: "helpdesk@university.edu",
        icon: Computer,
    },
    {
        id: 10,
        name: "Tutoring Center",
        category: "services",
        description: "Free peer tutoring for most subjects and writing assistance",
        location: "Academic Building, Room 105",
        hours: "9:00 AM - 9:00 PM",
        status: "closed",
        phone: "(555) 123-4595",
        email: "tutoring@university.edu",
        icon: Users,
    },
];
const categories = [
    { value: "all", label: "All Resources" },
    { value: "study", label: "Study Spaces" },
    { value: "dining", label: "Dining" },
    { value: "wellness", label: "Wellness" },
    { value: "technology", label: "Technology" },
    { value: "services", label: "Services" },
];
function Loading() {
    return null;
}
export default function ResourcesPage() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
    const [activeCategory, setActiveCategory] = useState(searchParams?.get("category") || "all");
    const filteredResources = resources.filter((resource) => {
        const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    const getStatusColor = (status) => {
        switch (status) {
            case "open":
                return "bg-green-500/10 text-green-500";
            case "busy":
                return "bg-yellow-500/10 text-yellow-500";
            case "closed":
                return "bg-red-500/10 text-red-500";
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case "open":
                return "Open";
            case "busy":
                return "Busy";
            case "closed":
                return "Closed";
        }
    };
    return (<Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campus Resources</h1>
          <p className="text-muted-foreground">Find study spaces, dining options, and campus services</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <Input placeholder="Search resources..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>

        {/* Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((category) => (<TabsTrigger key={category.value} value={category.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {category.label}
              </TabsTrigger>))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredResources.length === 0 ? (<Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No resources found. Try adjusting your search or filters.
                </CardContent>
              </Card>) : (<div className="grid gap-4 md:grid-cols-2">
                {filteredResources.map((resource) => (<Card key={resource.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <resource.icon className="h-5 w-5 text-primary"/>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{resource.name}</CardTitle>
                            <Badge variant="secondary" className={getStatusColor(resource.status)}>
                              {getStatusLabel(resource.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-foreground/80">
                        {resource.description}
                      </CardDescription>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0"/>
                          <span>{resource.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0"/>
                          <span>{resource.hours}</span>
                        </div>
                        {resource.phone && (<div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 shrink-0"/>
                            <a href={`tel:${resource.phone}`} className="hover:text-primary">
                              {resource.phone}
                            </a>
                          </div>)}
                        {resource.email && (<div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4 shrink-0"/>
                            <a href={`mailto:${resource.email}`} className="hover:text-primary">
                              {resource.email}
                            </a>
                          </div>)}
                      </div>

                      {resource.website && (<Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                          <a href={resource.website} target="_blank" rel="noopener noreferrer">
                            Visit Website
                            <ExternalLink className="ml-2 h-3 w-3"/>
                          </a>
                        </Button>)}
                    </CardContent>
                  </Card>))}
              </div>)}
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>);
}
