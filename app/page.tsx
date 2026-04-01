
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Mail, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Home() {
    const [darkMode, setDarkMode] = useState(true);
    const [meducateExpanded, setMeducateExpanded] = useState(false);
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
            years: "2022 – Present",
            role: "Full-Stack Developer at Central Technology",
            desc: [
                "Build bespoke features across internal and customer-facing CRUD applications using ASP.NET Core, C#, and EF Core.",
                "Develop live, interactive wallboards powered by SignalR for real-time operational visibility.",
                "Implement AI-driven automation with Semantic Kernel, working within an AI coding agent architecture using vertical slicing and shared context files.",
                "Author bespoke reports for recurring operational issues and data forensics, turning manual investigation into repeatable tooling."
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
        ],
        "knowsAbout": [
            "ASP.NET Core", "C#", ".NET", "Entity Framework Core",
            "Blazor", "SignalR", "SQL", "PostgreSQL",
            "Next.js", "React", "Tailwind CSS", "JavaScript", "TypeScript",
            "RESTful APIs", "Semantic Kernel", "AI Integration"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB"
        }
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
            <section id="about" className="flex flex-col items-center justify-start text-center px-6 space-y-6 pt-32 md:pt-40" aria-label="About Me">
                <h1 className="text-5xl md:text-7xl font-extrabold">I&apos;m Will Leece,</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                    a full-stack .NET developer based in the UK, currently building at Central Technology.
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
                            <FaLinkedin className="w-6 h-6" />
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
                            href="https://docs.google.com/document/d/1SGn8VAhru0A5axskslH_GiMxXgdRFUESglmBTibn4Qs/export?format=pdf"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <FileText className="w-6 h-6" />
                        </a>
                    </Button>
                </div>
            </section>

            <div className="my-16"></div>

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

            <div className="my-16"></div>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-20 max-w-4xl mx-auto px-6 py-12 space-y-6" aria-label="Projects">
                <h2 className="text-3xl font-semibold mb-10 text-left">Projects</h2>

                <div className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                    <a href="https://meducateapi.com" target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl font-bold mb-2">Meducate API</h3>
                    </a>
                    <p className="text-muted-foreground mb-4">
                        A REST API that ingests medical data from MedlinePlus and PubMed, uses an LLM to classify and structure it under ICD-10 categories, and serves it through a clean, versioned interface — refreshed daily.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">.NET 10</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Blazor Server</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">PostgreSQL</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Semantic Kernel</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Hangfire</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Railway</span>
                    </div>
                    <span className="inline-block text-sm text-muted-foreground italic mb-4">meducateapi.com — currently under development</span>

                    <button
                        onClick={() => setMeducateExpanded(!meducateExpanded)}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition cursor-pointer mt-4"
                    >
                        {meducateExpanded ? "Hide" : "Read"} case study
                        {meducateExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {meducateExpanded && (
                        <div className="mt-6 space-y-6 text-muted-foreground border-t border-border pt-6">
                            <div>
                                <h4 className="text-lg font-semibold text-foreground mb-2">The Problem</h4>
                                <p>
                                    Medical reference data from sources like MedlinePlus (U.S. National Library of Medicine,
                                    2,000+ health topics) and PubMed is unstructured and inconsistent — each source uses
                                    different formats, update cycles, and access methods. A single condition like Type 2
                                    Diabetes might appear across multiple providers with conflicting field names, missing
                                    symptoms, or outdated treatment info. Developers building health education tools end up
                                    writing brittle scrapers and hand-rolled parsers that break every time an upstream source
                                    changes, duplicating effort that could be solved once at the infrastructure level.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-foreground mb-2">Architecture &amp; Tech Decisions</h4>
                                <p className="mb-3">
                                    Meducate follows Clean Architecture across four layers — Domain, Application,
                                    Infrastructure, and Presentation — so the data providers, LLM processor, and persistence
                                    layer can each be replaced independently. It ships as a .NET 10 monolith deployed on
                                    Railway, keeping operational complexity low while the product is in its early stage.
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>
                                        <strong className="text-foreground">LLM ingestion pipeline</strong> — Hangfire runs
                                        two daily jobs: a <em>TopicDiscoveryJob</em> at 2 AM UTC fetches new topics from
                                        MedlinePlus and PubMed, then an LLM classification step (Semantic Kernel + OpenAI GPT-4)
                                        assigns each topic an ICD-10 category (one of 24 standardised medical categories) and
                                        a type (Disease, Drug, Procedure, Symptom, etc.). A second extraction pass pulls out
                                        structured fields — summary, symptoms, causes, treatments, and citations — before a
                                        quality-control stage handles synonym merging and field validation. Existing topics are
                                        re-processed at 3 AM UTC so the data stays current. Semantic Kernel was chosen over direct
                                        SDK calls because it provides prompt orchestration and makes it easy to swap models or
                                        add prompt filters without touching business logic.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Blazor Server dashboard</strong> — The developer
                                        portal uses passwordless magic-link authentication (emails sent via Resend API) with
                                        cookie-based sessions. Users create an organisation, generate up to 5 API keys, and
                                        monitor usage through a real-time dashboard. Keeping the front-end in Blazor means the
                                        entire stack is C# with shared models between the API and UI.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">PostgreSQL + EF Core</strong> — All normalised
                                        medical data, user accounts, organisations, and usage metrics live in PostgreSQL 16
                                        via Entity Framework Core (Npgsql). Hangfire also uses PostgreSQL-backed persistence,
                                        meaning background jobs survive restarts and failures can be retried from the built-in
                                        dashboard.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Minimal API surface</strong> — The public API
                                        exposes topic endpoints ({`/api/topics`}, {`/api/topics/search`}, {`/api/topics/{name}`})
                                        with API-key auth via {`X-Api-Key`} header and two-tier rate limiting: 60 requests/min
                                        per key plus a configurable daily cap with 80% usage alerts. Response schemas adapt to
                                        topic type — a Disease returns symptoms, causes, and treatments, while a Symptom returns
                                        related symptoms, associated conditions, and management. Topics that are removed by all
                                        upstream providers are automatically removed from the API.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-foreground mb-2">Outcome</h4>
                                <p>
                                    Meducate currently ingests and classifies 2,000+ health topics from MedlinePlus and PubMed,
                                    each with structured summaries, symptoms, causes, treatments, and citations — all classified
                                    under ICD-10 categories and refreshed daily without manual intervention. The developer portal
                                    provides self-service onboarding: request a magic link, create an organisation, generate an API
                                    key, and start querying structured medical data in minutes.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">Medeck</h3>
                    <p className="text-muted-foreground mb-4">
                        A medical flashcard app using spaced repetition (SM-2) to help medical students study. Pulls real topics from the Meducate API and generates structured flashcards automatically.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">.NET 10</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Blazor WASM</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">SQLite</span>
                        <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">Meducate API</span>
                    </div>
                    <span className="inline-block text-sm text-muted-foreground italic">Early development — not yet live</span>
                </div>

            </section>

            {/* Footer */}
            <footer className="w-full border-t border-border text-center py-6 text-sm text-muted-foreground">
                <a href="mailto:jamesleece24@gmail.com" className="hover:text-foreground transition">jamesleece24@gmail.com</a>
            </footer>
        </main>
    );
}
