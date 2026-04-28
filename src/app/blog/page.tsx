import { Metadata } from "next";
import BlogIndex from "./components/BlogIndex";
import { getAllPosts, getAllTags } from "@/lib/blog";
import HomeContact from "@/components/sections/HomeContact";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Honest perspectives on development, philanthropy, and challenging conventional thinking from the AnduBer collective.",
  openGraph: {
    title: "Insights — AnduBer",
    description:
      "Honest perspectives on development, philanthropy, and challenging conventional thinking from the AnduBer collective.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <>
      <BlogIndex posts={posts} tags={tags} />
      <HomeContact />
    </>
  );
}
