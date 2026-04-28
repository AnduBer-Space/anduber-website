"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Clock, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
  tags: string[];
}

const ALL_TAG = "All";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndex({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden bg-cream-50 dark:bg-plum-900">
        <div className="absolute inset-0 gradient-section-bg" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 134, 11, 0.18) 0%, transparent 70%)",
          }}
        />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-5"
            >
              Insights
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-token-primary leading-[1.05] mb-5"
            >
              Common Sense is{" "}
              <span className="text-gradient-gold">Not Common</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch] mb-3"
            >
              Honest perspectives on development, philanthropy, and challenging
              conventional thinking from the AnduBer collective.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-token-primary leading-relaxed max-w-[60ch]"
            >
              Field notes, hot takes, arguments we&rsquo;re willing to put our
              names on. Cross-posted to LinkedIn — subscribe there to get them
              in your inbox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6"
            >
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-token-gold hover:text-token-gold-strong transition-colors"
                aria-label="Subscribe to AnduBer's perspectives on LinkedIn"
              >
                Subscribe to our perspectives on LinkedIn
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Filter + posts */}
      <section className="relative py-12 md:py-16 bg-cream-50 dark:bg-plum-900">
        <Container>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by tag">
              <button
                type="button"
                onClick={() => setActiveTag(ALL_TAG)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                  activeTag === ALL_TAG
                    ? "bg-gold-400 text-plum-900 border-gold-400"
                    : "bg-token-secondary text-token-primary border-token-glass hover:border-gold-500/50"
                }`}
                aria-pressed={activeTag === ALL_TAG}
              >
                All
              </button>
              {tags.map((t) => {
                const active = activeTag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTag(t)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                      active
                        ? "bg-gold-400 text-plum-900 border-gold-400"
                        : "bg-token-secondary text-token-primary border-token-glass hover:border-gold-500/50"
                    }`}
                    aria-pressed={active}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="font-accent italic text-token-secondary text-lg">
              No posts under this tag yet.
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none p-0">
              {filtered.map((post, i) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/60 dark:bg-plum-800/40 backdrop-blur-sm p-6 lg:p-7
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/40 dark:hover:border-gold-400/50
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-wider text-token-muted">
                      <time dateTime={post.isoDate}>{formatDate(post.isoDate)}</time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {post.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="font-serif text-xl md:text-2xl font-bold text-token-primary leading-tight mb-3 group-hover:text-token-gold transition-colors">
                      {post.title}
                    </h2>

                    <p className="font-accent italic text-sm md:text-base text-token-secondary leading-snug mb-5 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-token-gold font-semibold px-2 py-0.5 rounded-full border border-gold-500/30 dark:border-gold-400/30 bg-gold-400/10"
                          >
                            <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-token-gold group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
