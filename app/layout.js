import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/structured-data";
import { AnalyticsProvider } from "@/components/analytics-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "MVP Mapper - Turn Ideas into 7-Day MVP Scopes",
  description:
    "Free tool to structure your messy product idea into a clear, buildable MVP scope in 20 minutes. No signup, no AI, just forced clarity.",
  keywords: [
    "MVP",
    "product structuring",
    "startup tools",
    "idea validation",
    "MVP scope",
    "product planning",
  ],
  authors: [{ name: "Project Clarity" }],
  openGraph: {
    title: "MVP Mapper - Turn Ideas into 7-Day MVP Scopes",
    description:
      "Free tool to structure your messy product idea into a clear, buildable MVP scope in 20 minutes.",
    type: "website",
    locale: "en_US",
    siteName: "MVP Mapper",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Mapper - Turn Ideas into 7-Day MVP Scopes",
    description:
      "Free tool to structure your messy product idea into a clear, buildable MVP scope in 20 minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
