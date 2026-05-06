import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "ol/ol.css";
import "./globals.css";
import { Sidebar } from "@/components/card-business/Sidebar/Sidebar";
import { AppHeader } from "@/components/card-business/Shell/AppHeader";
const amexSans = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amex-sans",
});

const amexDisplay = Source_Serif_4({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amex-display",
});

export const metadata: Metadata = {
  title: "American Express — Card Business Dashboard",
  description:
    "Leadership view of American Express card business KPIs, products, segments, transactions, network, and revenue.",
};

export const viewport: Viewport = {
  themeColor: "#006FCF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-dvh overflow-hidden ${amexSans.variable} ${amexDisplay.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-sans h-full min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0 overflow-hidden">
          <Sidebar />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden app-canvas">
            <AppHeader />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
