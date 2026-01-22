"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { projects, projectTypes, projectStatuses } from "@/data/projects";
import { Project } from "@/types";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" || project.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-plum-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-teal-500/20 text-teal-400 text-sm font-medium mb-6"
            >
              Our Impact
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-6"
            >
              Projects That{" "}
              <span className="text-gradient-gold">Transform Lives</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-plum-200 max-w-3xl mx-auto"
            >
              Explore our portfolio of community-led development projects making
              a difference across East Africa.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <Section variant="light" padding="md">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-plum-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-plum-200 dark:border-plum-600 bg-white dark:bg-plum-800 text-plum-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-5 h-5 text-plum-500 dark:text-plum-300" />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-plum-200 dark:border-plum-600 bg-white dark:bg-plum-800 text-plum-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-plum-200 dark:border-plum-600 bg-white dark:bg-plum-800 text-plum-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {projectStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="mt-4 text-sm text-plum-500 dark:text-plum-300">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section variant="light" padding="lg">
        <Container>
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-plum-500 dark:text-plum-300 text-lg mb-4">
                  No projects found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setTypeFilter("all");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full group">
        <div className="h-full bg-white dark:bg-plum-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
          {/* Image placeholder */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-plum-200 to-plum-300 dark:from-plum-700 dark:to-plum-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-plum-400 dark:text-plum-600 opacity-50"
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

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "ongoing"
                    ? "bg-teal-500 text-white"
                    : project.status === "completed"
                    ? "bg-gold-500 text-plum-900"
                    : "bg-plum-500 text-white"
                }`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            {/* Type badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-plum-900/90 text-plum-700 dark:text-cream-50 capitalize">
                {project.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center text-sm text-plum-500 dark:text-plum-300 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>

            <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-cream-50 mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
              {project.title}
            </h3>

            <p className="text-plum-600 dark:text-plum-200 text-sm line-clamp-2 mb-4">
              {project.shortDescription}
            </p>

            {/* Quick stats */}
            <div className="flex gap-4 pt-4 border-t border-plum-100 dark:border-plum-700">
              {project.impact.slice(0, 2).map((item, i) => (
                <div key={i} className="flex-1">
                  <span className="block text-lg font-bold text-gold-500">
                    {item.value.toLocaleString()}
                    {item.suffix}
                  </span>
                  <span className="text-xs text-plum-500 dark:text-plum-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
