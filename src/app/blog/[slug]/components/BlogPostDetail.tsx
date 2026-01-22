"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { BlogPost } from "@/types";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Twitter, Facebook, Linkedin } from "lucide-react";

interface BlogPostDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white dark:bg-plum-800 rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-plum-100 dark:bg-plum-700">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-gold-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-30">📝</span>
          </div>
        </div>
        <div className="p-4">
          <span className="text-xs text-plum-500 dark:text-plum-300">{formattedDate}</span>
          <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-cream-50 mt-1 group-hover:text-teal-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPostDetail({ post, relatedPosts }: BlogPostDetailProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-plum-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-teal-500 text-white mb-4">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-50 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-plum-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-cream-50">{post.author.name}</p>
                  <p className="text-sm text-plum-300">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <Section variant="light" padding="lg">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Main Content */}
            <article className="flex-grow">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-plum-900 dark:prose-headings:text-cream-50 prose-p:text-plum-600 dark:prose-p:text-plum-200 prose-a:text-teal-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-plum-900 dark:prose-strong:text-cream-50">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/^## /gm, '<h2>')
                      .replace(/^### /gm, '<h3>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/<h2>/g, '</p><h2>')
                      .replace(/<h3>/g, '</p><h3>')
                      .replace(/(<h[23])>/g, '$1 class="mt-8 mb-4">')
                      .split('\n')
                      .map(line => {
                        if (line.startsWith('- ')) {
                          return `<li>${line.substring(2)}</li>`;
                        }
                        return line;
                      })
                      .join('\n')
                      .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-4">$&</ul>')
                  }}
                />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-plum-200 dark:border-plum-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-plum-400" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm bg-plum-100 dark:bg-plum-700 text-plum-600 dark:text-plum-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-plum-200 dark:border-plum-700">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-plum-600 dark:text-plum-200">
                    <Share2 className="w-5 h-5" />
                    Share this article
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="w-10 h-10 rounded-full bg-plum-100 dark:bg-plum-700 flex items-center justify-center text-plum-600 dark:text-plum-200 hover:bg-teal-500 hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-plum-100 dark:bg-plum-700 flex items-center justify-center text-plum-600 dark:text-plum-200 hover:bg-teal-500 hover:text-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-plum-100 dark:bg-plum-700 flex items-center justify-center text-plum-600 dark:text-plum-200 hover:bg-teal-500 hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="dark" padding="lg">
          <Container>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
