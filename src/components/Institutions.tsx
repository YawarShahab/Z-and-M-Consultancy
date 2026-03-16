"use client";

import Link from "next/link";
import { institutions } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function Institutions() {
  return (
    <section id="institutions" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Partner Institutions
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              We collaborate with world-class universities across the globe to bring you the best education opportunities.
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-1 text-indigo-600 border-indigo-200 dark:text-indigo-400 dark:border-indigo-800">
            500+ Institutions Worldwide
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutions.map((inst, index) => (
              <Link key={index} href={`/institutions/${inst.id}`}>
                <Card className="group cursor-pointer border-zinc-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      <Image
                        src={inst.logo}
                        alt={inst.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm font-medium">{inst.description}</p>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">{inst.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{inst.country}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
