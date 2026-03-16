"use client";

import { CheckCircle2, BookOpen, Headphones, PenTool, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Listening",
    description: "Master the art of understanding diverse accents and complex conversations.",
    icon: Headphones,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
  },
  {
    title: "Reading",
    description: "Learn strategies to quickly extract information and analyze academic texts.",
    icon: BookOpen,
    color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
  },
  {
    title: "Writing",
    description: "Develop the skills to construct coherent essays and describe complex data.",
    icon: PenTool,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
  },
  {
    title: "Speaking",
    description: "Build confidence in expressing your ideas fluently and naturally.",
    icon: MessageSquare,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
  }
];

export function IELTS() {
  return (
    <section id="ielts" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Excel in Your IELTS Exam
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Our comprehensive IELTS preparation program is designed to help you achieve your target band score. With expert tutors and personalized study plans, we ensure you're fully prepared for every aspect of the test.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Mock tests under real exam conditions",
                "Personalized feedback on writing and speaking",
                "Access to exclusive study materials",
                "Expert tips and time management strategies"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8" asChild>
              <a href="#contact">Book a Free Demo Class</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:shadow-lg transition-all"
              >
                <div className={`p-3 rounded-2xl inline-block mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
