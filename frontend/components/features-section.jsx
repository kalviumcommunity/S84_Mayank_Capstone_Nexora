import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, MapPin, Calendar, BarChart3, Bell, Users } from "lucide-react";
const features = [
    {
        icon: CheckSquare,
        title: "Task Management",
        description: "Organize assignments, projects, and deadlines with smart task tracking. Set priorities and never miss a due date.",
    },
    {
        icon: MapPin,
        title: "Campus Resources",
        description: "Discover libraries, study spaces, dining halls, and campus services all in one place with real-time availability.",
    },
    {
        icon: Calendar,
        title: "Events Calendar",
        description: "Stay updated with campus events, club meetings, and academic deadlines. Sync with your personal calendar.",
    },
    {
        icon: BarChart3,
        title: "Progress Tracking",
        description: "Visualize your productivity with insights and analytics. Track study hours and completed tasks over time.",
    },
    {
        icon: Bell,
        title: "Smart Reminders",
        description: "Get intelligent notifications for upcoming deadlines, events, and tasks. Never forget what matters.",
    },
    {
        icon: Users,
        title: "Study Groups",
        description: "Connect with classmates, form study groups, and collaborate on projects. Share resources and notes easily.",
    },
];
export function FeaturesSection() {
    return (<section id="features" className="py-20 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Powerful features designed specifically for students to boost productivity and stay organized throughout the semester.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (<Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>))}
        </div>
      </div>
    </section>);
}
