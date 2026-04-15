import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Possible Machines Pvt Ltd – Precision Block Making Machinery | Nashik, India",
  description:
    "Manufacturer & Exporter of Fly Ash Brick Making Machines, Paver Block Machines, Interlocking Block Machines, and AAC Block Plants. Based in Igatpuri, Nashik, Maharashtra. GST: 27AALCP3904E1ZH.",
  keywords: [
    "fly ash brick machine",
    "paver block machine",
    "interlocking block machine",
    "AAC block plant",
    "block making machine manufacturer India",
    "construction machinery Nashik",
    "CSEB machine",
    "possible machines",
  ],
  openGraph: {
    title: "Possible Machines – Precision Block Making Machinery",
    description: "Leading manufacturer of fly ash brick machines, paver block machines & AAC plants.",
    type: "website",
    locale: "en_IN",
    siteName: "Possible Machines Pvt Ltd",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Possible Machines Private Limited",
              url: "https://www.possiblemachines.in",
              logo: "/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gut No 115, Wadivarhe Dam",
                addressLocality: "Igatpuri",
                addressRegion: "Maharashtra",
                postalCode: "422403",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8047549587",
                contactType: "sales",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
