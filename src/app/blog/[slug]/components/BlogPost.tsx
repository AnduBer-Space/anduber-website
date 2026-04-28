"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2 } from "lucide-react";
import Container from "@/components/ui/Container";
import type { BlogPost } from "@/lib/blog";
import ShareButtons from "./ShareButtons";

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostView({ post, related }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 md:pt-40 overflow-hidden bg-cream-50 dark:bg-plum-900">
        <div className="absolute inset-0 gradient-section-bg" />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 134, 11, 0.18) 0%, transparent 70%)",
          }}
        />

        <Container className="relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-token-secondary hover:text-token-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Insights
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-token-muted mb-5">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <time dateTime={post.isoDate}>{formatDate(post.isoDate)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-token-primary leading-[1.1] mb-5"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]"
            >
              {post.excerpt}
            </motion.p>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-token-gold font-semibold px-2 py-0.5 rounded-full border border-gold-500/30 dark:border-gold-400/30 bg-gold-400/10"
                >
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Body + TOC */}
      <section className="relative py-12 md:py-16 bg-cream-50 dark:bg-plum-900">
        <Container>
          <div className="grid lg:grid-cols-[1fr,240px] gap-10 lg:gap-16 items-start">
            <article
              className="prose prose-lg max-w-none
                         prose-headings:font-serif prose-headings:text-token-primary
                         prose-h2:scroll-mt-28 prose-h3:scroll-mt-28
                         prose-p:text-token-primary prose-p:leading-relaxed
                         prose-a:text-token-gold prose-a:font-medium prose-a:underline-offset-4
                         hover:prose-a:underline
                         prose-strong:text-token-primary
                         prose-em:text-token-secondary
                         prose-ul:text-token-primary prose-ol:text-token-primary
                         prose-li:my-1
                         prose-blockquote:border-l-4 prose-blockquote:border-gold-500/60
                         prose-blockquote:bg-token-secondary prose-blockquote:not-italic
                         prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
                         prose-blockquote:text-token-primary
                         prose-code:text-token-gold prose-code:bg-token-tertiary prose-code:px-1 prose-code:rounded
                         prose-hr:border-token-glass"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <aside className="hidden lg:block lg:sticky lg:top-28 self-start">
              {post.headings.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-3">
                    On this page
                  </p>
                  <ol className="space-y-1.5 text-sm">
                    {post.headings.map((h) => (
                      <li
                        key={h.id}
                        className={h.level === 3 ? "pl-4" : ""}
                      >
                        <a
                          href={`#${h.id}`}
                          className="text-token-secondary hover:text-token-gold leading-snug block py-0.5 transition-colors"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-3 inline-flex items-center gap-1.5">
                  <Share2 className="w-3 h-3" aria-hidden="true" />
                  Share
                </p>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </aside>
          </div>

          {/* Mobile share */}
          <div className="mt-10 lg:hidden">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-3 inline-flex items-center gap-1.5">
              <Share2 className="w-3 h-3" aria-hidden="true" />
              Share
            </p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative py-16 md:py-20 bg-cream-100 dark:bg-plum-800">
          <Container>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
              Related
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-token-primary mb-8">
              More from the collective
            </h2>
            <ul className="grid md:grid-cols-3 gap-6 list-none p-0">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block h-full rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/60 dark:bg-plum-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 dark:hover:border-gold-400/50"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-token-muted mb-3">
                      <time dateTime={r.isoDate}>{formatDate(r.isoDate)}</time>
                      {" · "}
                      {r.readingMinutes} min read
                    </p>
                    <h3 className="font-serif text-lg font-bold text-token-primary leading-tight mb-2 group-hover:text-token-gold transition-colors">
                      {r.title}
                    </h3>
                    <p className="font-accent italic text-sm text-token-secondary leading-snug line-clamp-2">
                      {r.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-token-gold group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
