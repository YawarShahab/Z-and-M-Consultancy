import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const Institutions = dynamic(() => import("@/components/Institutions").then(mod => ({ default: mod.Institutions })), {
  loading: () => <div className="h-96 flex items-center justify-center"><span className="animate-pulse">Loading...</span></div>
});

const IELTS = dynamic(() => import("@/components/IELTS").then(mod => ({ default: mod.IELTS })), {
  loading: () => <div className="h-96 flex items-center justify-center"><span className="animate-pulse">Loading...</span></div>
});

const Destinations = dynamic(() => import("@/components/Destinations").then(mod => ({ default: mod.Destinations })), {
  loading: () => <div className="h-96 flex items-center justify-center"><span className="animate-pulse">Loading...</span></div>
});

const Contact = dynamic(() => import("@/components/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-96 flex items-center justify-center"><span className="animate-pulse">Loading...</span></div>
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <main className="flex-grow">
          <Hero />
          <Destinations />
          <Institutions />
          <IELTS />
          <Contact />
        </main>
      <Footer />
    </div>
  );
}
