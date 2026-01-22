"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowLeft,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Counter from "@/components/ui/Counter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Project } from "@/types";

interface Props {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetail({ project, relatedProjects }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-plum-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center text-plum-300 hover:text-gold-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "ongoing"
                      ? "bg-teal-500 text-white"
                      : project.status === "completed"
                      ? "bg-gold-500 text-plum-900"
                      : "bg-plum-500 text-white"
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-plum-700 text-cream-50 capitalize">
                  {project.type}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-50 mb-4"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-plum-200 mb-6"
              >
                {project.shortDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-6 text-sm text-plum-300"
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                  {project.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  Started {new Date(project.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </motion.div>
            </div>

            {/* Hero Image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-plum-700 to-plum-800"
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-plum-600 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Impact Stats */}
      <Section variant="gradient" padding="lg">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {project.impact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <Counter
                  value={item.value}
                  suffix={item.suffix}
                  className="block font-serif text-3xl md:text-4xl font-bold text-gold-500 mb-2"
                />
                <span className="text-plum-200 text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Project Content */}
      <Section variant="light" padding="xl">
        <Container size="md">
          <AnimatedSection>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-plum-900 dark:text-cream-50 mb-6">
                About This Project
              </h2>
              {project.description.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-plum-600 dark:text-plum-200 mb-4 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>

          {/* Photo Gallery */}
          {project.gallery.length > 0 && (
            <AnimatedSection className="mt-16">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-plum-900 dark:text-cream-50 mb-6">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.gallery.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-plum-200 to-plum-300 dark:from-plum-700 dark:to-plum-800 hover:opacity-80 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-plum-400 dark:text-plum-600 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Share */}
          <AnimatedSection className="mt-16 pt-8 border-t border-plum-200 dark:border-plum-700">
            <div className="flex items-center justify-between">
              <span className="text-plum-600 dark:text-plum-300">
                Share this project:
              </span>
              <div className="flex gap-3">
                <button className="p-2 rounded-full bg-plum-100 dark:bg-plum-800 text-plum-600 dark:text-cream-50 hover:bg-gold-500 hover:text-plum-900 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section variant="dark" padding="xl">
          <Container>
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mb-4">
                Related Projects
              </h2>
              <div className="divider-gold" />
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/projects/${related.slug}`}
                    className="block group"
                  >
                    <div className="bg-plum-800/50 rounded-2xl overflow-hidden border border-plum-700 hover:border-gold-500/30 transition-all">
                      <div className="aspect-video bg-plum-700 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-plum-600 opacity-50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-bold text-cream-50 mb-2 group-hover:text-gold-500 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-plum-300 text-sm line-clamp-2">
                          {related.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-plum-950/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-plum-800 text-cream-50 hover:bg-plum-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === 0
                    ? project.gallery.length - 1
                    : lightboxIndex - 1
                );
              }}
              className="absolute left-6 p-2 rounded-full bg-plum-800 text-cream-50 hover:bg-plum-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === project.gallery.length - 1
                    ? 0
                    : lightboxIndex + 1
                );
              }}
              className="absolute right-6 p-2 rounded-full bg-plum-800 text-cream-50 hover:bg-plum-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] aspect-video bg-plum-800 rounded-xl flex items-center justify-center"
            >
              <svg
                className="w-24 h-24 text-plum-600 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-50 text-sm">
              {lightboxIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
