import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export function CTASection() {
    return (<section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-16 md:py-24">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"/>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"/>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Ready to boost your productivity?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Join thousands of students who are already using Nexora to organize their academic life and achieve their goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup" className="gap-2">
                  Get started for free
                  <ArrowRight className="h-4 w-4"/>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="#about">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
