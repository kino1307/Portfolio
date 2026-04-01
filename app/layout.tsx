
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
    title: "Will Leece — Full-Stack Developer | ASP.NET Core & C# | UK",
    description: "Will Leece – UK-based full-stack .NET developer. ASP.NET Core, C#, Blazor, SignalR, and Semantic Kernel.",
    keywords: ["William Leece", "Will Leece", "Full-Stack Developer", "Software Engineer", "Portfolio", ".NET", "C#", "ASP.NET Core", "Next.js", "Tailwind CSS", "UK Developer"],
    authors: [{ name: "William Leece", url: "https://wjleece.dev" }],
    creator: "William Leece",
    publisher: "William Leece",
    openGraph: {
        title: "Will Leece — Full-Stack Developer | ASP.NET Core & C# | UK",
        description: "Will Leece – UK-based full-stack .NET developer. ASP.NET Core, C#, Blazor, SignalR, and Semantic Kernel.",
        url: "https://wjleece.dev/",
        siteName: "wjleece.dev",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Will Leece — Full-Stack Developer | ASP.NET Core & C# | UK",
        description: "Will Leece – UK-based full-stack .NET developer. ASP.NET Core, C#, Blazor, SignalR, and Semantic Kernel.",
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
