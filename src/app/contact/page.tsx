import { Metadata } from "next";
import { Suspense } from "react";
import ContactHero from "./components/ContactHero";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AnduBer. Whether you want to partner with us, support our projects, or learn more about our work, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      {/* Suspense boundary required because ContactForm calls useSearchParams()
          to pre-fill from ?intent=fund|advise|back. */}
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </>
  );
}
