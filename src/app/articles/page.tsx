import { getArticles, getExcludedArticles } from '@/dal/articles';
import styles from './articles.module.scss';
import { Articles } from './Articles';
import { getMetaTags } from '@/dal/metaTags';

export const revalidate = 60;
const defaultMetaTags = {
	title: 'Лигнин. Статьи. Научные исследования',
	description: 'Cтатьи о применении лигнина в различных сферах',
	keywords: 'Сорбент лигнин статьи научные исследования использование',
	alternates: {
		canonical: 'https://ligninsorbent.ru/articles',
	},
	openGraph: {
		title: 'Лигнин. Статьи. Научные исследования',
		description: 'Cтатьи о применении лигнина в различных сферах',
		type: 'website',
		url: 'https://ligninsorbent.ru/articles',
		images: ['https://ligninsorbent.ru/images/webp/backgrounds/bg4.webp'],
	},
};
export async function generateMetadata() {
	const { data } = await getMetaTags();
	const { title, description, keywords, ogTitle, ogDescription } =
		data.find(({ path }) => path === '/articles') || {};
	return {
		alternates: {
			canonical: 'https://ligninsorbent.ru/articles',
		},
		title: title || defaultMetaTags.title,
		description: description || defaultMetaTags.description,
		keywords: keywords || defaultMetaTags.keywords,
		openGraph: {
			title: ogTitle || defaultMetaTags.openGraph.title,
			description: ogDescription || defaultMetaTags.openGraph.description,
			type: defaultMetaTags.openGraph.type,
			url: defaultMetaTags.openGraph.url,
			images: defaultMetaTags.openGraph.images,
		},
	};
}

export default async function ArticlesPage() {
	const { 0: result, 1: excludedArticles } = await Promise.all([
		getArticles(),
		getExcludedArticles(),
	]);

	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					Статьи о применении лигнина
				</h1>
				<Articles articles={result} excludedArticles={excludedArticles} />;
			</div>
		</div>
	);
}
