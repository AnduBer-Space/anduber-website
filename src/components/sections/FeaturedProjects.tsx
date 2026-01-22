"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/data/projects";

const featuredProjects = projects.filter((p) => p.featured);

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  };

  const currentProject = featuredProjects[currentIndex];

  return (
    <Section variant="light" padding="xl">
      <Container>
        <AnimatedSection>
          <SectionHeading
            subtitle="Our Work"
            title="Featured Projects"
            description="Discover how we're making a difference in communities across East Africa through sustainable, community-led initiatives."
          />
        </AnimatedSection>

        {/* Project Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-plum-200 dark:bg-plum-800">
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/60 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-plum-400 dark:text-plum-600">
                  <svg
                    className="w-24 h-24 opacity-30"
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

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProject.status === "ongoing"
                        ? "bg-teal-500 text-white"
                        : currentProject.status === "completed"
                        ? "bg-gold-500 text-plum-900"
                        : "bg-plum-500 text-white"
                    }`}
                  >
                    {currentProject.status.charAt(0).toUpperCase() +
                      currentProject.status.slice(1)}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center text-cream-50">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{currentProject.location}</span>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4 capitalize">
                  {currentProject.type}
                </span>

                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-plum-900 dark:text-cream-50 mb-4">
                  {currentProject.title}
                </h3>

                <p className="text-plum-600 dark:text-plum-200 mb-6 text-lg">
                  {currentProject.shortDescription}
                </p>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {currentProject.impact.slice(0, 4).map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-plum-50 dark:bg-plum-800/50"
                    >
                      <span className="block text-2xl font-bold text-gold-500">
                        {item.value.toLocaleString()}
                        {item.suffix}
                      </span>
                      <span className="text-sm text-plum-600 dark:text-plum-300">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={`/projects/${currentProject.slug}`}>
                  <Button variant="primary">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gold-500 w-8"
                      : "bg-plum-300 dark:bg-plum-600 hover:bg-gold-400"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-plum-100 dark:bg-plum-800 text-plum-600 dark:text-cream-50 hover:bg-gold-500 hover:text-plum-900 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-plum-100 dark:bg-plum-800 text-plum-600 dark:text-cream-50 hover:bg-gold-500 hover:text-plum-900 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button variant="outline">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
