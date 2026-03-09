"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
const events = [
    {
        id: 1,
        title: "Spring Career Fair",
        description: "Meet with 50+ employers from various industries. Bring your resume and dress professionally.",
        date: "2026-01-24",
        time: "10:00 AM - 4:00 PM",
        location: "Student Center Ballroom",
        category: "career",
        attendees: 250,
        saved: true,
    },
    {
        id: 2,
        title: "Study Group - Statistics 201",
        description: "Weekly study session for midterm preparation. All students welcome.",
        date: "2026-01-25",
        time: "2:00 PM - 4:00 PM",
        location: "Library Room 201",
        category: "academic",
        attendees: 12,
        saved: false,
    },
    {
        id: 3,
        title: "Student Government Meeting",
        description: "Monthly meeting to discuss campus initiatives and student concerns.",
        date: "2026-01-26",
        time: "5:00 PM - 6:30 PM",
        location: "Union Building, Room 301",
        category: "club",
        attendees: 45,
        saved: false,
    },
    {
        id: 4,
        title: "Tech Talk: AI in Healthcare",
        description: "Guest speaker from MedTech Inc. discussing the future of AI in medical applications.",
        date: "2026-01-27",
        time: "6:00 PM - 7:30 PM",
        location: "Engineering Auditorium",
        category: "workshop",
        attendees: 120,
        saved: true,
    },
    {
        id: 5,
        title: "Intramural Basketball Finals",
        description: "Championship game between the Wildcats and the Thunder. Come support your team!",
        date: "2026-01-28",
        time: "7:00 PM - 9:00 PM",
        location: "Recreation Center Gym",
        category: "sports",
        attendees: 200,
        saved: false,
    },
    {
        id: 6,
        title: "Movie Night: Oscar Nominees",
        description: "Free screening of this year's best picture nominees. Popcorn provided!",
        date: "2026-01-29",
        time: "8:00 PM - 11:00 PM",
        location: "Campus Theater",
        category: "social",
        attendees: 80,
        saved: false,
    },
    {
        id: 7,
        title: "Research Symposium",
        description: "Undergraduate students present their research projects. Great networking opportunity.",
        date: "2026-01-30",
        time: "9:00 AM - 3:00 PM",
        location: "Science Building",
        category: "academic",
        attendees: 150,
        saved: true,
    },
    {
        id: 8,
        title: "Yoga & Meditation Session",
        description: "De-stress with a relaxing yoga session. All skill levels welcome. Mats provided.",
        date: "2026-01-31",
        time: "6:00 AM - 7:00 AM",
        location: "Recreation Center Studio",
        category: "wellness",
        attendees: 25,
        saved: false,
    },
];
const categories = [
    { value: "all", label: "All Events" },
    { value: "academic", label: "Academic" },
    { value: "career", label: "Career" },
    { value: "club", label: "Clubs" },
    { value: "sports", label: "Sports" },
    { value: "social", label: "Social" },
    { value: "wellness", label: "Wellness" },
    { value: "workshop", label: "Workshops" },
];
const getCategoryColor = (category) => {
    switch (category) {
        case "academic":
            return "bg-blue-500/10 text-blue-500";
        case "career":
            return "bg-green-500/10 text-green-500";
        case "club":
            return "bg-purple-500/10 text-purple-500";
        case "sports":
            return "bg-orange-500/10 text-orange-500";
        case "social":
            return "bg-pink-500/10 text-pink-500";
        case "wellness":
            return "bg-teal-500/10 text-teal-500";
        case "workshop":
            return "bg-yellow-500/10 text-yellow-500";
        default:
            return "bg-secondary text-secondary-foreground";
    }
};
export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [savedEvents, setSavedEvents] = useState(events.filter(e => e.saved).map(e => e.id));
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // January 2026
    const filteredEvents = events.filter((event) => {
        return activeCategory === "all" || event.category === activeCategory;
    });
    const toggleSaveEvent = (eventId) => {
        setSavedEvents(prev => prev.includes(eventId)
            ? prev.filter(id => id !== eventId)
            : [...prev, eventId]);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
    };
    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const days = [];
        for (let i = 0; i < startingDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };
    const hasEventOnDay = (day) => {
        if (!day)
            return false;
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.some(event => event.date === dateStr);
    };
    const monthDays = getMonthDays(currentMonth);
    return (<div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">Discover campus events and activities</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                  <ChevronLeft className="h-4 w-4"/>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                  <ChevronRight className="h-4 w-4"/>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (<div key={day} className="py-2 text-muted-foreground font-medium">
                  {day}
                </div>))}
              {monthDays.map((day, index) => (<div key={index} className={`relative py-2 rounded-lg ${day ? "hover:bg-secondary cursor-pointer" : ""} ${day === 21 ? "bg-primary/10 text-primary font-medium" : ""}`}>
                  {day}
                  {hasEventOnDay(day) && (<div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"/>)}
                </div>))}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
              {categories.map((category) => (<TabsTrigger key={category.value} value={category.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {category.label}
                </TabsTrigger>))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-4 space-y-4">
              {filteredEvents.length === 0 ? (<Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No events found in this category.
                  </CardContent>
                </Card>) : (filteredEvents.map((event) => (<Card key={event.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Date box */}
                        <div className="flex sm:flex-col items-center gap-2 sm:gap-0 sm:min-w-[64px] rounded-lg bg-primary/10 px-4 py-3 text-center">
                          <span className="text-xs text-primary font-medium uppercase">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>

                        {/* Event details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge variant="secondary" className={`mt-1 ${getCategoryColor(event.category)}`}>
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleSaveEvent(event.id)} className={savedEvents.includes(event.id) ? "text-primary" : "text-muted-foreground"}>
                              {savedEvents.includes(event.id) ? (<BookmarkCheck className="h-5 w-5"/>) : (<Bookmark className="h-5 w-5"/>)}
                            </Button>
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>

                          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4"/>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4"/>
                              <span>{event.location}</span>
                            </div>
                            {event.attendees && (<div className="flex items-center gap-1">
                                <Users className="h-4 w-4"/>
                                <span>{event.attendees} attending</span>
                              </div>)}
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button size="sm">RSVP</Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="mr-2 h-4 w-4"/>
                              Add to Calendar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>);
}
