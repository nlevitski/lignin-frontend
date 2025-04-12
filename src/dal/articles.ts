import { fetchJson } from '@/utils/fetchJson';
import {
	BaseDocument,
	StrapiRichTextBlock,
	Document,
	Meta,
	SingleMedia,
} from './common';

export type ArticlesResponse<T> = {
	data: T;
	meta: Meta;
};
export type Widget = {
	widgetOrder: number;
	article: Article;
};

export type ArticleItem = {
	title: string;
	subtitle: string;
	mission: string;
	teaser: StrapiRichTextBlock[];
	summary: string;
	content: StrapiRichTextBlock[];
	imgCaption: string;
	path: string;
	titleSmall: string;
	cover: SingleMedia;
	coverPreview: SingleMedia;
	metaDescription?: string;
	metaKeywords?: string;
};

export type ExcludedArticle = {
	article: Pick<BaseDocument, 'id' | 'documentId'>;
};

// export type Teaser = {
// 	type: string;
// 	children: Children[];
// };

export type Bigboard<T> = {
	menuName: string;
	menuOrder: number;
	background: SingleMedia;
	article: T;
};

export type ArticleShort = Omit<Article, 'teaser' | 'title' | 'mission'>;

export type Article = {
	title: string;
	subtitle: string;
	mission?: string;
	teaser: StrapiRichTextBlock[];
	summary: string;
	content: StrapiRichTextBlock[];
	imgCaption?: string;
	path: string;
	titleSmall: string;
	cover: SingleMedia;
	coverBigboard: SingleMedia;
	coverPreview: SingleMedia;
};

export type AboutUs = {
	content: StrapiRichTextBlock[];
};

export function getArticles(): Promise<
	ArticlesResponse<Document<ArticleItem>[]>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/articles?populate=cover&sort=createdAt:desc',
	});
}

export function getExcludedArticles(): Promise<
	ArticlesResponse<Document<ExcludedArticle>[]>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/excluded-articles?populate[article][fields][0]=documentId',
	});
}

export function getArticleByDocumentId(
	documentId: string
): Promise<ArticlesResponse<Document<ArticleItem>>> {
	return fetchJson({
		url: `http://localhost:1337/api/articles/${documentId}?populate=cover`,
	});
}

export function getArticleByPath(
	path: string
): Promise<ArticlesResponse<Document<ArticleItem>>> {
	const currentPath = `http://localhost:1337/api/articles/path/${path}`;
	return fetchJson({ url: currentPath });
}

export function getBigboards(): Promise<
	ArticlesResponse<Document<Bigboard<Document<ArticleShort>>>[]>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/bigboards?populate[article][fields][0]=path&populate[article][populate][coverBigboard]=true',
	});
}
export function getBigboardsWithTeasers(): Promise<
	ArticlesResponse<Document<Bigboard<Document<Article>>>[]>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/bigboards?populate[article][fields][0]=path&populate[article][fields][1]=teaser&populate[article][fields][2]=title&populate[article][fields][3]=mission&populate[article][populate][coverBigboard]=true&populate[background]=true',
	});
}
export function getArticleWithWidgetOrder(): Promise<
	ArticlesResponse<Document<Widget>[]>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/widgets?populate[article][populate][cover]=true&populate[article][populate][coverPreview]=true',
	});
}

export function getAboutUsContent(): Promise<{
	data: Document<AboutUs>;
	meta: object;
}> {
	return fetchJson({
		url: 'http://localhost:1337/api/about-us',
	});
}
