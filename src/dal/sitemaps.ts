import { getStrapiBaseUrl } from '@/utils/strapiBaseUrl';

export type SitemapEntry = {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	path: string;
	title: string;
	for: string;
	seo: {
		id: number;
		metaTitle: string;
		metaDescription: string;
		keywords: string | null;
		metaRobots: string | null;
		metaViewport: string | null;
		canonicalURL: string;
		structuredData: unknown | null;
		metaImage: unknown | null;
		openGraph: {
			id: number;
			ogTitle: string;
			ogDescription: string;
			ogUrl: string;
			ogType: string;
		};
	};
};

type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

type Response<T> = {
	data: T;
	meta: { pagination: Pagination };
};

export async function getSitemapsByDomain(
	domain: string
): Promise<Response<SitemapEntry[]>> {
	const url = new URL(`${getStrapiBaseUrl()}/api/sitemaps`);
	// Avoid $eq in query params to prevent proxy rewriting ($ -> [] in some redirects)
	url.searchParams.set('filters[for]', domain);
	url.searchParams.set('populate[seo][populate]', '*');
	const response = await fetch(url.toString(), {
		next: { revalidate: 3600 },
		cache: 'force-cache',
	});
	if (response.status === 404) {
		return {
			data: [],
			meta: {
				pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
			},
		};
	}
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return response.json();
}
