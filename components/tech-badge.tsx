import { TECH_ICONS } from "@/lib/tech-icons";

export function TechBadge({ tag }: { tag: string }) {
    const icons = TECH_ICONS[tag] ?? [];

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">
            {icons.map(({ Icon, className }, i) => (
                <Icon key={i} className={`w-3.5 h-3.5 ${className ?? ""}`} />
            ))}
            {tag}
        </span>
    );
}
