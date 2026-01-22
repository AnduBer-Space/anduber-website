import { Metadata } from "next";
import InsightsPage from "./components/InsightsPage";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Common Sense is Not Common - Thoughts on development, philanthropy, and challenging conventional thinking by Dr. Victor Mugambi Nyaga.",
};

export default function BlogPage() {
  return <InsightsPage />;
}
