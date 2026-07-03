import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description:
    "We're Here to Help. Have questions about our stone-milled flours or your order? Reach out to us via phone at +91 9800199797 or visit our mill in Vikhroli West, Mumbai. We'd love to hear from you!",
  alternates: {
    canonical: "https://www.ridhana.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
