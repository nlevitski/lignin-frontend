import { getArticles, getArticlesPageContent, getExcludedArticles } from '@/dal/articles';
import styles from './articles.module.scss';
import { Articles } from './Articles';
import { getMetaTagsByPath } from '@/dal/metaTags';
import { getSiteUrl, toAbsoluteUrl } from '@/utils/siteUrl';

export const revalidate = 3600;
const defaultMetaTags = {
	title: 'Лигнин. Статьи. Научные исследования',
	description: 'Cтатьи о применении лигнина в различных сферах',
	keywords: 'Сорбент лигнин статьи научные исследования использование',
	alternates: {
		canonical: `${getSiteUrl()}/articles`,
	},
	openGraph: {
		title: 'Лигнин. Статьи. Научные исследования',
		description: 'Cтатьи о применении лигнина в различных сферах',
		type: 'website',
		url: `${getSiteUrl()}/articles`,
		images: [
			`${getSiteUrl()}/images/webp/backgrounds/bg4.webp`,
		],
	},
  robots: 'index, follow',
};
export async function generateMetadata() {
  const { data: { seo } } = await getMetaTagsByPath(
		'articles-page?populate[seo][populate][openGraph][populate]=ogImage'
	);
	return {
		alternates: {
			canonical: toAbsoluteUrl(seo.canonicalURL),
		},
		title: seo.metaTitle || defaultMetaTags.title,
		description: seo.metaDescription || defaultMetaTags.description,
		keywords: seo.keywords || defaultMetaTags.keywords,
		openGraph: {
			title: seo.openGraph.ogTitle || defaultMetaTags.openGraph.title,
			description:
				seo.openGraph.ogDescription ||
				defaultMetaTags.openGraph.description,
			type: seo.openGraph.ogType || defaultMetaTags.openGraph.type,
			url: toAbsoluteUrl(seo.openGraph.ogUrl) || defaultMetaTags.openGraph.url,
			images: [
				{
					url: toAbsoluteUrl(seo.openGraph.ogImage?.url) || '',
					width: seo.openGraph.ogImage?.width || 0,
					height: seo.openGraph.ogImage?.height || 0,
					alt: seo.openGraph.ogImage?.alternativeText || '',
				},
			],
		},
    robots: seo.metaRobots || defaultMetaTags.robots,
	};
}

export default async function ArticlesPage() {
	const { 0: result, 1: excludedArticles, 2: articlePageContent } = await Promise.all([
		getArticles(),
		getExcludedArticles(),
    getArticlesPageContent(),
	]);

	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					{/* Статьи о применении лигнина */}
          {articlePageContent.data.title}
				</h1>
				<Articles articles={result} excludedArticles={excludedArticles} />;
			</div>
		</div>
	);
}
