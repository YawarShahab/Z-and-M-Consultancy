"use client";

import { motion } from "framer-motion";
import { studyData } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Banknote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Explore Programs
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Find the perfect course tailored to your academic goals and career aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyData.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.course_title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-zinc-900 hover:bg-white dark:bg-zinc-950/90 dark:text-zinc-50">
                      {program.study_level}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{program.country}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight line-clamp-2">{program.course_title}</h3>
                  <p className="text-sm text-zinc-500 mt-2">{program.university}</p>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {program.duration}</span>
                  </div>
                </CardContent>
                  <CardFooter className="p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                    <Link href={`/programs/${index + 1}`} className="w-full">
                      <Button variant="ghost" className="w-full justify-between hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400">
                        View Details <span>&rarr;</span>
                      </Button>
                    </Link>
                  </CardFooter>

              </Card>
            </motion.div>
          ))}
        </div>

          <div className="mt-12 text-center">
            <Link href="/programs">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8">
                See All Programs
              </Button>
            </Link>
          </div>
      </div>
    </section>
  );
}
