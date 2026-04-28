import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "./components/BlogPost";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import HomeContact from "@/components/sections/HomeContact";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post, 3);

  return (
    <>
      <BlogPostView post={post} related={related} />
      <HomeContact />
    </>
  );
}
