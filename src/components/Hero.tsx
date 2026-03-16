"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Mobile/tablet background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
          alt="Happy students graduating"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl dark:bg-indigo-900/10 hidden lg:block" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl dark:bg-blue-900/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800 lg:bg-indigo-50 lg:border-indigo-100 bg-white/20 border-white/30 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-white lg:text-indigo-600 dark:text-indigo-400">
                Study Abroad Specialists
              </span>
            </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white lg:text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.2]">
                Turn Your Study Abroad Dream into <span className="text-indigo-300 lg:text-indigo-600">Reality</span>
              </h1>
            <p className="text-base text-zinc-200 lg:text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Unlock global opportunities with expert guidance. We help you navigate the complex world of international education, from program selection to successful visa application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#contact">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 text-lg rounded-xl">
                  Book Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-zinc-200 dark:border-zinc-800">
                  View All Programs
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Happy students graduating"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -top-6 -right-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Active Students</p>
                <p className="text-lg font-bold">1,240+</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Programs Available</p>
                <p className="text-lg font-bold">35,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
