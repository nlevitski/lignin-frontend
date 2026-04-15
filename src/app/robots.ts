import { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/siteUrl";

const baseUrl = getSiteUrl();
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin", "/_next/static/", "/_next/image", "/api/"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
