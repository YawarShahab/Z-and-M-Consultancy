"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { institutions } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, Globe } from "lucide-react";

export default function InstitutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-indigo-600 border-indigo-200 dark:text-indigo-400 dark:border-indigo-800">
              Our Partners
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Partner Institutions
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Discover world-class universities and colleges we partner with across the globe. From Ivy League research centers to innovative technical institutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institutions.map((inst, index) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/institutions/${inst.id}`}>
                  <Card className="group h-full cursor-pointer border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      <Image
                        src={inst.logo}
                        alt={inst.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-3">
                        <MapPin className="h-4 w-4" />
                        {inst.country}
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {inst.name}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-6">
                        {inst.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {inst.stats.students} Students
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          Est. {inst.stats.founded}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
