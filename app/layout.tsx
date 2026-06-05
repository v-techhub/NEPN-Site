import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/core/components/navigation";
import Footer from "@/core/components/footer";
import SmoothScroll from "@/core/components/smooth-scroll";
import Providers from "@/core/components/providers";

const SITE_NAME = "Network E&P Nigeria Limited";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://networkeandp.com";
const SITE_DESCRIPTION =
  "Network E&P Nigeria Limited (NEPN) is a fully Nigerian-owned oil and gas company dedicated to promoting sustainable energy solutions throughout Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: SITE_NAME,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <SmoothScroll>
            <Navigation />
            {children}
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
