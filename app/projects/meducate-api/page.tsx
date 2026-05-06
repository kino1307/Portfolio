import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Meducate API — Medical Data REST API Case Study | Will Leece",
    description: "A REST API delivering structured, ICD-10 classified medical data from MedlinePlus and PubMed. Built with .NET 10, Blazor Server, PostgreSQL, and Semantic Kernel.",
    alternates: {
        canonical: "https://wjleece.dev/projects/meducate-api",
    },
    openGraph: {
        title: "Meducate API — Medical Data REST API Case Study | Will Leece",
        description: "A REST API delivering structured, ICD-10 classified medical data from MedlinePlus and PubMed. Built with .NET 10, Blazor Server, PostgreSQL, and Semantic Kernel.",
        url: "https://wjleece.dev/projects/meducate-api",
        type: "article",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": "Meducate API",
    "description": "A REST API delivering structured, ICD-10 classified medical data ingested from MedlinePlus and PubMed, classified by LLM, and served through a clean versioned interface refreshed daily.",
    "programmingLanguage": ["C#", ".NET 10"],
    "runtimePlatform": "Railway",
    "author": {
        "@type": "Person",
        "name": "Will Leece",
        "url": "https://wjleece.dev"
    },
    "url": "https://meducateapi.com",
};

export default function MeducateApiPage() {
    return (
        <main className="min-h-[100dvh] bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-6 py-24">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition mb-12 inline-block"
                >
                    ← Back to portfolio
                </Link>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Meducate API
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                    Medical Data REST API — Case Study
                </p>
                <a
                    href="https://meducateapi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground italic hover:text-foreground transition"
                >
                    meducateapi.com — currently under development
                </a>

                <div className="flex flex-wrap gap-2 mt-6 mb-12">
                    {[".NET 10", "Blazor Server", "PostgreSQL", "Semantic Kernel", "Hangfire", "Railway"].map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="space-y-12 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">The Problem</h2>
                        <p>
                            Medical reference data from sources like MedlinePlus (U.S. National Library of Medicine,
                            2,000+ health topics) and PubMed is unstructured and inconsistent — each source uses
                            different formats, update cycles, and access methods. A single condition like Type 2
                            Diabetes might appear across multiple providers with conflicting field names, missing
                            symptoms, or outdated treatment info. Developers building health education tools end up
                            writing brittle scrapers and hand-rolled parsers that break every time an upstream source
                            changes, duplicating effort that could be solved once at the infrastructure level.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Architecture &amp; Tech Decisions</h2>
                        <p className="mb-4">
                            Meducate follows Clean Architecture across four layers — Domain, Application,
                            Infrastructure, and Presentation — so the data providers, LLM processor, and persistence
                            layer can each be replaced independently. It ships as a .NET 10 monolith deployed on
                            Railway, keeping operational complexity low while the product is in its early stage.
                        </p>
                        <ul className="list-disc list-inside space-y-4">
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
                                exposes topic endpoints (<code>/api/topics</code>, <code>/api/topics/search</code>, <code>/api/topics/{"{name}"}</code>)
                                with API-key auth via <code>X-Api-Key</code> header and two-tier rate limiting: 60 requests/min
                                per key plus a configurable daily cap with 80% usage alerts. Response schemas adapt to
                                topic type — a Disease returns symptoms, causes, and treatments, while a Symptom returns
                                related symptoms, associated conditions, and management. Topics that are removed by all
                                upstream providers are automatically removed from the API.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Outcome</h2>
                        <p>
                            Meducate currently ingests and classifies 2,000+ health topics from MedlinePlus and PubMed,
                            each with structured summaries, symptoms, causes, treatments, and citations — all classified
                            under ICD-10 categories and refreshed daily without manual intervention. The developer portal
                            provides self-service onboarding: request a magic link, create an organisation, generate an API
                            key, and start querying structured medical data in minutes.
                        </p>
                    </section>
                </div>
            </div>

            <footer className="w-full border-t border-border text-center py-6 text-sm text-muted-foreground">
                <a href="mailto:jamesleece24@gmail.com" className="hover:text-foreground transition">jamesleece24@gmail.com</a>
            </footer>
        </main>
    );
}
