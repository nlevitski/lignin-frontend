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
export type Widget = {
	id: number;
	documentId: string;
	widgetOrder: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	article: Article;
};

export type ArticleItem = {
	id: number;
	documentId: string;
	title: string;
	subtitle: string;
	mission: string;
	teaser: Teaser[];
	summary: string;
	content: Content[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	imgCaption: string;
	path: string;
	titleSmall: string;
	cover: Cover;
	coverPreview: CoverPreview;
};

export type Teaser = {
	type: string;
	children: Children[];
};

export type Children = {
	type: string;
	text: string;
};

export type Content = {
	type: string;
	children: Children2[];
	format?: string;
	level?: number;
};

export type Children2 = {
	type: string;
	text?: string;
	children?: Children3[];
	url?: string;
	bold?: boolean;
};

export type Children3 = {
	type: string;
	text: string;
};

export type Cover = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string;
	provider: string;
	provider_metadata: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type Formats = {
	large: ImageProperties;
	medium: ImageProperties;
	small: ImageProperties;
	thumbnail: ImageProperties;
};

export type ImageProperties = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type CoverPreview = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: Formats2;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string;
	provider: string;
	provider_metadata: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type Formats2 = {
	thumbnail: Thumbnail2;
	medium: Medium2;
	small: Small2;
};

export type Thumbnail2 = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type Medium2 = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type Small2 = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type Bigboard<T> = {
	id: number;
	documentId: string;
	menuName: string;
	menuOrder: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	article: T;
};
export type ArticleShort = Omit<Article, 'teaser' | 'title' | 'mission'>;
export type Article = {
	id: number;
	documentId: string;
	title: string;
	subtitle: string;
	mission?: string;
	teaser: Teaser[];
	summary: string;
	content: Content[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	imgCaption?: string;
	path: string;
	titleSmall: string;
	cover: Cover;
	coverPreview: CoverPreview;
};
const cache = 'force-cache';
export function getArticles(): Promise<ArticlesResponse<ArticleItem[]>> {
	return fetch(
		'http://localhost:1337/api/articles?populate=cover&sort=updatedAt:desc',
		{
			cache,
			// next: { revalidate: 5 },
		}
	)
		.then((res) => res.json())
		.catch((err) =>
			console.error(
				'---getArticles---->\nВОЗМОЖНО НЕ ЗАПУЩЕН СЕРВАК\n<-------',
				err
			)
		);
}

export async function getArticleByDocumentId(
	documentId: string
): Promise<ArticlesResponse<ArticleItem>> {
	return fetch(
		`http://localhost:1337/api/articles/${documentId}?populate=cover`,
		{
			cache,
			// next: { revalidate: 5 },
		}
	)
		.then((res) => res.json())
		.catch((err) =>
			console.error('------->\nВОЗМОЖНО НЕ ЗАПУЩЕН СЕРВАК\n<-------', err)
		);
}

export async function getArticleByPath(
	path: string
): Promise<ArticlesResponse<ArticleItem>> {
	const currentPath = `http://localhost:1337/api/articles/path/${path}`;
	return fetch(currentPath, {
		cache,
		// next: { revalidate: 5 },
	})
		.then((res) => res.json())
		.catch((err) =>
			console.error('------->\nВОЗМОЖНО НЕ ЗАПУЩЕН СЕРВАК\n<-------', err)
		);
}

export async function getBigboards(): Promise<{
	data: Bigboard<ArticleShort>[];
	meta: Meta;
}> {
	return fetch(
		'http://localhost:1337/api/bigboards?populate[article][fields][0]=path&populate[article][populate][cover]=true',
		{
			cache,
			// next: { revalidate: 5 },
		}
	)
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
export async function getBigboardsWithTeasers(): Promise<{
	data: Bigboard<Article>[];
	meta: Meta;
}> {
	return fetch(
		'http://localhost:1337/api/bigboards?populate[article][fields][0]=path&populate[article][fields][1]=teaser&populate[article][fields][2]=title&populate[article][fields][3]=mission&populate[article][populate][cover]=true',
		{
			cache,
			// next: { revalidate: 5 },
		}
	)
		.then((res) => res.json())
		.catch(console.error);
}
export async function getArticleWithWidgetOrder(): Promise<{
	data: Widget[];
	meta: Meta;
}> {
	return fetch(
		'http://localhost:1337/api/widgets?populate[article][populate][cover]=true&populate[article][populate][coverPreview]=true',
		{
			cache,
			//next: { revalidate: 5 }
		}
	)
		.then((res) => res.json())
		.catch(console.error);
}
