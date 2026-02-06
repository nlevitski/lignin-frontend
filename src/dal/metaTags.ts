import { fetchJson } from '@/utils/fetchJson';
import { getStrapiBaseUrl } from '@/utils/strapiBaseUrl';

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
	pagination?: Pagination;
};
type Response = {
  data: Data;
  meta: Meta;
}
export type Data = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: Seo;
}
export type Seo = {
	id: number;
	metaTitle: string;
	metaDescription: string;
	keywords: string;
	metaRobots: string;
	metaViewport: string | null;
	canonicalURL: string;
	structuredData: StructuredData;
  openGraph: OpenGraph;
}
export type OpenGraph = {
	id: number;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogType: string;
  ogImage: OgImage;
}
export type OgImage = {
	id: number;
	documentId: string;
	name: string;
	caption: null;
	width: number;
	height: number;
	formats: ImageFormat;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	alternativeText: string | null;
}
export type ImageFormat = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};
export type Formats<
	T extends string = 'thumbnail' | 'medium' | 'small' | 'large'
> = {
	[K in T]: ImageFormat;
};

export type StructuredData = {
	'@context': string;
	'@type': string;
	name: string;
	url: string;
	description: string;
}
export function getMetaTags(): Promise<{
	data: MetaTags[];
	meta: Meta;
}> {
	return fetchJson({
		url: `${getStrapiBaseUrl()}/api/meta-tags`,
	});
}
export function getMetaTagsByPath(path: string): Promise<Response> {
  return fetchJson({
		url: new URL(`${getStrapiBaseUrl()}/api/${path}`).toString(),
	});
}
