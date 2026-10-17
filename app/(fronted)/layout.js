import "@/app/globals.css";
import "@/app/assets/materialize.css";
import "@/app/assets/style.css";
import Script from "next/script";
import AnalyticsEventListener from "@/components/analytics-event-listener";
import MainHeader from "@/components/main-header/main-header";
import PageTransitionLoader from "@/components/page-transition-loader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uniudesign.com";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-J2WHMQ4TD9";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jamie Huang | Senior Product Designer",
    template: "%s | Jamie Huang",
  },
  description: "Senior Product Designer combining UX/UI, product design, and frontend execution.",
  applicationName: "Jamie Huang Portfolio",
  keywords: ["Senior Product Designer", "UX/UI", "Product Design", "Frontend", "Jamie Huang"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: "Jamie Huang Portfolio",
    title: "Jamie Huang | Senior Product Designer",
    description: "UX/UI × Product Design × Frontend.",
  },
  twitter: {
    card: "summary",
    title: "Jamie Huang | Senior Product Designer",
    description: "UX/UI × Product Design × Frontend.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function FrontedLayout({ children }) {
  return (
    <html lang="zh-tw">
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        <Script id="portfolio-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jamie Huang",
            url: siteUrl,
            jobTitle: "Senior Product Designer",
            description: "UX/UI × Product Design × Frontend.",
          })}
        </Script>
        <AnalyticsEventListener />
        <PageTransitionLoader />
        <MainHeader />
        <main className="main-below-fixed-header">{children}</main>
      </body>
    </html>
  );
}
