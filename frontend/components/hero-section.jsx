"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="absolute inset-0 -z-10 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Reimagining Student Productivity</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-[1.1] font-heading"
          >
            Master your campus life <br className="hidden md:block"/> with 
            <span className="text-primary relative inline-block mx-2">
               Nexora
               <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
               </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Stop juggling fragmented tools. Nexora unifies your assignments, events, and campus resources into one intelligent dashboard designed for high achievers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              <Link href="/signup" className="gap-2">
                Get Started
                <ArrowRight className="h-5 w-5"/>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-lg rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50">
              <Link href="#features">Explore Features</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80"
          >
             {[
               { icon: CheckCircle2, label: "Task Tracking" },
               { icon: TrendingUp, label: "GPA Analytics" },
               { icon: Calendar, label: "Event Discovery" },
               { icon: BookOpen, label: "Resource Hub" }
             ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                   <item.icon className="h-5 w-5 text-primary" />
                   <span className="font-semibold text-sm">{item.label}</span>
                </div>
             ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
