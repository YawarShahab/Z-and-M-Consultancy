import { destinations, getLargeStudyData } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, ChevronLeft, Globe2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CountryDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const country = destinations.find((d) => d.name.toLowerCase() === decodedName.toLowerCase());

  if (!country) {
    notFound();
  }

  const allPrograms = getLargeStudyData(39500);
  const countryPrograms = allPrograms.filter((p) => p.country.toLowerCase() === country.name.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full mb-12">
          <Image
            src={country.image}
            alt={country.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                {country.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
                {country.description}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-zinc-500 hover:text-indigo-600 mb-12 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
                  <Info className="h-6 w-6" />
                  <h2 className="text-3xl font-bold">General Information</h2>
                </div>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                  {country.generalInfo || "Information about this destination is being updated. Please check back soon for detailed insights into student life, cost of living, and academic opportunities."}
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Academic Excellence</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Access top-tier education with degrees that are recognized and valued by employers globally.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6">
                    <Globe2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Cultural Diversity</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Experience a rich tapestry of cultures and build a global network while you study.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Sidebar: Stats */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-32">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  Quick Stats
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Available Programs</p>
                    <p className="text-4xl font-extrabold text-indigo-600">{countryPrograms.length.toLocaleString()}+</p>
                    <p className="text-sm text-zinc-500 mt-1">Found across top institutions</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Destination Name</p>
                    <p className="text-xl font-bold">{country.name}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <Link href={`/programs?country=${encodeURIComponent(country.name)}`}>
                    <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg">
                      Explore All Programs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
