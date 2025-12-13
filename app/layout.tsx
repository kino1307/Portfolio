
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('darkMode');
      if (saved === null || saved === 'true') {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export const metadata: Metadata = {
    title: "William Leece | Full-Stack Developer Portfolio",
    description: "William (Will) Leece – UK-based full-stack developer specialising in .NET, C#, and modern web technologies. Building scalable, user-friendly applications.",
    keywords: ["William Leece", "Will Leece", "Full-Stack Developer", "Software Engineer", "Portfolio", ".NET", "C#", "ASP.NET Core", "Next.js", "Tailwind CSS", "UK Developer"],
    authors: [{ name: "William Leece", url: "https://wjleece.dev" }],
    creator: "William Leece",
    publisher: "William Leece",
    openGraph: {
        title: "William Leece | Full-Stack Developer",
        description: "William (Will) Leece – UK-based full-stack developer specialising in .NET, C#, and modern web technologies.",
        url: "https://wjleece.dev/",
        siteName: "wjleece.dev",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "William Leece | Full-Stack Developer",
        description: "William (Will) Leece – UK-based full-stack developer specialising in .NET, C#, and modern web technologies.",
    },
    alternates: {
        canonical: "https://wjleece.dev/"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        }
    }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                {children}
            </body>
        </html>
    );
}
