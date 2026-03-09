"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Calendar, Clock, TrendingUp, Plus, ArrowRight, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

const upcomingTasks = [
    { id: 1, title: "Research Paper - Psychology 101", dueDate: "Tomorrow", priority: "high", course: "PSY 101" },
    { id: 2, title: "Group Project - Marketing", dueDate: "In 3 days", priority: "medium", course: "MKT 201" },
    { id: 3, title: "Lab Report - Chemistry", dueDate: "In 5 days", priority: "low", course: "CHM 102" },
];
const upcomingEvents = [
    { id: 1, title: "Career Fair", date: "Jan 24", time: "10:00 AM", location: "Student Center" },
    { id: 2, title: "Study Group - Statistics", date: "Jan 26", time: "2:00 PM", location: "Library Room 201" },
    { id: 3, title: "Club Meeting", date: "Jan 27", time: "5:00 PM", location: "Union Building" },
];
const todaySchedule = [
    { time: "9:00 AM", title: "Economics 201", type: "class" },
    { time: "11:00 AM", title: "Statistics Lab", type: "lab" },
    { time: "2:00 PM", title: "Study Session", type: "study" },
    { time: "4:00 PM", title: "Office Hours - Prof. Smith", type: "meeting" },
];
export default function DashboardPage() {
    const { user, loading } = useUser();

    return (<div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {loading ? "..." : (user?.displayName?.split(' ')[0] || "Student")}</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your academic life today.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tasks">
            <Plus className="mr-2 h-4 w-4"/>
            Add Task
          </Link>
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Due This Week</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 completed, 5 remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks due soon that need your attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/tasks" className="gap-1">
                View all
                <ArrowRight className="h-4 w-4"/>
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (<div key={task.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={`h-2 w-2 mt-2 rounded-full ${task.priority === "high" ? "bg-destructive" :
                task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}/>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{task.course}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <CheckSquare className="h-4 w-4"/>
                </Button>
              </div>))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>Your classes and activities for today</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((item, index) => (<div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${index === 0 ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-secondary/50"} transition-colors`}>
                <span className="text-sm text-muted-foreground min-w-[72px]">{item.time}</span>
                <div className="flex items-center gap-2">
                  {item.type === "class" && <BookOpen className="h-4 w-4 text-primary"/>}
                  {item.type === "lab" && <BookOpen className="h-4 w-4 text-chart-2"/>}
                  {item.type === "study" && <Users className="h-4 w-4 text-chart-3"/>}
                  {item.type === "meeting" && <Calendar className="h-4 w-4 text-chart-4"/>}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Campus events and activities you might be interested in</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/events" className="gap-1">
                View all
                <ArrowRight className="h-4 w-4"/>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingEvents.map((event) => (<div key={event.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center rounded-lg bg-primary/10 px-3 py-2 min-w-[56px]">
                    <span className="text-xs text-primary font-medium">{event.date.split(" ")[0]}</span>
                    <span className="text-xl font-bold text-primary">{event.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
