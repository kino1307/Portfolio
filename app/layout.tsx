
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

export const metadata: Metadata = {
    icons: {
        icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌀</text></svg>",
    },
    title: "Will Leece | Portfolio",
    description: "UK-based full-stack developer – building scalable, user-friendly applications.",
    keywords: ["Full-Stack Developer", "Portfolio", "Next.js", "Tailwind CSS", "C#", ".NET", "Software Engineer"],
    authors: [{ name: "Will Leece", url: "https://wjleece.dev" }],
    creator: "Will Leece",
    publisher: "Will Leece",
    openGraph: {
        title: "Will Leece | Portfolio",
        description: "UK-based full-stack developer – building scalable, user-friendly applications.",
        url: "https://wjleece.dev/",
        siteName: "wjleece.dev",
        type: "website",
        images: [
            {
                url: "data:image/svg+xml;utf8," +
                    "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>" +
                    "<rect width='100%' height='100%' fill='%23ffffff'/>" +
                    "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='300'>🌀</text>" +
                    "</svg>",
                width: 1200,
                height: 630,
                alt: "Will Leece Portfolio",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Will Leece | Portfolio",
        description: "UK-based full-stack developer - building scalable, user-friendly apps.",
        images: [
            "data:image/svg+xml;utf8," +
            "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>" +
            "<rect width='100%' height='100%' fill='%23ffffff'/>" +
            "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='300'>🌀</text>" +
            "</svg>"
        ]
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

export default function layout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}