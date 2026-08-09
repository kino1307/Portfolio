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
                            Medical reference data is a mess to work with. MedlinePlus (the National Library of
                            Medicine&apos;s consumer health site, 2,000+ topics) and PubMed each use their own
                            formats, their own update schedules, and their own access methods. Look up something as
                            common as Type 2 Diabetes and you will find conflicting field names, missing symptoms, or
                            treatment info that is years out of date, depending on which provider you asked. Every
                            developer building a health education tool ends up writing the same brittle scraper and
                            hand-rolled parser, and it breaks the moment an upstream source changes anything. I wanted
                            to solve that once, at the infrastructure level, instead of rebuilding it for every
                            project.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Architecture &amp; Tech Decisions</h2>
                        <p className="mb-4">
                            Meducate is built with Clean Architecture across four layers: Domain, Application,
                            Infrastructure, and Presentation. That separation means I can swap out a data provider,
                            the LLM processor, or the persistence layer without the others caring. It runs as a
                            single .NET 10 monolith on Railway. At this stage, a monolith is just less for me to
                            operate than a set of services I would have to babysit.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">LLM ingestion pipeline</h3>
                                <p>
                                    Two Hangfire jobs handle ingestion. A <em>TopicDiscoveryJob</em> runs at 2 AM UTC
                                    and pulls new topics from MedlinePlus and PubMed. From there, an LLM
                                    classification step (Semantic Kernel on top of OpenAI GPT-4) assigns each topic
                                    one of 24 ICD-10 categories and a type: disease, drug, procedure, symptom, and so
                                    on. A second pass extracts the structured fields, summary, symptoms, causes,
                                    treatments, citations, and a quality-control step merges synonyms and validates
                                    everything before it is saved. Existing topics get reprocessed at 3 AM UTC so
                                    nothing goes stale. I went with Semantic Kernel instead of calling the OpenAI SDK
                                    directly mainly so I could swap models or add prompt filters later without
                                    rewriting the business logic around them.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">Blazor Server dashboard</h3>
                                <p>
                                    The developer portal is Blazor Server with passwordless magic-link
                                    authentication (emails go out through the Resend API) and cookie-based sessions.
                                    From there you create an organisation, generate up to five API keys, and watch
                                    usage on a live dashboard. Keeping the front end in Blazor rather than reaching
                                    for React or something similar meant the whole stack stayed C#, with models
                                    shared between the API and the UI instead of duplicated in TypeScript.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">PostgreSQL + EF Core</h3>
                                <p>
                                    The normalised medical data, user accounts, organisations, and usage metrics all
                                    live in PostgreSQL 16 through Entity Framework Core and Npgsql. Hangfire also
                                    persists to PostgreSQL, so a restart does not lose a job mid-run, and anything
                                    that fails can be retried straight from Hangfire&apos;s own dashboard.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold mb-1">Minimal API surface</h3>
                                <p>
                                    The public API is intentionally small: <code>/api/topics</code>,{" "}
                                    <code>/api/topics/search</code>, and <code>/api/topics/{"{name}"}</code>, all
                                    behind an API key passed as an <code>X-Api-Key</code> header. Rate limiting is
                                    two-tier, 60 requests a minute per key plus a configurable daily cap, with an
                                    alert at 80% usage. What comes back depends on the topic type: a disease returns
                                    symptoms, causes, and treatments, while a symptom returns related symptoms and
                                    associated conditions instead. If a topic disappears from every upstream source,
                                    it gets pulled from the API automatically rather than sitting around stale.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Outcome</h2>
                        <p>
                            Right now Meducate is ingesting and classifying over 2,000 health topics from
                            MedlinePlus and PubMed, each with a structured summary, symptoms, causes, treatments, and
                            citations, sorted under ICD-10 categories and refreshed every day without me touching
                            anything. Getting access is meant to be quick: request a magic link, create an
                            organisation, generate a key, and you are querying structured medical data within a few
                            minutes.
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
