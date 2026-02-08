import { fetchJson } from '@/utils/fetchJson';
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

export function getSitemapsByDomain(domain: string): Promise<Response<SitemapEntry[]>> {
	const url = new URL(`${getStrapiBaseUrl()}/api/sitemaps`);
	url.searchParams.set('filters[for][$eq]', domain);
	url.searchParams.set('populate[seo][populate]', '*');
	return fetchJson({ url: url.toString() });
}
