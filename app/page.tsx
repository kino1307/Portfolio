
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Mail, FileText } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";

export default function Home() {
    const [darkMode, setDarkMode] = useState(true);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const saved = localStorage.getItem("darkMode");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDarkMode(saved === null || saved === "true");
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (isFirstRender.current) return;
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", String(darkMode));
    }, [darkMode]);

    const experience = [
        {
            years: "2022 - Now",
            role: "Full-Stack Developer at Central Technology",
            desc: [
                "Architect and ship full-stack applications with ASP.NET Core, C#, and EF Core, serving both internal teams and customer-facing products.",
                "Design RESTful APIs and data-driven solutions with SQL, integrating responsive front-end interfaces using JavaScript.",
                "Engineer real-time features with SignalR and implement AI-driven automation using Semantic Kernel to streamline business processes.",
                "Deliver production-ready software end-to-end, from requirements through to deployment, working cross-functionally across teams."
            ]
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "William Leece",
        "alternateName": "Will Leece",
        "url": "https://wjleece.dev",
        "jobTitle": "Full-Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Central Technology"
        },
        "sameAs": [
            "https://www.linkedin.com/in/will-leece-485803236/",
            "https://github.com/kino1307"
        ]
    };

    return (
        <main className="min-h-[100dvh] bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Navbar */}
            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card border border-border rounded-full px-6 py-2 flex items-center space-x-6 shadow-lg" aria-label="Main navigation">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex-shrink-0 font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                    aria-label="Scroll to top"
                >
                    🌀
                </button>

                <nav className="flex space-x-4">
                    <button
                        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="px-3 py-1 rounded-full hover:bg-accent transition cursor-pointer"
                    >
                        Experience
                    </button>

                    <button
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="px-3 py-1 rounded-full hover:bg-accent transition cursor-pointer"
                    >
                        Projects
                    </button>
                </nav>

                <Button
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Toggle dark mode"
                    className="ml-auto cursor-pointer"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
            </header>

            {/* About Section */}
            <section id="about" className="flex flex-col items-center justify-start text-center px-6 space-y-4 pt-32 md:pt-40" aria-label="About Me">
                <h1 className="text-5xl md:text-7xl font-extrabold">I&apos;m Will,</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                    a UK-based full-stack developer.<br />
                    I create scalable, user-friendly apps.
                </p>

                <div className="flex space-x-6 mt-4">
                    <Button asChild size="sm" variant="ghost" aria-label="Email" className="cursor-pointer">
                        <a href="mailto:jamesleece24@gmail.com" rel="noopener noreferrer me">
                            <Mail className="w-6 h-6" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="LinkedIn" className="cursor-pointer">
                        <a
                            href="https://www.linkedin.com/in/will-leece-485803236/"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <SiLinkedin className="w-6 h-6" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="GitHub" className="cursor-pointer">
                        <a
                            href="https://github.com/kino1307"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <SiGithub className="w-6 h-6" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="Resume" className="cursor-pointer">
                        <a
                            href="https://docs.google.com/document/d/1SGn8VAhru0A5axskslH_GiMxXgdRFUESglmBTibn4Qs/edit?tab=t.0#heading=h.5b0krlsv88a7"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <FileText className="w-6 h-6" />
                        </a>
                    </Button>
                </div>
            </section>

            <div className="border-t border-border my-8"></div>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-20 max-w-4xl mx-auto px-6 py-12" aria-label="Experience">
                <h2 className="text-3xl font-semibold mb-10 text-left">Experience</h2>
                <ul className="space-y-8">
                    {experience.map((exp, idx) => (
                        <li key={idx} className="flex flex-col md:flex-row md:items-start md:space-x-6">
                            <span className="text-muted-foreground w-32 md:w-40 flex-shrink-0">{exp.years}</span>
                            <div>
                                <h3 className="font-semibold">{exp.role}</h3>
                                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                                    {exp.desc.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <div className="border-t border-border my-8"></div>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-20 max-w-4xl mx-auto px-6 py-12 space-y-6" aria-label="Projects">
                <h2 className="text-3xl font-semibold mb-10 text-left">Projects</h2>

                <a href="https://meducateapi.com" target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Meducate API</h3>
                    <p className="text-muted-foreground mb-4">
                        A medical API that regularly ingests raw data from multiple reliable external sources and uses an LLM to transform it into a consistent, predictable format. This means the API continuously serves the most up-to-date medical information without manual intervention. Includes a full front-end application where users can create accounts, browse documentation, monitor usage, and manage API keys.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Blazor</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">PostgreSQL</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Semantic Kernel</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Claude Code</span>
                    </div>
                    <span className="inline-block text-sm text-muted-foreground italic">meducateapi.com — currently under development</span>
                </a>

                <div className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">This Portfolio</h3>
                    <p className="text-muted-foreground mb-4">
                        A personal portfolio showcasing my experience & projects.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Next.js</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Tailwind CSS</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Vercel</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Claude Code</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-border text-center py-6 text-sm text-muted-foreground">
                © {new Date().getFullYear()} wjleece.dev
            </footer>
        </main>
    );
}
