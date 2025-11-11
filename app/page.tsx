
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Mail, FileText } from "lucide-react";
import dynamic from "next/dynamic";

const SiLinkedin = dynamic(() => import("react-icons/si").then(mod => mod.SiLinkedin));
const SiGithub = dynamic(() => import("react-icons/si").then(mod => mod.SiGithub));

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("darkMode") === "true";
        setDarkMode(stored);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    const experience = [
        {
            years: "2022 - Now",
            role: ".NET Developer at Central Technology",
            desc: [
                "Develop and maintain internal and external apps using ASP.NET Core, C#, and EF Core.",
                "Build RESTful APIs, implement data-driven solutions with SQL, and integrate front-end functionality using JavaScript.",
                "Use SignalR for real-time features and Semantic Kernel for intelligent automation.",
                "Collaborate closely with teams to deliver reliable, scalable software aligned with business goals"
            ]
        }
    ];

    return (
        <main className="min-h-[100dvh] bg-gray-900 text-gray-100 dark:bg-gray-50 dark:text-gray-900">
            {/* Navbar */}
            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 border border-gray-700 rounded-full px-6 py-2 flex items-center space-x-6 shadow-lg dark:bg-gray-100 dark:border-gray-300" aria-label="Main navigation">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex-shrink-0 font-bold text-lg cursor-pointer hover:scale-110 transition-transform text-gray-100 dark:text-gray-900"
                    aria-label="Scroll to top"
                >
                    🌀
                </button>

                <nav className="flex space-x-4">
                    <button
                        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="px-3 py-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition cursor-pointer text-gray-100 dark:text-gray-900"
                    >
                        Experience
                    </button>

                    <button
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="px-3 py-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition cursor-pointer text-gray-100 dark:text-gray-900"
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
                <h1 className="text-5xl md:text-7xl font-extrabold">I'm Will,</h1>
                <p className="text-lg md:text-xl text-gray-200 dark:text-gray-800 max-w-xl">
                    a UK-based full-stack developer.<br />
                    I create scalable, user-friendly apps.
                </p>

                <div className="flex space-x-6 mt-4">
                    <Button asChild size="sm" variant="ghost" aria-label="Email" className="cursor-pointer">
                        <a href="mailto:jamesleece24@gmail.com" rel="noopener noreferrer me">
                            <Mail className="w-6 h-6 text-gray-100 dark:text-gray-900" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="LinkedIn" className="cursor-pointer">
                        <a
                            href="https://www.linkedin.com/in/will-leece-485803236/"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <SiLinkedin className="w-6 h-6 text-gray-100 dark:text-gray-900" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="GitHub" className="cursor-pointer">
                        <a
                            href="https://github.com/kino1307"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <SiGithub className="w-6 h-6 text-gray-100 dark:text-gray-900" />
                        </a>
                    </Button>

                    <Button asChild size="sm" variant="ghost" aria-label="Resume" className="cursor-pointer">
                        <a
                            href="https://docs.google.com/document/d/1SGn8VAhru0A5axskslH_GiMxXgdRFUESglmBTibn4Qs/edit?tab=t.0#heading=h.5b0krlsv88a7"
                            target="_blank"
                            rel="noopener noreferrer me"
                        >
                            <FileText className="w-6 h-6 text-gray-100 dark:text-gray-900" />
                        </a>
                    </Button>
                </div>
            </section>

            <div className="border-t border-gray-700 dark:border-gray-400 my-8"></div>

            {/* Experience Section */}
            <section id="experience" className="max-w-4xl mx-auto px-6 py-12" aria-label="Experience">
                <h2 className="text-3xl font-semibold mb-10 text-left text-gray-100 dark:text-gray-900">Experience</h2>
                <ul className="space-y-8">
                    {experience.map((exp, idx) => (
                        <li key={idx} className="flex flex-col md:flex-row md:items-start md:space-x-6">
                            <span className="text-gray-300 dark:text-gray-700 w-32 md:w-40 flex-shrink-0">{exp.years}</span>
                            <div>
                                <h3 className="font-semibold text-gray-100 dark:text-gray-900">{exp.role}</h3>
                                <ul className="list-disc list-inside text-gray-300 dark:text-gray-700 mt-2 space-y-1">
                                    {exp.desc.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <div className="border-t border-gray-700 dark:border-gray-400 my-8"></div>

            {/* Projects Section */}
            <section id="projects" className="max-w-4xl mx-auto px-6 py-12 space-y-6" aria-label="Projects">
                <h2 className="text-3xl font-semibold mb-10 text-left text-gray-100 dark:text-gray-900">Projects</h2>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition dark:bg-gray-100 dark:border-gray-300">
                    <h3 className="text-xl font-bold mb-2 text-gray-100 dark:text-gray-900">This Portfolio</h3>
                    <p className="text-gray-300 dark:text-gray-700 mb-4">
                        A personal portfolio built with Next.js & Tailwind CSS, deployed via Vercel. It showcases my experience & projects.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-gray-700 dark:border-gray-400 text-center py-6 text-sm text-gray-300 dark:text-gray-700">
                © {new Date().getFullYear()} wjleece.dev
            </footer>
        </main>
    );
}