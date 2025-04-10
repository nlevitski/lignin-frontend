import { fetchJson } from '@/utils/fetchJson';

type MetaTags = {
	id: number;
	documentId: string;
	title: string;
	keywords: string;
	description: string;
	ogTitle: string;
	ogDescription: string;
	path: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};
type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};
type Meta = {
	pagination: Pagination;
};
export function getMetaTags(): Promise<{
	data: MetaTags[];
	meta: Meta;
}> {
	return fetchJson({
		url: 'http://localhost:1337/api/meta-tags',
	});
}
