import { Metadata } from "next";
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
      <ContactForm />
    </>
  );
}
