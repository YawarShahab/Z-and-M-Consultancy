"use client";

import React, { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getLargeStudyData } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Search, ChevronLeft, ChevronRight, SlidersHorizontal, X, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 12;

const ProgramCard = React.memo(({ program }: { program: ReturnType<typeof getLargeStudyData>[0] }) => (
  <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow duration-300">
    <div className="aspect-video relative overflow-hidden bg-zinc-100">
      <Image
        src={program.image}
        alt={program.course_title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
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
      {program.intake_months && (
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>Intake: {program.intake_months.join(", ")}</span>
        </div>
      )}
    </CardContent>
    <CardFooter className="p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800">
      <Link href={`/programs/${program.id}`} className="w-full">
        <Button variant="ghost" className="w-full justify-between hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400">
          View Details <span>&rarr;</span>
        </Button>
      </Link>
    </CardFooter>
  </Card>
));

ProgramCard.displayName = "ProgramCard";

function ProgramsContent() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get("country");

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  useEffect(() => {
    if (countryParam) {
      setSelectedCountry(countryParam);
    }
  }, [countryParam]);

  const allPrograms = useMemo(() => getLargeStudyData(39500), []);

  const countries = useMemo(() => ["all", ...new Set(allPrograms.map(p => p.country))], [allPrograms]);
  const universities = useMemo(() => ["all", ...new Set(allPrograms.map(p => p.university))], [allPrograms]);
  const studyLevels = useMemo(() => ["all", ...new Set(allPrograms.map(p => p.study_level))], [allPrograms]);
  const durations = ["all", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];

  const filteredPrograms = useMemo(() => {
    let filtered = allPrograms;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter((program) =>
        program.course_title.toLowerCase().includes(query) ||
        program.university.toLowerCase().includes(query) ||
        program.country.toLowerCase().includes(query)
      );
    }

    if (selectedCountry !== "all") {
      filtered = filtered.filter(p => p.country === selectedCountry);
    }

    if (selectedUniversity !== "all") {
      filtered = filtered.filter(p => p.university === selectedUniversity);
    }

    if (selectedStudyLevel !== "all") {
      filtered = filtered.filter(p => p.study_level === selectedStudyLevel);
    }

    if (selectedDuration !== "all") {
      const durationYears = parseInt(selectedDuration);
      filtered = filtered.filter(p => {
        const match = p.duration.match(/(\d+)/);
        if (match) {
          return parseInt(match[1]) === durationYears;
        }
        return false;
      });
    }

    return filtered;
  }, [debouncedSearchQuery, allPrograms, selectedCountry, selectedUniversity, selectedStudyLevel, selectedDuration]);

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const paginatedPrograms = useMemo(() => {
    return filteredPrograms.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredPrograms, currentPage]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCountry("all");
    setSelectedUniversity("all");
    setSelectedStudyLevel("all");
    setSelectedDuration("all");
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const activeFiltersCount = [
    selectedCountry !== "all",
    selectedUniversity !== "all",
    selectedStudyLevel !== "all",
    selectedDuration !== "all"
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl mb-4">
              {selectedCountry !== "all" ? `Programs in ${selectedCountry}` : "All Programs"}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Discover over 35,000+ programs from top universities worldwide.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Search by course, university, or country..."
                className="pl-10 h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 gap-2 relative"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-indigo-600 text-white border-none h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
                </SheetHeader>
                <div className="py-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Country</label>
                    <Select value={selectedCountry} onValueChange={(val) => { setSelectedCountry(val); setCurrentPage(1); }}>
                      <SelectTrigger className="w-full h-11 rounded-xl">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(c => (
                          <SelectItem key={c} value={c}>{c === "all" ? "All Countries" : c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">University</label>
                    <Select value={selectedUniversity} onValueChange={(val) => { setSelectedUniversity(val); setCurrentPage(1); }}>
                      <SelectTrigger className="w-full h-11 rounded-xl">
                        <SelectValue placeholder="Select University" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map(u => (
                          <SelectItem key={u} value={u}>{u === "all" ? "All Universities" : u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Study Level</label>
                    <Select value={selectedStudyLevel} onValueChange={(val) => { setSelectedStudyLevel(val); setCurrentPage(1); }}>
                      <SelectTrigger className="w-full h-11 rounded-xl">
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {studyLevels.map(l => (
                          <SelectItem key={l} value={l}>{l === "all" ? "All Levels" : l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Duration</label>
                    <Select value={selectedDuration} onValueChange={(val) => { setSelectedDuration(val); setCurrentPage(1); }}>
                      <SelectTrigger className="w-full h-11 rounded-xl">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map(d => (
                          <SelectItem key={d} value={d}>{d === "all" ? "All Durations" : d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full text-zinc-500 hover:text-red-500 gap-2"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="mb-6 flex items-center justify-between text-sm text-zinc-500">
            <span>Showing {Math.min(filteredPrograms.length, 1)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredPrograms.length)} of {filteredPrograms.length.toLocaleString()} results</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">No programs found</h3>
              <p className="text-zinc-500 mt-2">Try adjusting your search query or filters.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl ${
                        currentPage === pageNum 
                          ? "bg-indigo-600 hover:bg-indigo-700" 
                          : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" /></div>}>
      <ProgramsContent />
    </Suspense>
  );
}
