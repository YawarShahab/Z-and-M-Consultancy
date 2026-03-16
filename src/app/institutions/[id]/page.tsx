"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { institutions, getLargeStudyData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, Globe, Award, BookOpen, ChevronRight } from "lucide-react";

export default function InstitutionDetailPage() {
  const { id } = useParams();
  const institution = institutions.find(inst => inst.id === id);
  
  // Get some related programs
  const programs = getLargeStudyData(4).filter(p => p.university === institution?.name);

  if (!institution) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Institution Not Found</h1>
            <Link href="/institutions">
              <Button>Back to Institutions</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none dark:bg-indigo-900/30 dark:text-indigo-400">
                {institution.country}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                {institution.name}
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                {institution.longDescription}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-zinc-500">Students</span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{institution.stats.students}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-zinc-500">Founded</span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{institution.stats.founded}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-zinc-500">Global Ranking</span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Top 1%</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Apply Now</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={institution.logo}
                alt={institution.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Award, title: "Excellence", desc: institution.stats.ranking },
              { icon: GraduationCap, title: "Programs", desc: "Over 200+ undergraduate and graduate programs available." },
              { icon: Globe, title: "Global Community", desc: "A diverse community with students from over 100 countries." }
            ].map((item, i) => (
              <Card key={i} className="border-zinc-100 dark:border-zinc-800">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Programs Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Programs</h2>
              <Link href="/programs" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <Link key={program.id} href={`/programs/${program.id}`}>
                    <Card className="hover:border-indigo-500 transition-colors cursor-pointer">
                      <CardContent className="p-6 flex gap-6">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={program.image} alt={program.course_title} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-1 line-clamp-1">{program.course_title}</h4>
                          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
                            <BookOpen className="h-3 w-3" />
                            {program.study_level}
                          </div>
                            <div className="flex items-center gap-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                              <span>{program.duration}</span>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <p className="text-zinc-500 italic">More programs coming soon...</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
