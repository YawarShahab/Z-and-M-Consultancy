"use client";

import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Z and M Consultancy
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              Empowering students to achieve their dreams of international education with expert guidance and comprehensive support.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/ZMConsultancy0013/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/zmconsultancy007/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://pk.linkedin.com/company/zmconsultancy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "Programs", "Institutions", "IELTS", "Destinations", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-zinc-400 hover:text-indigo-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Services</h3>
            <ul className="space-y-4">
              {["University Selection", "Visa Assistance", "Scholarship Guidance", "Test Preparation", "Career Counseling"].map((item) => (
                <li key={item}>
                  <span className="text-zinc-400 cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Newsletter</h3>
            <p className="text-zinc-400 mb-4">
              Subscribe to get the latest updates on scholarships and study abroad news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white border-none focus:ring-2 focus:ring-indigo-600 outline-none placeholder:text-zinc-500"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Z and M Consultancy. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-zinc-500 hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
