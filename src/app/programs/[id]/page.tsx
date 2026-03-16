import { getLargeStudyData } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Banknote, Calendar, GraduationCap, Building2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allPrograms = getLargeStudyData(39500);
  const program = allPrograms.find((p) => p.id === parseInt(id));

  if (!program) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/programs" 
            className="inline-flex items-center text-zinc-500 hover:text-indigo-600 mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Image and Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <Image
                  src={program.image}
                  alt={program.course_title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-6 right-6">
                  <Badge className="bg-white/95 text-zinc-900 hover:bg-white px-4 py-1 text-sm font-medium dark:bg-zinc-900/95 dark:text-zinc-50">
                    {program.study_level}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{program.country}</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl mb-6">
                  {program.course_title}
                </h1>
                
                <div className="flex flex-wrap gap-6 items-center text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-zinc-400" />
                    <span className="font-medium">{program.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-zinc-400" />
                    <span>{program.duration}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">About the Program</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  This {program.study_level} program in {program.course_title} at {program.university} is designed to provide students with a comprehensive understanding of the field. Students will benefit from world-class facilities and expert faculty in {program.country}.
                </p>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  The curriculum is structured to blend theoretical knowledge with practical application, ensuring graduates are well-prepared for their careers.
                </p>
              </div>
            </div>

            {/* Right Column: Quick Stats & CTA */}
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 sticky top-32">
                <h3 className="text-xl font-bold mb-6">Program Highlights</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shrink-0">
                      <GraduationCap className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Study Level</p>
                      <p className="font-bold">{program.study_level}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shrink-0">
                      <Clock className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Duration</p>
                      <p className="font-bold">{program.duration}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shrink-0">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Intake</p>
                      <p className="font-bold">{program.intake_months?.join(", ") || "Contact for info"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold">
                    Apply Now
                  </Button>
                </div>

                <p className="text-center text-xs text-zinc-500 mt-6">
                  Expert guidance available for application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
