import { fetchJson } from '@/utils/fetchJson';
import { getStrapiBaseUrl } from '@/utils/strapiBaseUrl';
import { SiteDomain } from '@/utils/siteUrl';
import { notFound } from 'next/navigation';
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
  id: number;
  documentId: string;
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

function compactData<T>(
	response: ArticlesResponse<Array<T | null | undefined>>
): ArticlesResponse<T[]> {
	return {
		...response,
		data: response.data.filter((item): item is T => item != null),
	};
}

type WithNestedArticlePath = {
	article: {
		path: string;
	};
};

function hasNestedArticlePath<T extends { article?: { path?: unknown } | null }>(
	item: T | null | undefined
): item is T & WithNestedArticlePath {
	return !!item && !!item.article && typeof item.article.path === 'string';
}

function compactDataWithNestedArticle<T extends { article?: { path?: unknown } | null }>(
	response: ArticlesResponse<Array<T | null | undefined>>
): ArticlesResponse<Array<T & WithNestedArticlePath>> {
	const compacted = compactData(response);

	return {
		...compacted,
		data: compacted.data.filter(hasNestedArticlePath),
	};
}

function buildQuery(params: Record<string, string | undefined>): string {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value) {
			searchParams.set(key, value);
		}
	}

	const query = searchParams.toString();
	return query ? `?${query}` : '';
}

function withSiteFilter(
	params: Record<string, string>,
	site?: SiteDomain
): string {
	return buildQuery({
		...params,
		// Avoid $eq in query params: some build/proxy paths rewrite it and Strapi rejects the result.
		'filters[site]': site,
	});
}

export function getArticlesPageContent(): Promise<ArticlesResponse<Document<{title: string}>>> {
  return fetchJson({
    url: `${getStrapiBaseUrl()}/api/articles-page`,
  });
}
export function getArticles(site?: SiteDomain): Promise<
	ArticlesResponse<Document<ArticleItem>[]>
> {
	return fetchJson<ArticlesResponse<Array<Document<ArticleItem> | null | undefined>>>({
		url: `${getStrapiBaseUrl()}/api/articles${withSiteFilter(
			{
				populate: 'cover',
				sort: 'createdAt:desc',
			},
			site
		)}`,
	}).then(compactData);
}

export function getExcludedArticles(): Promise<
	ArticlesResponse<Document<ExcludedArticle>[]>
> {
	return fetchJson({
		url: `${getStrapiBaseUrl()}/api/excluded-articles?populate[article][fields][0]=documentId`,
	});
}

export function getArticleByDocumentId(
	documentId: string,
	site?: SiteDomain
): Promise<ArticlesResponse<Document<ArticleItem>>> {
	return getSingleArticle({
		'filters[documentId]': documentId,
		populate: 'cover',
		site,
	});
}

export function getArticleByPath(
	path: string,
	site?: SiteDomain
): Promise<ArticlesResponse<Document<ArticleItem>>> {
	return getSingleArticle({
		'filters[path]': path,
		populate: 'cover',
		site,
	});
}

async function getSingleArticle({
	site,
	...params
}: Record<string, string | undefined> & { site?: SiteDomain }): Promise<
	ArticlesResponse<Document<ArticleItem>>
> {
	const response = await fetchJson<ArticlesResponse<Document<ArticleItem>[]>>({
		url: `${getStrapiBaseUrl()}/api/articles${withSiteFilter(
			params as Record<string, string>,
			site
		)}`,
	});

	const [article] = response.data;

	if (!article) {
		return notFound();
	}

	return {
		...response,
		data: article,
	};
}

export function getBigboards(site?: SiteDomain): Promise<
	ArticlesResponse<Document<Bigboard<Document<ArticleShort>>>[]>
> {
	return fetchJson<
		ArticlesResponse<Array<Document<Bigboard<Document<ArticleShort>>> | null | undefined>>
	>({
		url: `${getStrapiBaseUrl()}/api/bigboards${withSiteFilter(
			{
				'populate[article][populate][cover]': 'true',
				'populate[cover]': 'true',
			},
			site
		)}`,
	}).then(compactDataWithNestedArticle);
}
export function getBigboardsWithTeasers(site?: SiteDomain): Promise<
	ArticlesResponse<
		Document<
			Bigboard<Document<Article>> & {
				background: SingleMedia;
				cover: SingleMedia;
			}
		>[]
	>
> {
	return fetchJson<
		ArticlesResponse<
			Array<
				| (Document<
						Bigboard<Document<Article>> & {
							background: SingleMedia;
							cover: SingleMedia;
						}
					>)
				| null
				| undefined
			>
		>
	>({
		url: `${getStrapiBaseUrl()}/api/bigboards${withSiteFilter(
			{
				'populate[background]': 'true',
				'populate[cover]': 'true',
				'populate[article][populate][cover]': 'true',
			},
			site
		)}`,
	}).then(compactDataWithNestedArticle);
}
export function getArticleWithWidgetOrder(site?: SiteDomain): Promise<
	ArticlesResponse<Document<Widget>[]>
> {
	return fetchJson<ArticlesResponse<Array<Document<Widget> | null | undefined>>>({
		url: `${getStrapiBaseUrl()}/api/widgets${buildQuery({
			'populate[article][populate][cover]': 'true',
			'populate[article][populate][coverPreview]': 'true',
			'filters[article][site]': site,
		})}`,
	}).then(compactDataWithNestedArticle);
}

export function getAboutUsContent(): Promise<{
	data: Document<AboutUs>;
	meta: object;
}> {
	return fetchJson({
		url: `${getStrapiBaseUrl()}/api/about-us`,
	});
}
