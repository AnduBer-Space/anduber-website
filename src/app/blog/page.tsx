import { Metadata } from "next";
import InsightsPage from "./components/InsightsPage";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Honest perspectives on development, philanthropy, and challenging conventional thinking from the AnduBer collective.",
};

export default function BlogPage() {
  return <InsightsPage />;
}
