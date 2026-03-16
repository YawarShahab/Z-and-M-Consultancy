"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const WHATSAPP_NUMBER = "923709150013";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const firstName = formData.get("First Name") as string;
    const lastName = formData.get("Last Name") as string;
    const email = formData.get("Email") as string;
    const phone = formData.get("Phone") as string;
    const subject = formData.get("Subject") as string;
    const message = formData.get("Message") as string;

    const text = `Hello! I would like to book a consultation.

*First Name:* ${firstName}
*Last Name:* ${lastName}
*Email:* ${email}
*Phone:* ${phone}
*Subject:* ${subject}
*Message:* ${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
    formRef.current?.reset();
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Book a Consultation
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-12">
              Have questions about studying abroad? Our team of experts is here to help you every step of the way. Reach out to us for a free consultation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-2xl dark:bg-indigo-900/30">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Email Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">zmconsultancy007@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-2xl dark:bg-green-900/30">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Call Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">+923709150013</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-2xl dark:bg-orange-900/30">
                  <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Visit Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Office # 401, 4th Floor, Ace Plaza, Eucalyptus Road, Giga Commercial, Sector-A, DHA Phase 2, Islamabad, Pakistan</p>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#25D366]/10 rounded-2xl">
                  <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50">WhatsApp Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">+923709150013</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold rounded-xl text-sm transition-colors duration-200 shadow-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="First Name"
                    placeholder="John"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="Last Name"
                    placeholder="Doe"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  name="Email"
                  placeholder="john@example.com"
                  className="rounded-xl border-zinc-200 dark:border-zinc-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  name="Phone"
                  placeholder="+1 (555) 000-0000"
                  className="rounded-xl border-zinc-200 dark:border-zinc-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  name="Subject"
                  placeholder="How can we help?"
                  className="rounded-xl border-zinc-200 dark:border-zinc-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  name="Message"
                  placeholder="Tell us more about your study plans..."
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 min-h-[150px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20b858] h-12 rounded-xl text-lg font-medium text-white"
                disabled={loading}
              >
                {loading ? "Opening WhatsApp..." : (
                  <>
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Book via WhatsApp
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
