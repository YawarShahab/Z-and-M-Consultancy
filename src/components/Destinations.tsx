"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const countryFlags: Record<string, { code: string; label: string }> = {
  "United States":  { code: "us", label: "US Flag" },
  "Canada":         { code: "ca", label: "Canada Flag" },
  "United Kingdom": { code: "gb", label: "UK Flag" },
  "Australia":      { code: "au", label: "Australia Flag" },
  "China":          { code: "cn", label: "China Flag" },
  "New Zealand":    { code: "nz", label: "New Zealand Flag" },
  "Ireland":        { code: "ie", label: "Ireland Flag" },
  "France":         { code: "fr", label: "France Flag" },
  "Germany":        { code: "de", label: "Germany Flag" },
  "Italy":          { code: "it", label: "Italy Flag" },
  "Netherlands":    { code: "nl", label: "Netherlands Flag" },
  "Spain":          { code: "es", label: "Spain Flag" },
  "Switzerland":    { code: "ch", label: "Switzerland Flag" },
  "Singapore":      { code: "sg", label: "Singapore Flag" },
  "Malaysia":       { code: "my", label: "Malaysia Flag" },
  "Finland":        { code: "fi", label: "Finland Flag" },
  "Cyprus":         { code: "cy", label: "Cyprus Flag" },
  "United Arab Emirates": { code: "ae", label: "UAE Flag" },
};

const extraCountries = [
  {
    name: "Ireland",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1200&auto=format&fit=crop",
    description: "A welcoming nation with top-ranked universities and a thriving tech scene.",
  },
  {
    name: "France",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=1200&auto=format&fit=crop",
    description: "World-renowned institutions and a rich cultural heritage.",
  },
  {
    name: "Germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    description: "Engineering excellence and tuition-free public universities.",
  },
  {
    name: "Italy",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1200&auto=format&fit=crop",
    description: "Historic universities, art, and Mediterranean lifestyle.",
  },
  {
    name: "Netherlands",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop",
    description: "Innovative education system with hundreds of English-taught programs.",
  },
  {
    name: "Spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop",
    description: "Vibrant culture, affordable living, and quality education.",
  },
  {
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    description: "World-class research institutions in the heart of Europe.",
  },
  {
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
    description: "Asia's education hub with globally ranked universities.",
  },
  {
    name: "Malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop",
    description: "Affordable quality education in a multicultural environment.",
  },
  {
    name: "Finland",
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
    description: "One of the world's best education systems with free tuition.",
  },
  {
    name: "Cyprus",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop",
    description: "European education in a sunny Mediterranean island setting.",
  },
  {
    name: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    description: "A global city with world-class campuses and innovation hubs.",
  },
];

function DestCard({ name, image, description, href }: { name: string; image: string; description: string; href: string }) {
  const flag = countryFlags[name];
  return (
    <div className="group relative h-[300px] rounded-3xl overflow-hidden">
      {flag && (
        <div className="absolute top-4 right-4 z-10 rounded-sm overflow-hidden shadow-lg border border-white/30">
          <img
            src={`https://flagcdn.com/w40/${flag.code}.png`}
            srcSet={`https://flagcdn.com/w80/${flag.code}.png 2x`}
            width={40}
            height={27}
            alt={flag.label}
            className="block"
          />
        </div>
      )}
      <Link href={href}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-zinc-300 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function Destinations() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="destinations" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Popular Destinations
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Choose your dream destination and start your global education journey.
          </p>
        </div>

        {/* Main destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => {
            const href = dest.name === "China" ? "/#contact" : `/destinations/${encodeURIComponent(dest.name.toLowerCase())}`;
            return (
              <DestCard key={index} name={dest.name} image={dest.image} description={dest.description} href={href} />
            );
          })}
        </div>

        {/* Extra countries revealed on "All Countries" click */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {extraCountries.map((dest, index) => (
              <DestCard key={index} name={dest.name} image={dest.image} description={dest.description} href="#contact" />
            ))}
          </div>
        )}

        {/* All Countries Button */}
        {!showAll && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 text-base"
            >
              All Countries <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
