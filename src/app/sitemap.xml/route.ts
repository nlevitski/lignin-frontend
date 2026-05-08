import { getArticles } from "@/dal/articles";
import { getCurrentSite, getSiteUrl } from "@/utils/siteUrl";

export const revalidate = 3600;

function toXml(entries: Array<{ url: string; lastmod?: string }>): string {
	const body = entries
		.map(
			(entry) => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
  </url>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export async function GET() {
	const baseUrl = getSiteUrl();
	const site = getCurrentSite();
	const { data: articles } = await getArticles(site);

	const sitemap = toXml([
		{
			url: baseUrl,
			lastmod: new Date().toISOString(),
		},
		{
			url: `${baseUrl}/articles`,
			lastmod: new Date().toISOString(),
		},
		...articles.map((article) => ({
			url: `${baseUrl}/${article.path}`,
			lastmod: new Date(article.updatedAt).toISOString(),
		})),
	]);

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
