import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, Calendar, TrendingUp } from "lucide-react";
export function BentoGrid() {
    return (<section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Built for student life
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A unified platform that adapts to your academic journey
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Task Overview Card - Large */}
          <Card className="md:col-span-2 lg:col-span-2 border-border/50 bg-card/50 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary"/>
                <span className="font-medium">Task Overview</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"/>
                    <span className="text-sm">Research Paper - Psychology 101</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Due Tomorrow</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-chart-2"/>
                    <span className="text-sm">Group Project - Marketing</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Due in 3 days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-chart-3"/>
                    <span className="text-sm">Lab Report - Chemistry</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Due in 5 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary"/>
                <span className="font-medium">This Week</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Tasks Completed</span>
                    <span className="text-sm font-medium">12/15</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '80%' }}/>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Study Hours</span>
                    <span className="text-sm font-medium">24h</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 rounded-full bg-chart-2" style={{ width: '60%' }}/>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Card */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary"/>
                <span className="font-medium">Upcoming Events</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center rounded-lg bg-primary/10 px-2 py-1 min-w-[48px]">
                    <span className="text-xs text-primary font-medium">JAN</span>
                    <span className="text-lg font-bold text-primary">24</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Career Fair</p>
                    <p className="text-xs text-muted-foreground">Student Center, 10 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center rounded-lg bg-chart-2/10 px-2 py-1 min-w-[48px]">
                    <span className="text-xs text-chart-2 font-medium">JAN</span>
                    <span className="text-lg font-bold text-chart-2">26</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Study Group</p>
                    <p className="text-xs text-muted-foreground">Library, 2 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Resources Card */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary"/>
                <span className="font-medium">Campus Resources</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <span className="text-sm">Main Library</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Open</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <span className="text-sm">Study Hall B</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Available</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <span className="text-sm">Campus Cafe</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500">Busy</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary"/>
                <span className="font-medium">Today&apos;s Schedule</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 border-l-2 border-primary">
                  <span className="text-xs text-muted-foreground min-w-[48px]">9:00 AM</span>
                  <span className="text-sm">Economics 201</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-xs text-muted-foreground min-w-[48px]">11:00 AM</span>
                  <span className="text-sm">Statistics Lab</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-xs text-muted-foreground min-w-[48px]">2:00 PM</span>
                  <span className="text-sm">Study Session</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>);
}
