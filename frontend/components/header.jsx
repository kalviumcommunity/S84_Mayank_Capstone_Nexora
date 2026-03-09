"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (<header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Nexora</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#resources" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Resources
          </Link>
          <Link href="#events" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Events
          </Link>
          <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (<div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="#resources" className="text-sm text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </Link>
            <Link href="#events" className="text-sm text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Events
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>)}
    </header>);
}
