"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { siteConfig } from "@/data/site";
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Globe, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be less than 5000 characters"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  { value: "partners", label: "AnduBer Partners - Strategic Consulting" },
  { value: "labs", label: "AnduBer Labs - Research Collaboration" },
  { value: "foundation", label: "The Gathering - Venture Capital" },
  { value: "general", label: "General Inquiry" },
  { value: "media", label: "Media / Press" },
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    // Check honeypot field (should be empty)
    if (honeypotRef.current?.value) {
      // Bot detected, silently "succeed"
      setIsSubmitted(true);
      reset();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setSubmitError(
            `Too many requests. Please try again in ${Math.ceil(result.retryAfter / 60)} minutes.`
          );
          return;
        }

        if (result.errors) {
          // Validation errors
          setSubmitError(result.errors.map((e: { message: string }) => e.message).join(", "));
          return;
        }

        setSubmitError(result.error || "Failed to send message. Please try again.");
        return;
      }

      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-800 via-plum-900 to-plum-800" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream-200 mb-6">
              Let&apos;s Start a <span className="text-gold-400">Conversation</span>
            </h2>
            <p className="text-cream-300 mb-8">
              Whether you&apos;re looking for strategic consulting, research collaboration,
              or want to support our mission&mdash;we&apos;re here to help turn friction into flow.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-medium text-cream-200 mb-1">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-cream-300 hover:text-teal-400 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-medium text-cream-200 mb-1">Phone</h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-cream-300 hover:text-teal-400 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-600/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-medium text-cream-200 mb-1">Headquarters</h3>
                  <p className="text-cream-300">{siteConfig.address}</p>
                  <p className="text-sm text-plum-500">Global Reach</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-medium text-cream-200 mb-1">LinkedIn</h3>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-300 hover:text-teal-400 transition-colors"
                  >
                    Connect with us
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-medium text-cream-200 mb-1">Website</h3>
                  <a
                    href={siteConfig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-300 hover:text-teal-400 transition-colors"
                  >
                    anduber.org
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-teal-400" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-cream-200 mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-cream-300 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      ref={honeypotRef}
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Error Banner */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      label="Your Name"
                      placeholder="Jane Doe"
                      error={errors.name?.message}
                      maxLength={100}
                      {...register("name")}
                    />
                    <Input
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="jane@example.com"
                      error={errors.email?.message}
                      maxLength={254}
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium mb-2 text-cream-200"
                    >
                      What brings you here?
                    </label>
                    <select
                      id="inquiryType"
                      className="w-full px-4 py-3 rounded-lg bg-plum-800 border border-plum-700 text-cream-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      {...register("inquiryType")}
                    >
                      <option value="">Select an option...</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.inquiryType.message}
                      </p>
                    )}
                  </div>

                  <Input
                    id="subject"
                    label="Subject"
                    placeholder="How can we help?"
                    error={errors.subject?.message}
                    maxLength={200}
                    {...register("subject")}
                  />

                  <Textarea
                    id="message"
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    error={errors.message?.message}
                    maxLength={5000}
                    {...register("message")}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto"
                    isLoading={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
