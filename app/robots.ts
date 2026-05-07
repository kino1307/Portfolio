import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/_next/static/media/",
        },
        sitemap: "https://wjleece.dev/sitemap.xml",
    };
}
