import React from "react";
import Link from "next/link";
export default function AuthLayout({ children, }) {
    return (<div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between bg-secondary/30 p-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Nexora</span>
        </Link>

        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              &ldquo;Nexora has completely transformed how I manage my academic life. 
              I never miss a deadline and always know what&apos;s happening on campus.&rdquo;
            </p>
            <footer className="text-sm">
              <span className="font-medium text-foreground">Sarah Chen</span>
              <span className="text-muted-foreground"> - Computer Science, Junior</span>
            </footer>
          </blockquote>
        </div>

        <p className="text-sm text-muted-foreground">
          Trusted by students at 100+ universities
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Nexora</span>
          </Link>
        </div>
        {children}
      </div>
    </div>);
}
