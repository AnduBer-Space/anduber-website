"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { blogPosts, blogCategories } from "@/data/blog";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white dark:bg-plum-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-plum-100 dark:bg-plum-700">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-gold-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">📝</span>
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-500 text-white">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-sm text-plum-500 dark:text-plum-300 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>

            <h2 className="font-serif text-xl font-bold text-plum-900 dark:text-cream-50 mb-3 group-hover:text-teal-500 transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="text-plum-600 dark:text-plum-200 mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-plum-100 dark:border-plum-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-plum-900 dark:text-cream-50">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-plum-500 dark:text-plum-300">
                    {post.author.role}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-plum-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Section variant="light" padding="lg">
      <Container>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-plum-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-plum-200 dark:border-plum-600 bg-white dark:bg-plum-800 text-plum-900 dark:text-cream-50 placeholder:text-plum-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-plum-800 text-plum-600 dark:text-plum-200 hover:bg-plum-100 dark:hover:bg-plum-700 border border-plum-200 dark:border-plum-600"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-plum-600 dark:text-plum-200 mb-8">
          Showing {filteredPosts.length} article
          {filteredPosts.length !== 1 ? "s" : ""}
        </p>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-plum-600 dark:text-plum-200 mb-4">
              No articles found
            </p>
            <p className="text-plum-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
