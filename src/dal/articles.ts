import { BlocksContent } from '@strapi/blocks-react-renderer';

type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};
export type ArticlesResponse<T> = {
	data: T;
	meta: Meta;
};
type Meta = {
	pagination: Pagination;
};

export type ArticleItem = {
	id: number;
	documentId: string;
	title: string;
	subtitle: string;
	content: BlocksContent;
	cover: Cover;
	publishedAt: string;
};
type Format = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

type Cover = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail: Format;
		small: Format;
		medium?: Format;
		large?: Format;
	};
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
};

export async function getArticles(): Promise<ArticlesResponse<ArticleItem[]>> {
	return fetch('http://localhost:1337/api/articles?populate=cover', {
		cache: 'force-cache',
		next: { revalidate: 3600 },
	}).then((res) => res.json());
}

export async function getArticleByDocumentId(
	documentId: string
): Promise<ArticlesResponse<ArticleItem>> {
	return fetch(
		`http://localhost:1337/api/articles/${documentId}?populate=cover`,
		{
			cache: 'force-cache',
			next: { revalidate: 3600 },
		}
	).then((res) => res.json());
}
