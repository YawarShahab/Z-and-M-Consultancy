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


/* ---------------- MAIN CONTENT ---------------- */

function ProgramsPageContent() {
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

      {/* --- YOUR FULL UI CODE REMAINS EXACTLY THE SAME HERE --- */}

      <Footer />
    </div>
  );
}


/* ---------------- SUSPENSE WRAPPER ---------------- */

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading programs...</div>}>
      <ProgramsPageContent />
    </Suspense>
  );
}