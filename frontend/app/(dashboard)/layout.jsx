"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, CheckSquare, MapPin, Calendar, Settings, Menu, X, LogOut, User, Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
    { name: "Resources", href: "/dashboard/resources", icon: MapPin },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
export default function DashboardLayout({ children, }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading, logout } = useUser();

    // Show loading state or unauthenticated state cleaner
    if (loading) {
       return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
    }

    // Force login if no user
    if (!user && !loading) {
        // Optional: Redirect to login immediately if we want to enforce auth
        // router.push('/login'); 
        // For now, render with "Guest" but maybe add a banner?
    }

    return (<div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (<div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}/>)}

      {/* Sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Nexora</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <X className="h-5 w-5"/>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (<Link key={item.name} href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground")} onClick={() => setSidebarOpen(false)}>
                  <item.icon className="h-5 w-5"/>
                  {item.name}
                </Link>);
        })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.displayName} className="h-full w-full object-cover" />
                ) : (
                    <User className="h-5 w-5 text-primary"/>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{loading ? "Loading..." : user?.displayName || "Guest"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <Menu className="h-5 w-5"/>
          </button>
          
          {!user && (
             <div className="flex-1 text-center text-sm font-medium text-amber-500">
                You are viewing as Guest. <Link href="/login" className="underline">Log in</Link> to save data.
             </div>
          )}

          <div className="flex-1"/>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5"/>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary"/>
                </div>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4"/>
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4"/>
                  Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>);
}
