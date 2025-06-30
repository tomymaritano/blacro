import { Metadata } from "next";
import { META } from "@/constants/design-tokens";

export const aboutMetadata: Metadata = {
  title: "About Us",
  description: "Meet the creative minds behind Blacro Studio. Learn about our journey, vision, and the passion that drives our innovative approach to branding and design.",
  keywords: [...META.KEYWORDS, "team", "founders", "creative minds", "studio story", "vision"],
  openGraph: {
    title: `About Us | ${META.SITE_NAME}`,
    description: "Meet the creative minds behind Blacro Studio. Learn about our journey, vision, and the passion that drives our innovative approach to branding and design.",
    images: [
      {
        url: "/images/about.jpg",
        width: 500,
        height: 750,
        alt: "Blacro Studio founders - Creative team behind the innovative design studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${META.SITE_NAME}`,
    description: "Meet the creative minds behind Blacro Studio. Learn about our journey, vision, and the passion that drives our innovative approach to branding and design.",
    images: ["/images/about.jpg"],
  },
};